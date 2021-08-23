import {
    useParams,
    useLocation,
    useHistory,
    Link as RouterLink,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ErrorSummary, Layout, Link, Button } from '@mtfh/common';

import { SearchTypeLegacy, useSearchLegacy, locale } from '@services';

import {
    SearchControls,
    SearchResults,
    SearchFormLegacy,
    SearchPagination,
} from '@components';

const { searchResults, searchType, searchAgain } = locale.results;

export const SearchResultsViewLegacy = (): JSX.Element => {
    const [showSearchAgain, setSearchAgain] = useState(false);
    const history = useHistory();
    const { type } = useParams<{ type: SearchTypeLegacy }>();
    const { search, pathname } = useLocation();
    const query = new URLSearchParams(search);
    const searchText = query.get('s') || '';
    const page = Number(query.get('p') || 1);
    const pageSize = Number(query.get('l') || 12);
    const sortBy = query.get('sort') || '';
    const isDesc = query.get('o') === 'desc';

    useEffect(() => {
        setSearchAgain(false);
        sessionStorage.setItem('search:last', `${pathname}${search}`);
    }, [search, pathname]);

    useEffect(() => {
        if (page <= 0) {
            query.delete('p');
            history.replace(`${pathname}?${query.toString()}`);
        }
    }, [page]);

    useEffect(() => {
        if (!searchText) {
            history.replace('/');
        }
    }, [searchText]);

    const { data, error } = useSearchLegacy({
        type,
        searchText,
        pageSize,
        page,
        sortBy,
        isDesc,
    });

    const {
        results: { [type]: results },
        total,
    } = data || {
        results: { [type]: undefined },
    };

    useEffect(() => {
        if (total) {
            const totalPages = Math.ceil(total / pageSize);
            if (page > totalPages) {
                query.set('p', totalPages.toString());
                history.replace(`${pathname}?${query.toString()}`);
            }
        }
    }, [page, total, pageSize]);

    return (
        <Layout>
            <Link as={RouterLink} to="/" variant="back-link">
                {locale.home}
            </Link>
            <h1 className="lbh-heading-h1">{searchResults}</h1>
            <h2 className="lbh-heading-h2">
                {searchType[type]}: {searchText}
            </h2>
            <Button onClick={() => setSearchAgain(true)}>{searchAgain}</Button>
            {showSearchAgain && (
                <>
                    <h2 className="lbh-heading-h2">{locale.search}</h2>
                    <SearchFormLegacy defaultType={type} />
                </>
            )}
            {error ? (
                <ErrorSummary
                    id="search-result-error"
                    title={locale.errors.searchUnexpectedErrorTitle}
                    description={locale.errors.searchUnexpectedErrorDescription}
                />
            ) : (
                <>
                    <SearchControls
                        total={total}
                        page={page}
                        pageSize={pageSize}
                    />
                    <SearchResults results={results} />
                    <SearchPagination
                        total={total}
                        page={page}
                        pageSize={pageSize}
                    />
                </>
            )}
        </Layout>
    );
};
