import { AdvertiserDto } from '../../advertiser/dto/advertiserDto';

export interface LoginStatus {
  userName: string;
  userId: number;
  userRole: string;
  accessToken: any;
  expiresIn: any;
}

export interface PublisherLoginStatus {
  id: number
  phoneNumber: string
  accessToken: any
  expireIn: any
  isNewUser: boolean
}


