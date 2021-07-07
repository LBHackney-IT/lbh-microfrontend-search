import React, { useEffect, useState } from 'react';

import { augmentWithTenure, createBemElementBuilder } from '@utilities';
import { Person } from '@types';
import { findByPersonName, cacheKeys } from '@services';
import { Pagination } from '@components';
import { fromTo, parseSort } from './search-utils';
import { SearchResultItem } from './search-result-item';
import './search.scss';

export function Search(): JSX.Element {
    const [results, setResults] = useState<Person[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [pageTitle, setPageTitle] = useState<string>('Search');
    const [searchedTerm, setSearchedTerm] = useState<string>('');
    const [showingResultsForTerm, setShowingResultsForTerm] = useState<string>(
        ''
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isDesc, setIsDesc] = useState<string>('false');
    const [by, setBy] = useState<string>('');
    const [pageSize, setPageSize] = useState<number>(12);
    const [itemsFrom, setItemsFrom] = useState<number>(1);
    const [itemsTo, setItemsTo] = useState<number>(1);
    const [showSearchForm, setShowSearchForm] = useState<boolean>(true);

    const bemBlock = 'mtfh-search';
    const __ = createBemElementBuilder(bemBlock);

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const onTypingSearchTerm = (event_: any) => {
        setSearchedTerm(event_.target.value.trim());
    };

    const toggleSearchAgain = () => {
        setShowSearchForm(!showSearchForm);
    };

    const onSortChange = (event_: any) => {
        const [sortType, sortValue] = parseSort(event_.currentTarget.value);
        setIsDesc(sortValue.toString());
        setBy(sortType);
    };

    const onPageSizeChange = (event_: any) => {
        setPageSize(Number(event_.currentTarget.value));
    };

    const doSearch = (page?: number, overwriteSearchedTerm?: string) => {
        findByPersonName({
            searchText: overwriteSearchedTerm ?? searchedTerm,
            page: page ?? currentPage,
            isDesc,
            pageSize,
            sortBy: by,
        })
            .then(result => result.json())
            .then(data => {
                const {
                    results: { persons },
                    total,
                } = data;

                for (const person of persons) {
                    augmentWithTenure(person);
                }

                setResults(persons);
                setTotalResults(total);
                setPageTitle(`Search${results.length > 0 ? ' results' : ''}`);
                sessionStorage.setItem(
                    cacheKeys.SEARCHED_TERM,
                    overwriteSearchedTerm ?? searchedTerm
                );

                const [from, to] = fromTo(page ?? currentPage, pageSize, total);

                setItemsFrom(from);
                setItemsTo(to);
                setShowingResultsForTerm(overwriteSearchedTerm ?? searchedTerm);
            });
    };

    const search = (page?: number) => {
        if (searchedTerm) {
            setShowSearchForm(false);
            setShowSearchForm(false);
            doSearch(page);
        }
    };

    const onClickSearch = () => {
        if (searchedTerm && searchedTerm !== showingResultsForTerm) {
            setCurrentPage(1);
            search(1);
        }
    };

    const onSearchInputKeyDown = ({ code }: any) => {
        if (code === 'Enter') {
            onClickSearch();
        }
    };

    useEffect(() => {
        if (searchedTerm === showingResultsForTerm) {
            search();
        }
    }, [currentPage, by, isDesc]);

    useEffect(() => {
        setCurrentPage(1);
        search(1);
    }, [pageSize]);

    useEffect(() => {
        const cachedSearchedTerm = sessionStorage.getItem(
            cacheKeys.SEARCHED_TERM
        );
        if (cachedSearchedTerm) {
            setSearchedTerm(cachedSearchedTerm);
            setShowingResultsForTerm(cachedSearchedTerm);
            setShowSearchForm(false);
            doSearch(1, cachedSearchedTerm);
        }
    }, []);

    return (
        <div className={bemBlock} data-testid="searchComponent">
            <div className={__('header')}>
                <h2 className={__('title')}>{pageTitle}</h2>
                {showingResultsForTerm && (
                    <>
                        <h3 className={__('subtitle')}>
                            Person:
                            <span className={__('subtitle__highlight')}>
                                {showingResultsForTerm}
                            </span>
                        </h3>
                        <div>
                            <button
                                className="govuk-button lbh-button"
                                data-module="govuk-button"
                                onClick={toggleSearchAgain}
                            >
                                {showSearchForm ? 'Close' : 'Search again'}
                            </button>
                        </div>
                    </>
                )}

                {showSearchForm && (
                    <>
                        <div className="govuk-form-group lbh-form-group">
                            <input
                                className="govuk-input lbh-input"
                                id="searchInput"
                                name="searchedTerm"
                                type="text"
                                data-testid="searchInput"
                                onChange={onTypingSearchTerm}
                                onKeyDown={onSearchInputKeyDown}
                                placeholder="Enter search query"
                            />
                        </div>
                        <button
                            className="govuk-button lbh-button"
                            data-module="govuk-button"
                            onClick={onClickSearch}
                            data-testid="btnSearch"
                        >
                            Search
                        </button>

                        <div className="govuk-form-group lbh-form-group">
                            <fieldset className="govuk-fieldset">
                                <div className="govuk-radios lbh-radios">
                                    <div className="govuk-radios__item">
                                        <input
                                            className="govuk-radios__input"
                                            id="filterPerson"
                                            name="filterPerson"
                                            type="radio"
                                            value="yes"
                                            defaultChecked
                                        />
                                        <label
                                            className="govuk-label govuk-radios__label"
                                            htmlFor="filterPerson"
                                        >
                                            Person
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </>
                )}
            </div>

            {!totalResults && showingResultsForTerm && <p>No results</p>}

            {totalResults > 0 && (
                <>
                    <div className="mtfh-search__filters">
                        <div className="mtfh-search__filters-status">
                            Items {itemsFrom} - {itemsTo}
                        </div>
                        <div className="govuk-form-group lbh-form-group">
                            <label
                                className="govuk-label lbh-label"
                                htmlFor="select-1"
                            >
                                Sort by
                            </label>
                            <select
                                onChange={onSortChange}
                                className="govuk-select lbh-select"
                                id="select-1"
                            >
                                <option value="_0">Best match</option>
                                <option value="surname_0">Last name A-Z</option>
                                <option value="surname_1">Last name Z-A</option>
                            </select>
                        </div>
                        <div className="govuk-form-group lbh-form-group">
                            <label
                                className="govuk-label lbh-label"
                                htmlFor="select-2"
                            >
                                Show
                            </label>
                            <select
                                value={pageSize}
                                onChange={onPageSizeChange}
                                className="govuk-select lbh-select"
                                id="select-2"
                            >
                                <option value="12">12 items</option>
                                <option value="20">20 items</option>
                                <option value="40">40 items</option>
                            </select>
                        </div>
                    </div>
                </>
            )}

            <div className="mtfh-search__results">
                {results.map(result => (
                    <SearchResultItem key={result.id} {...result} />
                ))}
            </div>
            <Pagination
                totalResults={totalResults}
                onChange={onPageChange}
                pageSize={pageSize}
            />
        </div>
    );
}
