import React, { useContext, useMemo } from "react";

import {
  Pagination,
  PaginationButton,
  PaginationControls,
  PaginationSummary,
} from "@mtfh/common/lib/components";

import { SearchContext } from "../../context/search-context";
import { locale } from "../../services";

const {
  previous,
  next,
  assistiveNavigation,
  searchResults,
} = locale.pagination;

interface SearchPaginationProps {
  pageRange?: number;
}

export const SearchPagination = ({
  pageRange = 2,
}: SearchPaginationProps): JSX.Element | null => {
  const {
    state: { total, page, pageSize },
    dispatch,
  } = useContext(SearchContext);

  const [totalPages, activePage] = useMemo(() => {
    const tp = total ? Math.ceil(total / pageSize) : 0;
    return [tp, page > tp ? tp : page];
  }, [total, page, pageSize]);

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
  }, [pageRange, activePage, totalPages]);

  if (
    total === undefined ||
    totalPages === Infinity ||
    range.length === 0 ||
    total < 0
  ) {
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
            as="button"
            onClick={() => dispatch({ type: "PAGE", payload: activePage - 1 })}
            variant="previous"
          >
            {previous}
          </PaginationButton>
        )}
        {range.map((index) => (
          <PaginationButton
            as="button"
            key={index}
            onClick={() => dispatch({ type: "PAGE", payload: index })}
            active={index === activePage}
            aria-label={assistiveNavigation(index)}
            aria-current={index === activePage ? "page" : undefined}
          >
            {index}
          </PaginationButton>
        ))}
        {activePage < totalPages && (
          <PaginationButton
            as="button"
            onClick={() => dispatch({ type: "PAGE", payload: activePage + 1 })}
            variant="next"
          >
            {next}
          </PaginationButton>
        )}
      </PaginationControls>
    </Pagination>
  );
};
