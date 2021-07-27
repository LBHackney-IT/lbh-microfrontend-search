import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

import App from './app';

export default function Root(): JSX.Element {
    return (
        <div data-testid="root">
            <Router>
                <App />
            </Router>
        </div>
    );
}
