import { Department } from "@domain/department";

export interface Doctor{
    id?:number;
    name?:string;
    phone?:string;
    address?:string;
    department?:Department;
}