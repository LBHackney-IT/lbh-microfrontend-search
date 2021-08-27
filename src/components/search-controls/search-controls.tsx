import { useLocation, useHistory, useParams } from 'react-router-dom';
import React, { useCallback, useMemo } from 'react';
import { FormGroup, Select } from '@mtfh/common';

import {
    SearchSortOptions,
    SearchLimitOptions,
    locale,
    SearchType,
} from '../../services';

import './styles.scss';

interface SearchControlsProps {
    total?: number;
    page: number;
    pageSize: number;
}

const {
    loadingResults,
    noMatchingResults,
    searchResults,
    sortLabel,
    limitLabel,
    sortOptions,
    limitOption,
} = locale.controls;

export const SearchControls = ({
    total,
    page,
    pageSize,
}: SearchControlsProps): JSX.Element => {
    const { search, pathname } = useLocation();
    const { type } = useParams<{ type: SearchType }>();
    const history = useHistory();

    const sortBy = useMemo(() => {
        const query = new URLSearchParams(search);
        const sort = query.get('sort');
        const order = query.get('o');

        if (sort && order) {
            return `${sort}-${order}`;
        }

        return 'best';
    }, [search]);

    const handleSort = useCallback(
        sort => {
            const query = new URLSearchParams(search);

            switch (sort) {
                case 'best':
                default:
                    query.delete('sort');
                    query.delete('o');
                    break;
                case 'surname-asc':
                    query.set('sort', 'surname');
                    query.set('o', 'asc');
                    break;
                case 'surname-desc':
                    query.set('sort', 'surname');
                    query.set('o', 'desc');
            }

            history.push(`${pathname}?${query.toString()}`);
        },
        [search, pathname]
    );

    const handleLimit = useCallback(
        limit => {
            const query = new URLSearchParams(search);

            if (limit === String(SearchLimitOptions.SMALL)) {
                query.delete('l');
            } else {
                query.set('l', limit);
            }

            history.push(`${pathname}?${query.toString()}`);
        },
        [search, pathname]
    );

    return (
        <div className="mtfh-search-controls">
            <div
                className="mtfh-search-controls__status"
                role="region"
                aria-live="polite"
            >
                {total === undefined
                    ? loadingResults
                    : total === 0
                    ? noMatchingResults
                    : searchResults(page, pageSize, total)}
            </div>
            <div className="mtfh-search-controls__controls">
                {type === SearchType.PERSON && (
                    <FormGroup id="sortBy" label={`${sortLabel}:`}>
                        <Select
                            onChange={e => handleSort(e.currentTarget.value)}
                            value={sortBy}
                        >
                            {Object.values(SearchSortOptions).map(value => (
                                <option key={value} value={value}>
                                    {sortOptions[value]}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                )}
                <FormGroup id="limit" label={`${limitLabel}:`}>
                    <Select
                        onChange={e => handleLimit(e.currentTarget.value)}
                        value={pageSize}
                    >
                        {(Object.values(SearchLimitOptions) as number[])
                            .filter(value => typeof value === 'number')
                            .map(value => (
                                <option key={value} value={value}>
                                    {limitOption(value)}
                                </option>
                            ))}
                    </Select>
                </FormGroup>
            </div>
        </div>
    );
};
