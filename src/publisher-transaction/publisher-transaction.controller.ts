import { Controller, Get, UseGuards, Request, Body, Post } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/jwt.guard';
import { PublisherTransactionService } from './publisher-transaction.service';
import { PublisherTransaction } from './publisher-transaction.entity';

@Controller('publisher-transaction')
export class PublisherTransactionController {
    constructor(private publisherTransactionService: PublisherTransactionService) { }

    @Get()
    async findAllTransactions() {
        return await this.publisherTransactionService.findAll();
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async create(@Body() publisherTransaction: PublisherTransaction, @Request() req): Promise<PublisherTransaction> {
        return await this.publisherTransactionService.create(publisherTransaction, req.user.userId);
    }

    @Get('transactionsByPublisherId')
    @UseGuards(JwtAuthGuard)
    async findByPublisherId(@Request() req): Promise<PublisherTransaction[]> {
        const publisherId = req.user.userId;
        const publisherTransaction = await this.publisherTransactionService.findByPublisherId(publisherId);
        console.log(publisherTransaction);
        return publisherTransaction;
    }

}
