import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { locale } from "../../services";
import { get } from "../../test-utils";
import { SearchResultsView } from "./search-results-view";

test("SearchResultsView renders correctly", async () => {
  render(<SearchResultsView />, {
    path: "/search/:type",
    url: "/search/persons?s=Jake",
  });

  await waitFor(() =>
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
  );
});

test("SearchResultsView shows error if request fails", async () => {
  get("/api/search/persons", { error: 500 }, 500);
  render(<SearchResultsView />, {
    path: "/search/:type",
    url: "/search/persons?s=Jake",
  });

  await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
});

test("SearchResultsView shows the SearchForm", async () => {
  render(<SearchResultsView />, {
    path: "/search/:type",
    url: "/search/persons?s=Jake",
  });

  userEvent.click(screen.getByText(locale.results.searchAgain));

  await screen.findByRole("search");

  const input = screen.getByLabelText(`${locale.search}*`);
  expect(input).toBeInTheDocument();

  userEvent.type(input, "Derek");
  userEvent.click(screen.getByRole("button", { name: locale.search }));

  await waitFor(() => expect(window.location.search).toBe("?s=Derek"));
});
