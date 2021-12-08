import React, { useContext } from "react";

import type { PersonSearchResult } from "@mtfh/common/lib/api/person/v1";
import { Center, Spinner } from "@mtfh/common/lib/components";

import { SearchContext } from "../../context/search-context";
import { AssetSearchResult, TenureSearchResult } from "../../types";

import "./search.scss";

type SearchResult = TenureSearchResult | PersonSearchResult | AssetSearchResult;

export interface SearchResultsProp {
  children: (results: SearchResult[]) => JSX.Element[];
}

export const SearchResults = ({ children }: SearchResultsProp): JSX.Element => {
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

  return <div className="mtfh-search__results">{children(results)}</div>;
};
