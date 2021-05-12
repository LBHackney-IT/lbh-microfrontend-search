export type PersonType = 'Housing Officer' | string;

export interface Identification {
    identificationType: string;
    value: string;
    originalDocumentSeen: boolean;
    linkToDocument: string;
}

export interface Tenure {
    id: string;
    type: string;
    startDate: string;
    endDate: string;
    assetFullAddress: string;
}

export interface Person {
    id: string;
    title: string;
    firstname: string;
    middleName?: string;
    surname: string;
    preferredFirstname: string;
    preferredSurname: string;
    ethinicity: string;
    nationality: string;
    placeOfBirth: string;
    dateOfBirth: string;
    gender: string;
    identification: Identification[];
    personTypes: PersonType[];
    isPersonCautionaryAlert: boolean;
    isTenureCautionaryAlert: boolean;
    tenures: Tenure[];
    [key: string]: any;
}
