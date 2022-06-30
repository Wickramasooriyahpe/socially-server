import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { AdvertiserTransaction } from './advertiser-transaction.entity';
import { AdvertiserTransactionDTO } from './advertiser-transaction.dto';
import { Advertiser } from 'src/advertiser/advertiser.entity';
import { updateTransactionDTO } from './updateTransactionDTO';
import { advertiserTransactionCreationDTO } from './advertiserTransactionCreationDTO';
import { date } from 'joi';

@Injectable()
export class AdvertiserTransactionService {
    constructor(
        @InjectRepository(AdvertiserTransaction)
        private advertiserTransactionRepository: Repository<AdvertiserTransaction>
    ) {}

    async createadvertiserTransaction(Advertiser: Advertiser, advertiserTransactionCreation: AdvertiserTransaction): Promise<any> {
        advertiserTransactionCreation.date =new Date();
        advertiserTransactionCreation.status ='success';
        advertiserTransactionCreation.type ='Deposit';
        advertiserTransactionCreation.Advertiser = Advertiser;
         return await this.advertiserTransactionRepository.save(advertiserTransactionCreation);
         
     }

     //Find all transactions belong to one advertiser
     async findAllTransactions(advertiserId: number): Promise<any> {
     const advertiserTransaction = await getConnection()
        .createQueryBuilder()
        .select("AdvertiserTransaction")
        .from(AdvertiserTransaction, "AdvertiserTransaction")
        .where("AdvertiserTransaction.advertiserId = :advertiserId", { advertiserId: advertiserId })
        .getMany();

     return advertiserTransaction;
     }

     //Get sum of all transactions belong to one adveriser
     async findSum(advertiserId: number): Promise<any> {
        const { balance } = await getRepository(AdvertiserTransaction)
        .createQueryBuilder("AdvertiserTransaction")
        .select("SUM(AdvertiserTransaction.amount)", "balance")
        .where("AdvertiserTransaction.advertiserId = :advertiserId", { advertiserId: advertiserId })
        .getRawOne();
   
        //console.log(balance);
        return balance;
        }









    // //Top up account
    // async topUpAccount({email, amount}: AdvertiserTransactionDTO):Promise<any>{
    //     const advertiserTransaction = await this.advertiserTransactionRepository.findOne({where:  {email}});
    //     // advertiser.balance = advertiser.balance - amount;
    //     advertiserTransaction.amount += amount;
    //     //console.log(advertiser.balance - amount)
    //     await this.advertiserTransactionRepository.save(advertiserTransaction);
    //     return AdvertiserTransactionDTO(advertiserTransaction);
    // }

    async findAll(): Promise<AdvertiserTransaction[]> {
        return await this.advertiserTransactionRepository.find();
    }

    // async create(advertiserTransaction: AdvertiserTransaction , adv_Id : string ): Promise<AdvertiserTransaction> {
    //     return await this.advertiserTransactionRepository.save(advertiserTransaction);
    // }
    async getAdvertiserTransactionById(transId: number): Promise<AdvertiserTransaction> {
        try {
            return this.advertiserTransactionRepository.findOne({ transId })
        } catch (err) {
            throw err;
        }
    }

   


async updateTransaction(createTransactionDTO: advertiserTransactionCreationDTO): Promise<any> {

    const { advertiserID, amount} = createTransactionDTO;
    const Transaction = await this.getAdvertiserTransactionById(advertiserID);
   
    Transaction.amount = amount;
    Transaction.date = new Date();
   // Transaction.status =false;
    //Transaction.type = "Deposit";
    
    return this.advertiserTransactionRepository.save(Transaction);
}

    // async findOne(id: number): Promise<PublisherTransaction> {
    //     return await this.publisherTransactionRepository.findOne(id);
    // }

    // async update(id: number, publisherTransaction: PublisherTransaction): Promise<PublisherTransaction> {
    //     publisherTransaction.id = id;
    //     return await this.publisherTransactionRepository.save(publisherTransaction);
    // }

    // async delete(id: number): Promise<void> {
    //     await this.publisherTransactionRepository.delete(id);
    // }


    // async findByPublisherIdAndType(publisherId: number, type: string): Promise<PublisherTransaction[]> {
    //     return await this.publisherTransactionRepository.find({
    //         where: { publisherId, type },
    //     });
    // }

}
