import React from "react";

import { render } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { locale } from "../../services";
import { SearchView } from "./search-view";

test("SearchView navigates to results on submit", async () => {
  render(<SearchView />);
  await waitFor(() => {
    const input = screen.getByLabelText(`${locale.search}*`);
    userEvent.type(input, "Hello");
    userEvent.click(screen.getByRole("button", { name: locale.search }));
  });

  await waitFor(() => {
    expect(window.location.pathname).toBe("/search/assets");
    expect(window.location.search).toBe("?s=Hello");
  });
});
