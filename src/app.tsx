import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { SearchResultsView, SearchView } from "./views";

const App = (): JSX.Element => (
  <Switch>
    <Route path="/" exact>
      <SearchView />
    </Route>
    <Route
      path="/search"
      exact
      render={() => {
        const last = sessionStorage.getItem("search:last");
        const redirect = last ? `/search/${last}` : "/";
        return <Redirect to={redirect} />;
      }}
    />
    <Route path="/search/:type" exact>
      <SearchResultsView />
    </Route>
    <Route>
      <div>404</div>
    </Route>
  </Switch>
);

export default App;
