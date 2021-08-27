import { Person, Tenure, Property } from '../types';

export const isPerson = (person: Record<string, any>): person is Person => {
    return (person as Person).firstname !== undefined;
};

export const isTenure = (tenure: Record<string, any>): tenure is Tenure => {
    return (tenure as Tenure).paymentReference !== undefined;
};

export const isProperty = (
    property: Record<string, any>
): property is Property => {
    return (property as Property).assetId !== undefined;
};
