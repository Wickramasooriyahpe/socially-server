import { Injectable } from '@nestjs/common';

@Injectable()
export class AdSharingService {
    getOGdata(){
        const data ={
          url:'https://socially-admin.herokuapp.com/navi',
          title: 'Hurry up! grab your discount soon',
          description:'sample description about the advertisements',
          image:'https://iili.io/XbGhEg.jpg" alt="XbGhEg.jpg" border="0"'
        }
        return data;
}}
