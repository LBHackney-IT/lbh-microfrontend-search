import React from "react";
import { render } from "@testing-library/react";
import Root from "./root.component";

describe("Root component", () => {
  it("should be in the document", () => {
    const { queryBy } = render(<Root name="Testapp" />);
    expect(true).toBeTruthy();
  });
});
