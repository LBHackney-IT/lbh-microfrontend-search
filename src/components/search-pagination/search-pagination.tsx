import { Link, useLocation } from 'react-router-dom';
import React, { useCallback, useMemo } from 'react';

import {
    Pagination,
    PaginationSummary,
    PaginationControls,
    PaginationButton,
} from '@mtfh/common';

import { locale } from '@services';

const {
    previous,
    next,
    assistiveNavigation,
    searchResults,
} = locale.pagination;

interface SearchPaginationProps {
    total?: number;
    page: number;
    pageSize: number;
    pageRange?: number;
}

export const SearchPagination = ({
    total = -1,
    page,
    pageSize,
    pageRange = 2,
}: SearchPaginationProps): JSX.Element | null => {
    const { search, pathname } = useLocation();
    const totalPages = Math.ceil(total / pageSize);
    const activePage = page < 1 ? 1 : page > totalPages ? totalPages : page;

    const generatePageLink = useCallback(
        (target: number) => {
            const newQuery = new URLSearchParams(search);
            if (target === 1) {
                newQuery.delete('p');
            } else {
                newQuery.set('p', target.toString());
            }
            return `${pathname}?${newQuery.toString()}`;
        },
        [search, pathname]
    );

    const range = useMemo(() => {
        let rangeStart = activePage - pageRange;
        let rangeEnd = activePage + pageRange;
        if (rangeEnd > totalPages) {
            rangeEnd = totalPages;
            rangeStart = totalPages - pageRange * 2;
        }

        if (rangeStart <= 1) {
            rangeStart = 1;
            rangeEnd = Math.min(pageRange * 2 + 1, totalPages);
        }

        const length = rangeEnd - rangeStart + 1;
        const visiblePages = new Array<number>(length);

        for (let i = 0; i < length; i += 1) {
            visiblePages[i] = rangeStart + i;
        }

        return visiblePages;
    }, [total, page, pageSize, pageRange]);

    if (totalPages === Infinity || range.length === 0 || total < 0) {
        return null;
    }

    return (
        <Pagination role="navigation">
            <PaginationSummary>
                {searchResults(page, pageSize, total)}
            </PaginationSummary>
            <PaginationControls>
                {activePage > 1 && (
                    <PaginationButton
                        as={Link}
                        to={generatePageLink(activePage - 1)}
                        variant="previous"
                    >
                        {previous}
                    </PaginationButton>
                )}
                {range.map(index => (
                    <PaginationButton
                        key={index}
                        as={Link}
                        to={generatePageLink(index)}
                        active={index === activePage}
                        aria-label={assistiveNavigation(index)}
                        aria-current={index === activePage ? 'page' : undefined}
                    >
                        {index}
                    </PaginationButton>
                ))}
                {activePage < totalPages && (
                    <PaginationButton
                        as={Link}
                        to={generatePageLink(activePage + 1)}
                        variant="next"
                    >
                        {next}
                    </PaginationButton>
                )}
            </PaginationControls>
        </Pagination>
    );
};
