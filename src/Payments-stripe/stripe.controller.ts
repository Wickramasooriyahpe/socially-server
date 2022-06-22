import { Controller ,Body , Post, Req, UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { StripeService } from "./stripe.service";
import CreatePaymentDto from "./createPayment.dto";
import { Advertiser } from "src/advertiser/advertiser.entity";
import { Request } from 'express';

@Controller('payments')
export class SrtipeController {
    constructor(
        private readonly stripeService: StripeService
      ) {}
     
      @UseGuards(JwtAuthGuard)
      @Post()
      async createCharge(@Body() charge: CreatePaymentDto, @Req() request): Promise<any>  {
        //console.log(request.user.stripeCustomerId)
       await this.stripeService.charge(charge.amount, charge.paymentMethodId, request.user.stripeCustomerId);
      } 
}