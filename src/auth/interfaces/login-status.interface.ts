import { AdvertiserDto } from './../../advertiser/advertiserDto';

export interface LoginStatus {
  email: string;
  accessToken: any;
  expiresIn: any;
}

export interface PublisherLoginStatus{
  phoneNumber: string
  accessToken:any
  expireIn:any
}
