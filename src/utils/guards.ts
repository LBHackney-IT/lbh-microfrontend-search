import { Person, Tenure } from '@types';

export const isPerson = (person: Record<string, any>): person is Person => {
    return (person as Person).firstname !== undefined;
};

export const isTenure = (tenure: Record<string, any>): tenure is Tenure => {
    return (tenure as Tenure).assetFullAddress !== undefined;
};
