export class Sale {
    email: string;
    fullName: string;
    facebookLink: string;
    phone: string;
}

export class SaleList {
    id: number;
    fullName: string;
    email: string;
    phone: string | null;
    status: string;
    joinedDate: string;
}

export class SaleDetail {
    id: number;
    email: string | null;
    fullName: string;
    facebookLink: string;
    phone: string;
}

export class SaleCRUDReponse {
    id: number;
    email: string;
    password: string;
    active: number;
    createdDate: string;
    modifiedDate: string;
    createdBy: number;
}
