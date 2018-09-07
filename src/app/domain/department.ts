import { Hospital } from "@domain/hospital";

export interface Department {
    id?:number;
    name?:string;
    phone?:string;
    address?:string;
    hospital?:Hospital;
}
