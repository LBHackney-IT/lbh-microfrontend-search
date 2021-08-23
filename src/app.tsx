import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';

import { hasToggle } from '@mtfh/common';

import {
    SearchView,
    SearchViewLegacy,
    SearchResultsView,
    SearchResultsViewLegacy,
} from './views';

export default function App(): JSX.Element {
    const searchAsset = hasToggle('MMH.SearchAsset');
    return (
        <Switch>
            <Route path="/" exact>
                {searchAsset ? <SearchView /> : <SearchViewLegacy />}
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
                {searchAsset ? (
                    <SearchResultsView />
                ) : (
                    <SearchResultsViewLegacy />
                )}
            </Route>
            <Route>
                <div>404</div>
            </Route>
        </Switch>
    );
}
