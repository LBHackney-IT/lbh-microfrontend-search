import React from 'react';
import { screen } from '@testing-library/react';

import { SearchPagination } from './search-pagination';
import { routeRender } from '../../test-utils';
import { locale } from '../../services';

test('Pagination displays range from start if range exceeds start', () => {
    routeRender(<SearchPagination page={1} pageSize={5} total={100} />);

    expect(screen.getByText(locale.pagination.next)).toBeInTheDocument();
    expect(screen.queryByText(locale.pagination.previous)).toBe(null);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('6')).toBe(null);
});

test('Pagination displays range', () => {
    routeRender(<SearchPagination page={5} pageSize={5} total={100} />);

    expect(screen.getByText(locale.pagination.next)).toBeInTheDocument();
    expect(screen.getByText(locale.pagination.previous)).toBeInTheDocument();
    expect(screen.queryByText('2')).toBe(null);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.queryByText('8')).toBe(null);
});

test('Pagination displays range from end if range exceeds end', () => {
    routeRender(<SearchPagination page={20} pageSize={5} total={100} />);

    expect(screen.getByText(locale.pagination.previous)).toBeInTheDocument();
    expect(screen.queryByText(locale.pagination.next)).toBe(null);
    expect(screen.queryByText('15')).toBe(null);
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('17')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('19')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.queryByText('21')).toBe(null);
});

test('Pagination will match the nearest available page if the active is out of bounds', () => {
    routeRender(<SearchPagination page={-1} pageSize={5} total={100} />);
    expect(screen.getByText(locale.pagination.next)).toBeInTheDocument();
    expect(screen.queryByText(locale.pagination.previous)).toBe(null);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('6')).toBe(null);
});

test('Pagination wont display if the range is empty', () => {
    const [{ container }] = routeRender(
        <SearchPagination page={1} pageSize={0} total={100} />
    );
    expect(container).toBeEmptyDOMElement();
});

test('Pagination wont display if the total is undefined', () => {
    const [{ container }] = routeRender(
        <SearchPagination page={1} pageSize={5} total={undefined} />
    );
    expect(container).toBeEmptyDOMElement();
});
