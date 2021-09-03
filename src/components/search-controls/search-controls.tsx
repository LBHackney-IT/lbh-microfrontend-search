import React, { useCallback, useContext, useMemo } from 'react';
import { FormGroup, Select } from '@mtfh/common';

import {
    PersonSortOptions,
    PersonSortOrderOptions,
    OrderByOptions,
    LimitOptions,
    SearchType,
} from '../../types';
import { locale } from '../../services';
import { SearchContext } from '../../context/search-context';
import './styles.scss';

const {
    loadingResults,
    noMatchingResults,
    searchResults,
    sortLabel,
    limitLabel,
    sortOptions,
    limitOption,
} = locale.controls;

export const SearchControls = (): JSX.Element | null => {
    const {
        state: { sort, order, type, pageSize, total, page, searchText },
        dispatch,
    } = useContext(SearchContext);

    const sortBy = useMemo(() => {
        if (sort && order) {
            return `${sort}-${order}`;
        }

        return '';
    }, [sort, order]);

    const handleSortOrder = useCallback((sortOrder: PersonSortOrderOptions) => {
        switch (sortOrder) {
            case PersonSortOrderOptions.BEST:
            default:
                dispatch({ type: 'SORT', payload: PersonSortOptions.BEST });
                dispatch({ type: 'ORDER', payload: OrderByOptions.ASC });
                break;
            case PersonSortOrderOptions.SURNAME_ASC:
                dispatch({
                    type: 'SORT',
                    payload: PersonSortOptions.SURNAME,
                });
                dispatch({ type: 'ORDER', payload: OrderByOptions.ASC });
                break;
            case PersonSortOrderOptions.SURNAME_DESC:
                dispatch({
                    type: 'SORT',
                    payload: PersonSortOptions.SURNAME,
                });
                dispatch({ type: 'ORDER', payload: OrderByOptions.DESC });
        }
    }, []);

    const handleLimit = useCallback((limit: LimitOptions) => {
        dispatch({ type: 'LIMIT', payload: limit });
    }, []);

    if (!searchText) {
        return null;
    }

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
                            onChange={e =>
                                handleSortOrder(
                                    e.currentTarget
                                        .value as PersonSortOrderOptions
                                )
                            }
                            value={sortBy}
                        >
                            {Object.values(PersonSortOrderOptions).map(
                                value => (
                                    <option key={value} value={value}>
                                        {sortOptions[value]}
                                    </option>
                                )
                            )}
                        </Select>
                    </FormGroup>
                )}
                <FormGroup id="limit" label={`${limitLabel}:`}>
                    <Select
                        onChange={e =>
                            handleLimit(Number(e.currentTarget.value))
                        }
                        value={pageSize}
                    >
                        {(Object.values(LimitOptions) as number[])
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
