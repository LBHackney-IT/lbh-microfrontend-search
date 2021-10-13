import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';

import commonLocale from '@mtfh/common/lib/locale';
import { SearchForm } from './search-form';
import { routeRender } from '../../test-utils';
import { locale } from '../../services';

const mockErrorMessages = commonLocale.hooks.defaultErrorMessages;

test('SearchForm renders correctly', async () => {
    routeRender(<SearchForm onSubmit={jest.fn()} />);
    await waitFor(() => {
        screen.getByRole('search');
    });
});

test('SearchForm displays error on input if no characters', async () => {
    routeRender(<SearchForm onSubmit={jest.fn()} />);

    await waitFor(() => {
        userEvent.click(screen.getByRole('button'));
        screen.getByText(mockErrorMessages.W27);
    });
});

test('SearchForm displays error on input if under 2 characters', async () => {
    routeRender(<SearchForm onSubmit={jest.fn()} />);

    await waitFor(() => {
        const input = screen.getByLabelText(`${locale.search}*`);
        userEvent.type(input, 'A');
        userEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
        screen.getByText(mockErrorMessages.W27);
    });
});

test('SearchForm fires onSubmit on success', async () => {
    const onSubmit = jest.fn();
    routeRender(<SearchForm onSubmit={onSubmit} />);

    await waitFor(() => {
        const input = screen.getByLabelText(`${locale.search}*`);
        userEvent.type(input, 'Jake');
        userEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => expect(onSubmit).toBeCalledTimes(1));
});
