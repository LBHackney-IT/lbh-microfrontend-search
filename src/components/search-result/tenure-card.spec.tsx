import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen } from "@testing-library/react";

import { generateMockTenure } from "../../mocks";
import { TenureCard } from "./tenure-card";

test("it handles special case of endofTenureDate", () => {
  const tenure = { ...generateMockTenure(), endOfTenureDate: "1900-01-01" };
  render(<TenureCard tenure={tenure} />);
  expect(screen.getByText(/\[active\]$/));
});
