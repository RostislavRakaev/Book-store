import { Books } from 'src/app/books/book';

export interface Author {
    name: string;
    dob: number;
    country: string;
    written_books: Books[];
    isNew?: boolean;
    bio?: string;
    _id?: number;
}