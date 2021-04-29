import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { PaginationProperties } from './pagination.types';
import { pages, navigation } from './pagination-utils';
import './pagination.scss';

export function Pagination({
    totalResults = 0,
    pageSize = 0,
    onChange,
    navLinksPageSize = 5,
}: PaginationProperties): JSX.Element {
    const [totalResultPages, setTotalResultPages] = useState<number>(0);
    const [currentNavLinksPage, setCurrentNavLinksPage] = useState<number>(1);
    const [currentNavLinks, setCurrentNavLinks] = useState<Array<number>>([]);
    const [totalNavLinksPages, setTotalNavLinksPages] = useState<number>(0);
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
    const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const onPageChange = (newPage: any) => {
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
        setIsPreviousDisabled(isPrevDisabled);
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
                                    disabled={isPreviousDisabled}
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
                            {currentNavLinks.map((link, index) => (
                                <li
                                    key={index}
                                    className="lbh-pagination__item"
                                >
                                    <button
                                        aria-label="Next page"
                                        onClick={() => onPageChange(link)}
                                        className={classNames(
                                            'pagination__item',
                                            {
                                                '--current':
                                                    currentPage === link,
                                            }
                                        )}
                                    >
                                        {link}
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
