import React from 'react';

import type { PersonSearchResult } from '@mtfh/common/lib/api/person/v1';

import { TenureCard } from './tenure-card';
import { PropertyCard } from './property-card';
import { PersonCard } from './person-card';
import { isPerson, isTenure, isAsset } from '../../utils';
import type { AssetSearchResult, TenureSearchResult } from '../../types';

export interface SearchResultProps {
    result: PersonSearchResult | TenureSearchResult | AssetSearchResult;
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
    if (isAsset(result)) {
        return <PropertyCard asset={result} />;
    }
    return null;
};
