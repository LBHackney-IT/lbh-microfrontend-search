import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchProvider } from "../../context/search-context";
import { mockPersons } from "../../mocks";
import { locale } from "../../services";
import { get } from "../../test-utils";
import { SearchPagination } from "./search-pagination";

test("Pagination displays range from start if range exceeds start", async () => {
  render(
    <SearchProvider initial={{ type: "persons", searchText: "Hello" }}>
      <SearchPagination />
    </SearchProvider>
  );

  expect(await screen.findByText(locale.pagination.next)).toBeInTheDocument();

  expect(
    screen.queryByText(locale.pagination.previous)
  ).not.toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.queryByText("5")).not.toBeInTheDocument();
});

test("Pagination displays range", async () => {
  get("/api/search/:type", {
    results: mockPersons.slice(0, 12),
    total: 1000,
  });
  render(
    <SearchProvider initial={{ type: "persons", searchText: "Hello", page: 5 }}>
      <SearchPagination />
    </SearchProvider>
  );

  expect(await screen.findByText(locale.pagination.next)).toBeInTheDocument();
  expect(screen.getByText(locale.pagination.previous)).toBeInTheDocument();
  expect(screen.queryByText("2")).not.toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
  expect(screen.getByText("4")).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(screen.getByText("6")).toBeInTheDocument();
  expect(screen.getByText("7")).toBeInTheDocument();
  expect(screen.queryByText("8")).not.toBeInTheDocument();
});

test("Pagination displays range from end if range exceeds end", async () => {
  get("/api/search/:type", {
    results: mockPersons.slice(0, 12),
    total: 240,
  });
  render(
    <SearchProvider
      initial={{ type: "persons", searchText: "Hello", page: 20 }}
    >
      <SearchPagination />
    </SearchProvider>
  );
  expect(
    await screen.findByText(locale.pagination.previous)
  ).toBeInTheDocument();
  expect(screen.queryByText(locale.pagination.next)).not.toBeInTheDocument();
  expect(screen.queryByText("15")).not.toBeInTheDocument();
  expect(screen.getByText("16")).toBeInTheDocument();
  expect(screen.getByText("17")).toBeInTheDocument();
  expect(screen.getByText("18")).toBeInTheDocument();
  expect(screen.getByText("19")).toBeInTheDocument();
  expect(screen.getByText("20")).toBeInTheDocument();
  expect(screen.queryByText("21")).not.toBeInTheDocument();
});

test("Pagination wont display if the range is empty", async () => {
  get("/api/search/:type", {
    results: mockPersons.slice(0, 12),
    total: 12,
  });
  render(
    <SearchProvider initial={{ type: "persons", searchText: "Hello", page: 1 }}>
      <SearchPagination />
    </SearchProvider>
  );

  expect(screen.queryByText("1")).not.toBeInTheDocument();
});

test("Pagination navigation triggers state changes", async () => {
  render(
    <SearchProvider initial={{ type: "persons", searchText: "Hello", page: 1 }}>
      <SearchPagination />
    </SearchProvider>
  );

  expect(await screen.findByText("1")).toHaveAttribute("aria-current", "page");

  userEvent.click(screen.getByText(locale.pagination.next));
  expect(await screen.findByText("2")).toHaveAttribute("aria-current", "page");

  userEvent.click(screen.getByText(locale.pagination.previous));
  expect(await screen.findByText("1")).toHaveAttribute("aria-current", "page");

  userEvent.click(screen.getByText("3"));
  expect(await screen.findByText("3")).toHaveAttribute("aria-current", "page");
});
