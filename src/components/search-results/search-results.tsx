import React, { ComponentType, useContext } from 'react';

import { Tenure } from '@mtfh/common/lib/api/tenure/v1';
import { Property } from '@mtfh/common/lib/api/property/v1';
import { PersonSearchResult } from '@mtfh/common/lib/api/person/v1';
import { Center, Spinner } from '@mtfh/common';
import { SearchContext } from '../../context/search-context';
import './search.scss';

type SearchResult = Tenure | PersonSearchResult | Property;

export interface SearchResultsProp {
    component: ComponentType<{
        result: SearchResult;
    }>;
}

export const SearchResults = ({
    component: Component,
}: SearchResultsProp): JSX.Element => {
    const {
        state: { results },
    } = useContext(SearchContext);

    if (results === undefined) {
        return (
            <Center className="mtfh-search__loading">
                <Spinner />
            </Center>
        );
    }

    return (
        <div className="mtfh-search__results">
            {results.map((result: PersonSearchResult | Tenure | Property) => (
                <Component key={result.id} result={result} />
            ))}
        </div>
    );
};
