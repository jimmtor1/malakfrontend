import { Employee } from "./employee";
import { Order } from "./order";

export interface OrderAssignment {
    id? : number;
    order : Order;
    employee : number;
    io : string;
    elementId : number;
    processingType : string;
    quantity : number;
    startTime : string;
    endTime : string;
    machine : number;
    manager : string;
    assistant : number;
    registrationDate?:string;
    score : number;
}
