export interface PropertyTenureType {
    code: string;
    description: string;
}

export interface AssetAddress {
    uprn: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    postCode: string;
    postPreamble: string;
}

export interface PropertyTenure {
    id: string;
    paymentReference: string;
    type: string; // PropertyTenureType;
    startOfTenureDate: string;
    endOfTenureDate: string | null;
    isActive: boolean;
}

export interface Property {
    id: string;
    assetId: string;
    assetType: string;
    assetAddress: AssetAddress;
    tenure: PropertyTenure;
    isAssetCautionaryAlerted: boolean;
}
