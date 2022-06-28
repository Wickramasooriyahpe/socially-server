import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Creative } from '../creative/creative.entity';
import { Campaign } from '../campaign/campaign.entity';
import { Publisher } from '../publisher/publisher.entity';

import { Transactions } from '../transaction/entities/transactions.entity';

import { Feedback } from '../feedbacks/entities/feedback.entity';
import { Advertiser } from 'src/advertiser/advertiser.entity';
import { Conversion } from 'src/ad-sharing/conversion.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Advertiser)
    private advertiserRepository: Repository<Advertiser>,
    @InjectRepository(Creative)
    private creativesRepository: Repository<Creative>,
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
    @InjectRepository(Transactions)
    private transactionRepository: Repository<Transactions>,
    @InjectRepository(Conversion)
    private conversionRepository: Repository<Conversion>,
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async getAdminDashboardValues() {
    const campaigns = await this.campaignsRepository.find();
    const publishers = await this.publisherRepository.find();

    let spends = 0;

    const spendTransactions = await this.transactionRepository
      .createQueryBuilder()
      .where('Transactions.nature = :nature', { nature: 'withdraw' })
      .getMany();

    const conversions = await this.conversionRepository.find();

    for (const t of spendTransactions) {
      if (t.amount) {
        spends = spends + t.amount;
      }
    }

    return {
      ongoingCampaigns: campaigns.length ?? 0,
      adsView: conversions.length ?? 0,
      adsSpend: spends,
      activePublisher: publishers.length ?? 0,
    };
  }

  async getAllCampaign(id:number) {
    const response = [];

    const campaigns = await this.campaignsRepository
      .createQueryBuilder()
      .where('Campaign.Advertiser = :advertiserId', {
        advertiserId: id,
        
      })
      .getMany();

    await Promise.all(
      campaigns.map(async (campaign) => {
        const feedbacks = await this.feedbackRepository
          .createQueryBuilder()
          .where('Feedback.campaign = :campaignId', {
            campaignId: campaign.campaignId,
          })
          .getMany();

        
          if(feedbacks.length!==0){
            const conversionQuery = await this.conversionRepository
            .createQueryBuilder()
            .leftJoinAndSelect('Conversion.creative', 'creative')
            .leftJoinAndSelect('creative.campaign', 'campaign')
            .where('campaign.campaignId = :campaignId', {
              campaignId: campaign.campaignId,
            })
            .getMany();
  
          const res = {
            campaign: campaign.campaignName,
            impressions: feedbacks.length,
            conversion: conversionQuery.length ?? 0,
            budget: campaign.budget,
          };
  
          response.push(res);
          }

        
      }),
    );
    return response;
  }

  async getAllCreatives(id:number) {
    const response = [];

    const creatives = await this.creativesRepository
    .createQueryBuilder()
    .leftJoinAndSelect('Creative.campaign', 'campaign')
    .where('campaign.Advertiser = :advertiserId', {
      advertiserId: id,
    })
    .getMany();

    await Promise.all(
      creatives.map(async (creative) => {

        const feedbacks = await this.feedbackRepository
          .createQueryBuilder()
          .where('Feedback.creative = :creativeId', {
            creativeId: creative.creativeId,
          })
          .getMany();

          if(feedbacks.length!==0){

            const conversionQuery = await this.conversionRepository
          .createQueryBuilder()
          .leftJoinAndSelect('Conversion.creative', 'creative')
          .where('creative.creativeId = :creativeId', {
            creativeId: creative.creativeId,
          })
          .getMany();

        const res = {
          creativeHeading: creative.creativeHeading,
          impressions: feedbacks.length,
          conversion: conversionQuery.length ?? 0,
          costPerSale: creative.costPerSale,
        };

        response.push(res);
        
          }

        
      }),
    );
    return response;
  }



  async getUserDashboardValues(id: number) {
    let earnings = 0;
    let spends = 0;

    const earningTransactions = await this.transactionRepository
      .createQueryBuilder()
      .where('Transactions.advertiser = :advertiserId', { advertiserId: id })
      .andWhere('Transactions.nature = :nature', { nature: 'deposit' })
      .getMany();

    const spendTransactions = await this.transactionRepository
      .createQueryBuilder()
      .where('Transactions.advertiser = :advertiserId', { advertiserId: id })
      .andWhere('Transactions.nature = :nature', { nature: 'withdraw' })
      .getMany();

    const feedbacks = await this.feedbackRepository
      .createQueryBuilder()
      .where('Feedback.advertiser = :advertiserId', { advertiserId: id })
      .getMany();

    const conversionQuery = await this.conversionRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Conversion.creative', 'creative')

      .leftJoinAndSelect('creative.campaign', 'campaign')
      .leftJoinAndSelect('campaign.Advertiser', 'advertiser')
      .where('advertiser.id = :advertiserId', { advertiserId: id })
      .getMany();

      // const list=await Promise.all(conversionQuery.map(async (convertions)=>{

      //   const l= await this.creativesRepository.createQueryBuilder()
      //   .where('Creative.campaignId = :campaignId', { campaignId: convertions.creative.campaignId })
      //   .getMany();


      //   await Promise.all(l.map(async (creative)=>{

      //      const d=await this.campaignsRepository.createQueryBuilder()
      //     .where('Campaign.Advertiser = :advertiserId', { advertiserId: id })
      //     .getMany();

      //     console.log(d);
      //   }));
    
      // }));

   
    for (const t of earningTransactions) {
      if (t.amount) {
        earnings = earnings + t.amount;
      }
    }

    for (const t of spendTransactions) {
      if (t.amount) {
        spends = spends + t.amount;
      }
    }

    return {
      earnings: earnings,
      impressions: feedbacks.length ?? 0,
      clicks: conversionQuery.length ?? 0,
      spend: spends,
    };
  }


  async getUserGraphValues(id: number) {
    const response = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const lastDate = new Date(currentDate);
      const lastDate2 = new Date(currentDate);

      lastDate.setDate(lastDate.getDate() - i);

      lastDate2.setDate(lastDate.getDate() - 1);

      const conversionQuery = await this.conversionRepository
        .createQueryBuilder()

        .leftJoinAndSelect('Conversion.creative', 'creative')
        .leftJoinAndSelect('creative.campaign', 'campaign')
        .leftJoinAndSelect('campaign.advertiser', 'advertiser')
        .where('advertiser.id = :advertiserId', { advertiserId: id })
        .andWhere('Conversion.date between :lastDate2 AND :lastDate', {
          lastDate2,
          lastDate,
        })
        .getMany();

      response.push({
        startDate: lastDate,
        count: conversionQuery.length,
      });
    }

    return response;
  }

  async getAdminGraphValues() {
    const response = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const lastDate = new Date(currentDate);
      const lastDate2 = new Date(currentDate);

      lastDate.setDate(lastDate.getDate() - i);

      lastDate2.setDate(lastDate.getDate() - 1);

      const result = await this.conversionRepository.find({
        where: { date: Between(lastDate2, lastDate) },
      });

      response.push({
        startDate: lastDate,
        count: result.length,
      });
    }
    return response;
  }
}
