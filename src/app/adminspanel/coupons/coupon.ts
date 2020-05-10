import { User } from 'src/app/login-registration/user';

export interface Coupon {
    code: string;
    date_of_implementation: number;
    date_of_expiration: number | string;
    discount: number;
    who_issued: User;
    _id?: number;
    used?: number;
}