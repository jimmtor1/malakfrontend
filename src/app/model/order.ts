import { Customer } from "./customer";

export interface Order{
    id?: string;
    subId?: number;
    suffix?:string;
    customer?: Customer;
    // customer?:string;
    date?:Date;
    active?:boolean;
}