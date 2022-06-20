import { AdvertiserDto } from './../../advertiser/advertiserDto';

export interface LoginStatus {
  userName: string;
  id:number
  accessToken: any;
  expiresIn: any;
}

export interface PublisherLoginStatus{
  phoneNumber: string
  accessToken:any
  expireIn:any
  isNewUser:boolean
}
