export interface HouseholdMember {
    id: string;
    type: 'person' | 'organisation';
    fullName: string;
    isResponsible: boolean;
}

export interface TenureType {
    code: string;
    description: string;
}

export interface TenureAsset {
    id: string;
    fullAddress: string;
    type: string;
    uprn: string;
}

export interface Tenure {
    id: string;
    paymentReference: string;
    startOfTenureDate: string;
    endOfTenureDate: string | null;
    householdMembers: HouseholdMember[];
    tenureType: TenureType;
    tenuredAsset: TenureAsset;
}
