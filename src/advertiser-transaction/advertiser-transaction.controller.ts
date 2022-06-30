import { Controller, Get, UseGuards, Request, Body, Post, Param, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdvertiserTransaction } from './advertiser-transaction.entity';
import { AdvertiserTransactionService } from './advertiser-transaction.service';
import { getConnection } from 'typeorm';  

@Controller('advertiser-transaction')
export class AdvertiserTransactionController {
    constructor(private advertiserTransactionService: AdvertiserTransactionService) { }

    // Create a new Transaction
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createadvertiserTransaction(@Body() transactionData: AdvertiserTransaction, @Request() req): Promise<any> {

      //console.log("userid", req.user.userId);
      transactionData.advertiserId = req.user.userId;
    
      return this.advertiserTransactionService.createadvertiserTransaction(req.user.userId, transactionData);
    }

    //get Transactions belong to one advertiser
    @UseGuards(JwtAuthGuard)
    @Get('allTrans')
    async findAllTransactions(@Request() req: any) {
    console.log("userid", req.user.userId);
    return await this.advertiserTransactionService.findAllTransactions(req.user.userId);
    }

    //get sum ofTransactions belong to one advertiser
    @UseGuards(JwtAuthGuard)
    @Get('balance')
    async findSum(@Request() req: any) {
//    console.log("userid", req.user.userId);
    return await this.advertiserTransactionService.findSum(req.user.userId);
   
    }

//     @UseGuards(JwtAuthGuard)
//     @Get('balance/:advertiserId')
//     async findSum(@Param('advertiserId') advertiserId: number)  {
// //    console.log("userid", req.user.userId);
//     return await this.advertiserTransactionService.findSum(advertiserId);
   
//     }


    @Get('all')
    async getllTransactions() {
        return await this.advertiserTransactionService.findAll();
    }

    
  @Get(':transId')
  async getTransactionsById(@Param('transId') transID: number) {
    return this.advertiserTransactionService.getAdvertiserTransactionById(transID);
  }

  

//   @Put(':transId')
//   @UseGuards(JwtAuthGuard)
//   async updateTransaction(@Param('transId') transId: number, @Body() updateTransactionDTO: updateTransactionDTO) {
//     console.log()
//     updateTransactionDTO.transId = transId;
//     return this.advertiserTransactionService.updateTransaction(updateTransactionDTO);
//   }



    // @Post('create')
    // @UseGuards(JwtAuthGuard)
    // async createTransaction(@Body() advertiserTransaction: AdvertiserTransaction, @Request() req): Promise<AdvertiserTransaction> {
    //     return await this.advertiserTransactionService.createTransaction(advertiserTransaction, req.user.userId);
    // }

    // @Get('transactionsById')
    // @UseGuards(JwtAuthGuard)
    // async findByAdvertiserId(@Request() req): Promise<AdvertiserTransaction[]> {
    //     const advertiserId = req.user.userId;
    //     const advertiserTransaction = await this.advertiserTransactionService.findByAdvertiserId(advertiserId);
    //     console.log(advertiserTransaction);
    //     return advertiserTransaction;
    // }

}
