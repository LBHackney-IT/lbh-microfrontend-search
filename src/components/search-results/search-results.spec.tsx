import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";

import { SearchProvider } from "../../context/search-context";
import { mockAssetSearchResult, mockTenures } from "../../mocks";
import { get } from "../../test-utils";
import { SearchResult } from "../search-result";
import { SearchResults } from "./search-results";

test("SearchResults renders correctly for persons", async () => {
  render(
    <SearchProvider initial={{ type: "persons", searchText: "Hello" }}>
      <SearchResults>
        {(results) =>
          results.map((result) => (
            <SearchResult
              key={result.id}
              result={result}
              data-testid="search"
            />
          ))
        }
      </SearchResults>
    </SearchProvider>
  );

  await waitFor(() =>
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  );

  const cards = screen.getAllByTestId("search");
  expect(cards).toHaveLength(12);
});

test("SearchResults renders correctly for tenures", async () => {
  get("/api/search/:type", {
    results: { tenures: mockTenures.slice(0, 12) },
    total: 12,
  });
  render(
    <SearchProvider initial={{ type: "tenures", searchText: "Hello" }}>
      <SearchResults>
        {(results) =>
          results.map((result) => (
            <SearchResult
              key={result.id}
              result={result}
              data-testid="search"
            />
          ))
        }
      </SearchResults>
    </SearchProvider>
  );

  await waitFor(() =>
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  );
  const cards = screen.getAllByTestId("search");
  expect(cards).toHaveLength(12);
});

test("SearchResults renders correctly for assets", async () => {
  get("/api/search/:type", {
    results: { assets: [mockAssetSearchResult] },
    total: 1,
  });
  render(
    <SearchProvider initial={{ type: "assets", searchText: "Hello" }}>
      <SearchResults>
        {(results) =>
          results.map((result) => (
            <SearchResult
              key={result.id}
              result={result}
              data-testid="search"
            />
          ))
        }
      </SearchResults>
    </SearchProvider>
  );

  await waitFor(() =>
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  );
  const cards = screen.getAllByTestId("search");
  expect(cards).toHaveLength(1);
});

test("SearchResults wont render if the result cannot be inferred", async () => {
  get("/api/search/:type", {
    results: { assets: [{ id: "12423" }] },
    total: 1,
  });
  render(
    <SearchProvider initial={{ type: "assets", searchText: "Hello" }}>
      <SearchResults>
        {(results) =>
          results.map((result) => (
            <SearchResult
              key={result.id}
              result={result}
              data-testid="search"
            />
          ))
        }
      </SearchResults>
    </SearchProvider>
  );

  await waitFor(() =>
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  );
  const cards = screen.queryAllByTestId("search");
  expect(cards).toHaveLength(0);
});
