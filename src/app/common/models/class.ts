export class Class {
    pricing: number;
    teacher: number;
    time: string;
    weekday: string;
    sale: number;
}

export class ClassList {
    id: number;
    classCode: string;
    teacherName: string;
    teacherLink: string;
    language: string;
    level: string;
    weekday: string | null;
    time: string;
    quantity: string;
    status: null | string;
    sale: string;
}

export class ClassDetail {
    id: number;
    pricing: number;
    teacher: number;
    time: string;
    weekday: string | null;
    sale: string;
}

export class ClassCRUDReponse {
    id: number;
    classCode: string;
    realQuantity: number;
    price: number;
    total: number;
    time: string;
    weekday: string | null;
    duration: string | null;
    trialDate: string | null;
    startDate: string | null;
    note: string | null;
    status: number | null;
    createdDate: string;
    modifiedDate: string;
    createdBy: number;
}
