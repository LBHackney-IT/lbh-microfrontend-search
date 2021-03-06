import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Button,
  ErrorSummary,
  Layout,
  Link,
} from "@mtfh/common/lib/components";

import {
  SearchControls,
  SearchForm,
  SearchPagination,
  SearchResult,
  SearchResults,
} from "../../components";
import { SearchContext, SearchURLProvider } from "../../context/search-context";
import { locale } from "../../services";

const { searchResults, searchType, searchAgain } = locale.results;

const SearchResultsLayout = (): JSX.Element => {
  const [showSearchAgain, setSearchAgain] = useState(false);
  const { state, dispatch } = useContext(SearchContext);

  return (
    <Layout>
      <Link as={RouterLink} to="/" variant="back-link">
        {locale.home}
      </Link>
      <h1 className="lbh-heading-h1">{searchResults}</h1>
      <h2 className="lbh-heading-h2">
        {searchType[state.type]}: {state.searchText}
      </h2>
      <Button onClick={() => setSearchAgain(true)}>{searchAgain}</Button>
      {showSearchAgain && (
        <>
          <h2 className="lbh-heading-h2">{locale.search}</h2>
          <SearchForm
            defaultType={state.type}
            onSubmit={({ type, searchText }) => {
              dispatch({ type: "SEARCH", payload: searchText });
              dispatch({ type: "PAGE", payload: 1 });
              dispatch({ type: "TYPE", payload: type });
              setSearchAgain(false);
            }}
          />
        </>
      )}
      {state.error ? (
        <ErrorSummary
          id="search-result-error"
          title={locale.errors.searchUnexpectedErrorTitle}
          description={locale.errors.searchUnexpectedErrorDescription}
        />
      ) : (
        <>
          <SearchControls />
          <SearchResults>
            {(results) =>
              results.map((result) => (
                <SearchResult key={result.id} result={result} />
              ))
            }
          </SearchResults>
          <SearchPagination />
        </>
      )}
    </Layout>
  );
};

export const SearchResultsView = (): JSX.Element => {
  return (
    <SearchURLProvider sessionKey="search:last" redirect="/">
      <SearchResultsLayout />
    </SearchURLProvider>
  );
};
