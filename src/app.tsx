import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';

import { SearchView, SearchResultsView } from './views';

export default function App(): JSX.Element {
    return (
        <Switch>
            <Route path="/" exact>
                <SearchView />
            </Route>
            <Route
                path="/search"
                exact
                render={() => {
                    const last = sessionStorage.getItem('search:last') || '/';
                    return <Redirect to={last} />;
                }}
            ></Route>
            <Route path="/search/:type" exact>
                <SearchResultsView />
            </Route>
            <Route>
                <div>404</div>
            </Route>
        </Switch>
    );
}
