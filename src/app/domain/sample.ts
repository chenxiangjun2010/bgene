
export interface Sample {
    id?: string;
    name: string;
    gender?: string;
    age?: string;
    illness?: string;

    hospital?: string;
    department: string;
    doctor: string;
    illnessNo?: number;
    tel?: string;
    adress?: string;

    inspectionNo?: number;
    sampleType?: string;
    orgType?:string;
    date?:Date;
    place?:string;
    container?:string;
    save?:string;
    //送检编号
    sn?:string;
    //属性
    property?:string;


}