import React, { ComponentType, useContext } from 'react';
import { Center, Spinner } from '@mtfh/common';

import { PersonSearchResult, Tenure, Property } from '../../types';
import { SearchContext } from '../../context/search-context';
import './search.scss';

export interface SearchResultsProp {
    // children: (results: Tenure[] | Person[] | Property[]) => ReactNode;
    component: ComponentType<{
        result: Tenure | PersonSearchResult | Property;
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
            {results.map((result: Tenure | PersonSearchResult | Property) => (
                <Component key={result.id} result={result} />
            ))}
        </div>
    );
};
