import React from 'react';
import { Center, Spinner } from '@mtfh/common';

import { isPerson } from '@utilities';
import { Person, Tenure } from '@types';

import { PersonCard } from '../search-result/person-card';
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
            })}
        </div>
    );
};
