import { Observable } from 'rxjs';
import { Author } from '../adminspanel/authors/author';

export interface Books{
    title: string;
    description: string;
    language: string;
    author: Author[];
    price: number;
    image_url: string;
    genre: string;
    quantity: number;
    purchased_copies?: number;
    published?: number;
    _id?:number;
    isNew?:boolean;
  }
  
  