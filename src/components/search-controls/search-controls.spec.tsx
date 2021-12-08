import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchProvider } from "../../context/search-context";
import { locale } from "../../services";
import { get } from "../../test-utils";
import { LimitOptions } from "../../types";
import { SearchControls } from "./search-controls";

test("SearchControls does not render without a searchText", () => {
  render(
    <SearchProvider initial={{ type: "persons" }}>
      <SearchControls />
    </SearchProvider>
  );
  expect(screen.queryByText(/Items/)).not.toBeInTheDocument();
});

test("SearchControlsrenders correctly", async () => {
  render(
    <SearchProvider initial={{ type: "persons", searchText: "Hello" }}>
      <SearchControls />
    </SearchProvider>
  );

  await waitFor(() =>
    expect(
      screen.queryByText(locale.controls.loadingResults)
    ).not.toBeInTheDocument()
  );
  expect(screen.getByText(/Items/)).toBeInTheDocument();
});

test("SearchControls changes sort", () => {
  render(
    <SearchProvider initial={{ type: "persons", searchText: "Hello" }}>
      <SearchControls />
    </SearchProvider>
  );

  const sort = screen.getByLabelText(
    `${locale.controls.sortLabel}:`
  ) as HTMLSelectElement;

  userEvent.selectOptions(sort, "surname-desc");
  expect(sort.value).toBe("surname-desc");

  userEvent.selectOptions(sort, "best");
  expect(sort.value).toBe("best");

  userEvent.selectOptions(sort, "surname-asc");
  expect(sort.value).toBe("surname-asc");
});

test("SearchControls changes limit query param", () => {
  render(
    <SearchProvider initial={{ type: "persons", searchText: "Hello" }}>
      <SearchControls />
    </SearchProvider>
  );
  const limit = screen.getByLabelText(
    `${locale.controls.limitLabel}:`
  ) as HTMLSelectElement;

  userEvent.selectOptions(limit, String(LimitOptions.MEDIUM));
  expect(limit.value).toBe(String(LimitOptions.MEDIUM));
});

test("SearchControls shows loading state if total is undefined", () => {
  render(
    <SearchProvider initial={{ type: "persons", searchText: "Hello" }}>
      <SearchControls />
    </SearchProvider>
  );
  expect(screen.getByText(locale.controls.loadingResults)).toBeInTheDocument();
});

test("SearchControls shows no results if total is 0", async () => {
  get("/api/search/:type", { results: { persons: [] }, total: 0 }, 200);
  render(
    <SearchProvider initial={{ type: "persons", searchText: "Hello" }}>
      <SearchControls />
    </SearchProvider>
  );

  await waitFor(() =>
    expect(
      screen.queryByText(locale.controls.loadingResults)
    ).not.toBeInTheDocument()
  );

  expect(
    screen.getByText(locale.controls.noMatchingResults)
  ).toBeInTheDocument();
});
