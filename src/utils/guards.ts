import type { Tenure } from '@mtfh/common/lib/api/tenure/v1';
import type { Property } from '@mtfh/common/lib/api/property/v1';
import type { PersonSearchResult } from '@mtfh/common/lib/api/person/v1';

export const isPerson = (
    person: Record<string, any>
): person is PersonSearchResult => {
    return (person as PersonSearchResult).firstname !== undefined;
};

export const isTenure = (tenure: Record<string, any>): tenure is Tenure => {
    return (tenure as Tenure).paymentReference !== undefined;
};

export const isProperty = (
    property: Record<string, any>
): property is Property => {
    return (property as Property).assetId !== undefined;
};
