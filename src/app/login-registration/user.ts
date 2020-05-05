import { Books } from '../books/book';

export class User {
    first_name: string;
    last_name: string;
    email: string;
    password: string
    role: string;
    date?: Date;
    books?: Books[];
    _id?: number;
}