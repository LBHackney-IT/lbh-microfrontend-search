import React from 'react';
import { screen } from '@testing-library/react';

import { SearchResults } from './search-results';
import { routeRender } from '../../test-utils';
import { generateMockPerson } from '../../mocks';

const results = Array.from({ length: 12 }).map(() => generateMockPerson());

test('SearchResults renders correctly', () => {
    const [{ container }] = routeRender(<SearchResults results={results} />);
    const cards = container.querySelectorAll('.mtfh-search__results > div');
    expect(cards).toHaveLength(12);
});

test('SearchResults renders a loading state if results are undefined', () => {
    routeRender(<SearchResults results={undefined} />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
});
