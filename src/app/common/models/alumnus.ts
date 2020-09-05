export class Alumnus {
    email: string;
    fullName: string;
    facebookLink: string;
    age: number;
    language: number;
    level: number;
    quantity: number;
    expectedTime: string;
    expectedWeekday: string;
    expectedClass: number;
    note: string | null;
}

export class AlumnusList {
    id: number;
    fullName: string;
    level: string;
    classCode: string | null;
    email: string;
    status: string;
    sale: string;
    joinedDate: string;
}

export class AlumnusDetail {
    id: number;
    email: string;
    fullName: string;
    facebookLink: string;
    age: number;
    language: number;
    level: number;
    quantity: number;
    expectedTime: string;
    expectedWeekday: string;
    expectedClass: string;
    note: string;
}

export class AlumnusCRUDReponse {
    id: number;
    studentCode: string;
    age: number;
    saleId: number;
    createdDate: string;
    modifiedDate: string;
    createdBy: number;
}
