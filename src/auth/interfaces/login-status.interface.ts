
export interface LoginStatus {
  userName: string;
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
