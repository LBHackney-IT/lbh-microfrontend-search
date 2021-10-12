import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';

import { useFeatureToggle } from '@mtfh/common/lib/hooks';
import {
    SearchView,
    SearchViewLegacy,
    SearchResultsView,
    SearchResultsViewLegacy,
} from './views';

export default function App(): JSX.Element {
    const hasWarningComponents = useFeatureToggle('MMH.WarningComponents');

    return (
        <Switch>
            <Route path="/" exact>
                {hasWarningComponents ? <SearchView /> : <SearchViewLegacy />}
            </Route>
            <Route
                path="/search"
                exact
                render={() => {
                    const last = sessionStorage.getItem('search:last');
                    const redirect = last ? `/search/${last}` : '/';
                    return <Redirect to={redirect} />;
                }}
            ></Route>
            <Route path="/search/:type" exact>
                {hasWarningComponents ? (
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
