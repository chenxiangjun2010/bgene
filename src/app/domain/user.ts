
export interface User {
    id?: string;
    name: string;
    no?: string;
    role: number[];
    gender?: string;
    telephone?: string;
    password: string;
    confirmpassword: string;
    status?: number;
    remark?: string;
    creator?: User;
    deleter?: User;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}