import React from 'react';

import { Search } from '@components';

export default function Root(): JSX.Element {
    return (
        <div className="js-enabled" data-testid="root">
            <Search />
        </div>
    );
}
