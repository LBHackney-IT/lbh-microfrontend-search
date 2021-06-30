import React from 'react';
import { rest } from 'msw';
import { fireEvent, waitFor, RenderResult } from '@testing-library/react';
import { config, cacheKeys } from '@services';
import { Search } from './search';
import { routeRender } from '../../test-utils';
import { server } from '../../mocks';

const submitSearch = (
    { getByPlaceholderText, getByTestId }: RenderResult,
    searchTerm: string
): void => {
    const input = getByPlaceholderText(
        'Enter search query'
    ) as HTMLInputElement;
    const button = getByTestId('btnSearch') as HTMLButtonElement;

    fireEvent.change(input, { target: { value: searchTerm } });
    fireEvent.click(button);
};

const paginateResults = ({ container }: RenderResult, page: number) => {
    const buttons = container.querySelectorAll<HTMLButtonElement>(
        '.lbh-pagination__item button'
    );

    const index = page % 5 !== 0 ? page % 5 : 5;

    if (buttons[index].textContent !== String(page)) {
        throw new Error('Pagination page does not exist.');
    }

    fireEvent.click(buttons[index]);
};

test('it renders correctly', () => {
    const [result, history] = routeRender(<Search />);

    const { getByPlaceholderText, getByTestId } = result;

    expect(getByPlaceholderText('Enter search query')).toBeInTheDocument();
    expect(getByTestId('btnSearch')).toBeInTheDocument();
});

test('it performs a search with results', async () => {
    const [result, history] = routeRender(<Search />);

    submitSearch(result, 'Jane');

    const { getAllByTestId } = result;

    await waitFor(() =>
        expect(getAllByTestId(/searchResult_/)).toHaveLength(12)
    );
});

test('it changes results on page change', async () => {
    const [result, history] = routeRender(<Search />);
    submitSearch(result, 'Mike');

    const { getAllByTestId } = result;

    await waitFor(() =>
        expect(getAllByTestId(/searchResult_/)).toHaveLength(12)
    );

    const results = getAllByTestId(/searchResult_/);
    paginateResults(result, 2);

    await waitFor(() =>
        expect(results[0]).not.toBe(getAllByTestId(/searchResult_/)[0])
    );
});

test('it can perform additional searches', async () => {
    const [result, history] = routeRender(<Search />);
    submitSearch(result, 'Jack');

    const { getByText, getByTestId } = result;

    await waitFor(() => expect(getByText('Search again')).toBeInTheDocument());

    const button = getByText('Search again');

    fireEvent.click(button);

    await waitFor(() => expect(getByTestId('searchInput')).toBeInTheDocument());

    submitSearch(result, 'Lance');

    await waitFor(() => expect(getByText('Lance')).toBeInTheDocument());
});

test('it changes results based on sort', async () => {
    const [result, history] = routeRender(<Search />);
    submitSearch(result, 'Mary');

    const { getAllByTestId, getByLabelText } = result;

    await waitFor(() =>
        expect(getAllByTestId(/searchResult_/)).toHaveLength(12)
    );

    const results = getAllByTestId(/searchResult_/);
    const select = getByLabelText('Sort by');

    fireEvent.change(select, { target: { value: 'surname_1' } });

    await waitFor(() =>
        expect(results[0]).not.toBe(getAllByTestId(/searchResult_/)[0])
    );
});

test('it changes the page size to show', async () => {
    const [result, history] = routeRender(<Search />);
    submitSearch(result, 'Mary');

    const { getAllByTestId, getByLabelText } = result;

    await waitFor(() =>
        expect(getAllByTestId(/searchResult_/)).toHaveLength(12)
    );

    const select = getByLabelText('Show') as HTMLSelectElement;

    fireEvent.change(select, { target: { value: '20' } });

    await waitFor(() =>
        expect(getAllByTestId(/searchResult_/)).toHaveLength(20)
    );
});

test('it will not perform a search if the query is empty', () => {
    const [result, history] = routeRender(<Search />);
    submitSearch(result, '');

    const { queryAllByTestId } = result;
    expect(queryAllByTestId(/searchResult_/)).toHaveLength(0);
});

test('it shows no results', async () => {
    server.use(
        rest.get(
            `${config.searchApiUrl}/search/persons`,
            (request, response, context) => {
                return response.once(
                    context.json({ results: { persons: [] }, total: 0 })
                );
            }
        )
    );

    const [result, history] = routeRender(<Search />);
    submitSearch(result, 'Louis');

    const { getByText } = result;

    await waitFor(() => expect(getByText('No results')).toBeInTheDocument());
});

test('searchTerm is saved to sessionStorage', async () => {
    const [result, history] = routeRender(<Search />);
    submitSearch(result, 'Stacy');

    await waitFor(() =>
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
            cacheKeys.SEARCHED_TERM,
            'Stacy'
        )
    );
});

test('it submits with the enter key', async () => {
    const [result, history] = routeRender(<Search />);

    const { getByPlaceholderText, getAllByTestId } = result;

    const input = getByPlaceholderText(
        'Enter search query'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() =>
        expect(getAllByTestId(/searchResult_/)).toHaveLength(12)
    );
});

test('search hydrates from sessionStorage', async () => {
    const getItem = window.sessionStorage.getItem as jest.Mock<string>;
    getItem.mockImplementationOnce(() => 'Harry');

    const [result, history] = routeRender(<Search />);

    const { getByText, getAllByTestId } = result;

    await waitFor(() => expect(getByText('Harry')).toBeInTheDocument());
    await waitFor(() =>
        expect(getAllByTestId(/searchResult_/)).toHaveLength(12)
    );
});
