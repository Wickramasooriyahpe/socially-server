import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    paymentMethodId: string;
   
    @IsNumber()
    amount: number;
}
export default CreatePaymentDto ;