import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {    
    amount: number;
    token: any;

}
export default CreatePaymentDto ;