import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';

import { Search } from '@components';

export default function Root(): JSX.Element {
    return (
        <div data-testid="root">
            <Router>
                <Route path="/search" exact>
                    <div className="js-enabled">
                        <Search />
                    </div>
                </Route>
            </Router>
        </div>
    );
}
