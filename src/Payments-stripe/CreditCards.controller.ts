import { Body, Controller, Post, Req, UseGuards,Get } from '@nestjs/common';
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { StripeService } from "./stripe.service";
import AddCreditCardDto from './AddCreditCard.Dto';

@Controller('credit-cards')
export default class CreditCardsController {
  constructor(
    private readonly stripeService: StripeService
  ) {}
 
  @UseGuards(JwtAuthGuard )
  @Post()
  async addCreditCard(@Body() creditCard: AddCreditCardDto, @Req() request): Promise<any>  {
    return this.stripeService.attachCreditCard(creditCard.paymentMethodId, request.user.stripeCustomerId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCreditCards(@Req() request): Promise<any> {
    return this.stripeService.listCreditCards(request.user.stripeCustomerId);
  }
}