import React from 'react';
import { screen } from '@testing-library/react';
import { PropertyCard } from './property-card';
import { routeRender } from '../../test-utils';
import { mockAssetSearchResult } from '../../mocks';

test('it displays the asset card', () => {
    routeRender(<PropertyCard asset={mockAssetSearchResult} />);
    expect(screen.getByText(/Tenure status/));
    expect(screen.getByText(/SECURE/));
    expect(screen.getByText(/Tenure status/));
    expect(screen.getByText(/Active/));
});
