import { creativeService } from './../creative/creative.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublisherTransaction } from './publisher-transaction.entity';
import { PublisherTransactionDTO } from './publisher-transaction.dto';

@Injectable()
export class PublisherTransactionService {
    constructor(
        @InjectRepository(PublisherTransaction)
        private publisherTransactionRepository: Repository<PublisherTransaction>, private readonly creativeService: creativeService
    ) { }

    async findAll(): Promise<PublisherTransaction[]> {
        return await this.publisherTransactionRepository.find();
    }

    async create(publisherTransaction: PublisherTransaction, publisherID: string): Promise<PublisherTransaction> {
        return await this.publisherTransactionRepository.save(publisherTransaction);
    }

    async findByPublisherId(publisherId: Number): Promise<PublisherTransaction[]> {
        return await this.publisherTransactionRepository.find({
            where: { publisherId },
        });
    }

    async earning(publisherId: number, creativeId: number, date: string) {
        const creative = await this.creativeService.getCreativeById(creativeId)
        const amountPerClick = creative.costPerSale;
        await this.publisherTransactionRepository.save({ amount: amountPerClick, date, time: date, type: 'earning', publisherId: publisherId })
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
