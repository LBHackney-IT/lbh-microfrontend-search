import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import { SearchViewLegacy } from './search-view';
import { routeRender } from '../../test-utils';
import { locale } from '../../services';

test('SearchView navigates to results on submit', async () => {
    const { history } = routeRender(<SearchViewLegacy />);
    const input = screen.getByLabelText(`${locale.search}*`);
    userEvent.type(input, 'Hello');
    userEvent.click(screen.getByRole('button', { name: locale.search }));

    await waitFor(() =>
        expect(history.location.pathname).toBe('/search/assets')
    );

    expect(history.location.search).toBe('?s=Hello');
});
