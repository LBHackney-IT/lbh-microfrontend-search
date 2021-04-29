import React from 'react';
import { render, screen } from '@testing-library/react';

import Root from './root.component';

describe('Root component', () => {
    it('should be in the document', () => {
        render(<Root />);

        expect(screen.getByTestId('root')).toBeInTheDocument();
    });
});
