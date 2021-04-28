import React from 'react';
import { render, screen } from '@testing-library/react';

import Root from './root.component';

test('should be in the document', () => {
    render(<Root />);
    const search = screen.queryByTestId('searchComponent');
    expect(search).toBeInTheDocument();
});
