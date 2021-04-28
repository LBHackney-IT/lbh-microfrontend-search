import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { pages, navigation } from './pagination-utils';
import './pagination.scss';

export function Pagination({
    totalResults = 0,
    pageSize = 0,
    onChange = (p: number) => {},
    navLinksPageSize = 5,
}) {
    const [totalResultPages, setTotalResultPages] = useState<number>(0);
    const [currentNavLinksPage, setCurrentNavLinksPage] = useState<number>(1);
    const [currentNavLinks, setCurrentNavLinks] = useState<Array<number>>([]);
    const [totalNavLinksPages, setTotalNavLinksPages] = useState<number>(0);
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
    const [isPrevDisabled, setIsPrevDisabled] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
        onChange(newPage);
    };

    useEffect(() => {
        const total = pages(totalResults, pageSize);
        setTotalResultPages(total);
        setTotalNavLinksPages(pages(total, navLinksPageSize));
        setCurrentPage(1);
        setCurrentNavLinksPage(1);
    }, [totalResults, pageSize]);

    useEffect(() => {
        const { isPrevDisabled, isNextDisabled, pages } = navigation(
            currentNavLinksPage,
            totalNavLinksPages,
            totalResultPages,
            navLinksPageSize
        );

        setCurrentNavLinks(pages);
        setIsPrevDisabled(isPrevDisabled);
        setIsNextDisabled(isNextDisabled);
    }, [currentNavLinksPage, totalNavLinksPages]);

    return (
        <>
            {totalResults > 0 && (
                <div className="pagination">
                    <nav className="lbh-pagination">
                        <div className="lbh-pagination__summary">
                            Showing {pageSize} of {totalResults} results
                        </div>
                        <ul className="lbh-pagination">
                            <li className="lbh-pagination__item">
                                <button
                                    aria-label="Previous page"
                                    onClick={() => {
                                        setCurrentNavLinksPage(
                                            currentNavLinksPage - 1
                                        );
                                    }}
                                    disabled={isPrevDisabled}
                                    className="pagination__item"
                                >
                                    <span
                                        aria-hidden="true"
                                        role="presentation"
                                    >
                                        &laquo;&nbsp;
                                    </span>
                                    Previous
                                </button>
                            </li>
                            {currentNavLinks.map((l, i) => (
                                <li key={i} className="lbh-pagination__item">
                                    <button
                                        aria-label="Next page"
                                        onClick={() => onPageChange(l)}
                                        className={classNames(
                                            'pagination__item',
                                            { '--current': currentPage === l }
                                        )}
                                    >
                                        {l}
                                    </button>
                                </li>
                            ))}
                            <li className="lbh-pagination__item">
                                <button
                                    aria-label="Next page"
                                    onClick={() => {
                                        setCurrentNavLinksPage(
                                            currentNavLinksPage + 1
                                        );
                                    }}
                                    disabled={isNextDisabled}
                                    className="pagination__item"
                                >
                                    Next{' '}
                                    <span
                                        aria-hidden="true"
                                        role="presentation"
                                    >
                                        &raquo;
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}
