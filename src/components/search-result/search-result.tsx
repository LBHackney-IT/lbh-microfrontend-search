import React from 'react';

import type { Tenure } from '@mtfh/common/lib/api/tenure/v1';
import type { Property } from '@mtfh/common/lib/api/property/v1';
import type { PersonSearchResult } from '@mtfh/common/lib/api/person/v1';

import { TenureCard } from './tenure-card';
import { PropertyCard } from './property-card';
import { PersonCard } from './person-card';
import { isPerson, isTenure, isProperty } from '../../utils';

export interface SearchResultProps {
    result: PersonSearchResult | Tenure | Property;
}

export const SearchResult = ({
    result,
}: SearchResultProps): JSX.Element | null => {
    if (isPerson(result)) {
        return <PersonCard person={result as PersonSearchResult} />;
    }
    if (isTenure(result)) {
        return <TenureCard tenure={result} />;
    }
    if (isProperty(result)) {
        return <PropertyCard asset={result} />;
    }
    return null;
};
