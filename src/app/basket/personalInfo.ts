export interface PersonalInfo {
    first_name: string;
    last_name: string;
    email: string;
    address1: string;
    address2?: string;
    country: string;
    state: string;
    zip: number | string;
}