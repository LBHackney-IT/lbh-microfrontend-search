import React from 'react';
import { screen } from '@testing-library/react';

import { SearchResults } from './search-results';
import { routeRender } from '../../test-utils';
import { generateMockPerson, generateMockProperty } from '../../mocks';

const personResults = Array.from({ length: 12 }).map(() =>
    generateMockPerson()
);
const propertyResults = Array.from({ length: 4 }).map(() =>
    generateMockProperty()
);

test('SearchResults renders correctly', () => {
    const [{ container }] = routeRender(
        <SearchResults results={personResults} />
    );
    const cards = container.querySelectorAll('.mtfh-search__results > div');
    expect(cards).toHaveLength(12);
});

test('SearchResults renders a loading state if results are undefined', () => {
    routeRender(<SearchResults results={undefined} />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
});

test('SearchResults renders property results correctly', () => {
    const [{ container }] = routeRender(
        <SearchResults results={propertyResults} />
    );
    const cards = container.querySelectorAll('.mtfh-search__results > div');
    expect(cards).toHaveLength(4);
});
