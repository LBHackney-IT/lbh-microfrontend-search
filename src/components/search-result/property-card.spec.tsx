import React from 'react';
import { screen } from '@testing-library/react';
import { PropertyCard } from './property-card';
import { routeRender } from '../../test-utils';
import { mockAsset } from '../../mocks';

test('it displays the property card', () => {
    routeRender(<PropertyCard asset={mockAsset} />);
    expect(screen.getByText(/Tenure status/));
    expect(screen.getByText(/SECURE/));
    expect(screen.getByText(/Tenure status/));
    expect(screen.getByText(/Active/));
});
