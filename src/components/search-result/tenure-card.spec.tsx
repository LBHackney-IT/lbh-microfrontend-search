import React from 'react';
import { screen } from '@testing-library/react';
import { TenureCard } from './tenure-card';
import { routeRender } from '../../test-utils';
import { locale } from '../../services';
import { generateMockTenure } from '../../mocks';

test('it handles special case of endofTenureDate', () => {
    const tenure = { ...generateMockTenure(), endOfTenureDate: '1900-01-01' };
    routeRender(<TenureCard tenure={tenure} />);
    expect(screen.getByText(/\[active\]$/));
});
