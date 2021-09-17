import React from 'react';

import { ConfirmationRouter } from '@mtfh/common/lib/components';

import App from './app';

export default function Root(): JSX.Element {
    return (
        <div data-testid="root">
            <ConfirmationRouter>
                <App />
            </ConfirmationRouter>
        </div>
    );
}
