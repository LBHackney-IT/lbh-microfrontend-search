import React from 'react';

import { TenureCard } from './tenure-card';
import { PropertyCard } from './property-card';
import { PersonCard } from './person-card';
import { isPerson, isTenure, isProperty } from '../../utils';
import { Person, Property, Tenure } from '../../types';

export interface SearchResultProps {
    result: Person | Tenure | Property;
}

export const SearchResult = ({
    result,
}: SearchResultProps): JSX.Element | null => {
    if (isPerson(result)) {
        return <PersonCard person={result} />;
    }
    if (isTenure(result)) {
        return <TenureCard tenure={result} />;
    }
    if (isProperty(result)) {
        return <PropertyCard asset={result} />;
    }
    return null;
};
