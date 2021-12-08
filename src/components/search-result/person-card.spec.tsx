import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { generateMockPerson, generateMockTenureSummary } from "../../mocks";
import { locale } from "../../services";
import { PersonCard } from "./person-card";

const mockPerson = generateMockPerson();

test("it renders the person card with an address if the person has only 1 active tenure", () => {
  const personWithOneActiveTenure = {
    ...mockPerson,
    tenures: Array.from({
      length: 3,
    }).map((_, index) => generateMockTenureSummary({ isActive: index === 0 })),
  };

  const activeTenure = personWithOneActiveTenure.tenures.find(
    (tenure) => tenure.isActive
  );

  render(<PersonCard person={personWithOneActiveTenure} />);
  expect(screen.getByText(activeTenure.assetFullAddress)).toBeInTheDocument();
  expect(screen.getByText(/Active/)).toBeInTheDocument();
});

test("it renders the person card with an address of the last active tenure if there are no active tenures", () => {
  const personWithNoActiveTenure = {
    ...mockPerson,
    tenures: Array.from({
      length: 3,
    }).map(() => generateMockTenureSummary({ isActive: false })),
  };

  const lastActiveTenure = personWithNoActiveTenure.tenures[0];

  render(<PersonCard person={personWithNoActiveTenure} />);
  expect(
    screen.getByText(lastActiveTenure.assetFullAddress)
  ).toBeInTheDocument();
  expect(screen.getByText(/Inactive/)).toBeInTheDocument();
});

test("it renders the person card with 'Multiple Tenures' if the person has multiple active tenures", () => {
  const personWithMultipleActiveTenure = {
    ...mockPerson,
    tenures: Array.from({ length: 3 }).map(() =>
      generateMockTenureSummary({ isActive: true })
    ),
  };

  render(<PersonCard person={personWithMultipleActiveTenure} />);
  expect(screen.getByText(locale.person.multipleTenures)).toBeInTheDocument();
});
