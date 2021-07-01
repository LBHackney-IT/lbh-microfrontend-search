import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { routeRender } from './test-utils';
import Root from './root.component';

describe('Root component', () => {
    it('should be in the document', async () => {
        routeRender(<Root />);

        await waitFor(() =>
            expect(screen.getByTestId('root')).toBeInTheDocument()
        );
    });
});
