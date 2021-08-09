import React from 'react';
import { Center, Spinner } from '@mtfh/common';

import { isPerson, isTenure } from '@utilities';
import { Person, Tenure } from '@types';

import { PersonCard, TenureCard } from '../search-result';
import './search.scss';

interface SearchResultsProps {
    results?: Person[] | Tenure[];
}

export const SearchResults = ({ results }: SearchResultsProps): JSX.Element => {
    if (results === undefined) {
        return (
            <Center className="mtfh-search__loading">
                <Spinner />
            </Center>
        );
    }
    return (
        <div className="mtfh-search__results">
            {results.map((result: Person | Tenure) => {
                if (isPerson(result)) {
                    return <PersonCard key={result.id} person={result} />;
                }
                if (isTenure(result)) {
                    return <TenureCard key={result.id} tenure={result} />;
                }
            })}
        </div>
    );
};
