export class Lecturer {
    email: string;
    fullName: string;
    facebookLink: string;
    language: number;
    level: number;
    pricingLevel: string;
}

export class LecturerList {
    id: number;
    fullName: string;
    language: string;
    level: string;
    saleId: number;
    priceLevel: string;
    email: string;
    status: string;
    joinedDate: Date | string;

    constructor(prop) {
        Object.assign(this, prop);
    }

    static fromResponse(data: any): LecturerList {
        const lecturer = new LecturerList({
            id: data.id,
            fullName: data.fullName,
            language: data.language,
            level: data.level,
            priceLevel: data.price_level,
            email: data.email,
            status: data.status,
            joinedDate: data.joinedDate,
        });

        return lecturer;
    }
}

export class LecturerDetail {
    id: number;
    email: string;
    fullName: string;
    facebookLink: string;
    language: number;
    level: number;
    pricingLevel: string;
}

export class LecturerCRUDReponse {
    id: number;
    teacherCode: string;
    pricingLevel: string;
    status: number;
    job: null | string;
    location: null | string;
    university: null | string;
    major: null | string;
    description: null | string;
    teachingStyle: null | string;
    createdDate: string;
    modifiedDate: string;
    createdBy: number;
}
