import { Controller ,Body , Post, Req, UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { StripeService } from "./stripe.service";
import CreatePaymentDto from "./createPayment.dto";

@Controller('payments')
export class SrtipeController {
    constructor(
        private readonly stripeService: StripeService,
       
      ) {}
     
   @UseGuards(JwtAuthGuard)
            @Post()
            async createCharge(@Body() charge:CreatePaymentDto): Promise<any>  {
             await this.stripeService.charge(charge.amount,charge.token);
             
             } 


}

