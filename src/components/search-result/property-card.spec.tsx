import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { mockAssetSearchResult } from "../../mocks";
import { PropertyCard } from "./property-card";

test("it displays the asset card", () => {
  render(<PropertyCard asset={mockAssetSearchResult} />);
  expect(screen.getByText(/Tenure/));
  expect(screen.getByText(/Active, SECURE/));
});
