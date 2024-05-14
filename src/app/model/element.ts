import { Order } from "./order";

export interface Element {

    id? : number;
    name?: string;
    material? : string;
    length?: number;    
    width?: number;    
    height?: number;
    quantity?: number;
    order? : Order;
    assigned? : number;
    consecutive? : number;
}
