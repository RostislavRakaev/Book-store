import { Observable } from 'rxjs';

export interface Books{
    title: string;
    description: string;
    language: string;
    author: string;
    price: number;
    image_url: string;
    genre: string;
    quantity: number;
    purchased_copies?: number;
    published?: number;
    _id?:number;
    isNew?:boolean;
  }
  
  