import React, { ComponentType, useContext } from 'react';

import { Center, Spinner } from '@mtfh/common/lib/components';
import type { PersonSearchResult } from '@mtfh/common/lib/api/person/v1';
import { AssetSearchResult, TenureSearchResult } from '../../types';

import { SearchContext } from '../../context/search-context';
import './search.scss';

type SearchResult = TenureSearchResult | PersonSearchResult | AssetSearchResult;

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
            {results.map(
                (
                    result:
                        | PersonSearchResult
                        | TenureSearchResult
                        | AssetSearchResult
                ) => (
                    <Component key={result.id} result={result} />
                )
            )}
        </div>
    );
};
