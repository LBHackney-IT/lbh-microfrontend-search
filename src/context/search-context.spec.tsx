import React, { useContext, useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import {
    SearchActions,
    SearchContext,
    SearchProvider,
    SearchState,
    SearchURLProvider,
} from './search-context';
import { LimitOptions, OrderByOptions, PersonSortOptions } from '../types';
import { routeRender } from '../test-utils';

const searchRender = (ui, { initial, ...renderProps }) => {
    return render(
        <SearchProvider initial={initial}>{ui}</SearchProvider>,
        renderProps
    );
};

interface ContextSelectorProps {
    param: keyof SearchState;
}

const ContextSelector = ({ param }: ContextSelectorProps) => {
    const { state } = useContext(SearchContext);
    return (
        <>
            <div>{!!state.results && 'Loading'}</div>
            <div>{`[${state[param]}]`}</div>
        </>
    );
};

interface DispatcherProps {
    action: SearchActions;
    param: keyof SearchState;
    waitForResults?: boolean;
}

const Dispatcher = ({
    action,
    param,
    waitForResults = false,
}: DispatcherProps) => {
    const { dispatch, state } = useContext(SearchContext);
    useEffect(() => {
        if (!waitForResults) {
            dispatch(action);
        }
    }, []);

    useEffect(() => {
        if (!!state.results && waitForResults) {
            dispatch(action);
        }
    }, [state.results]);

    return <ContextSelector param={param} />;
};

test('SearchProvider initialises with default state', () => {
    searchRender(<ContextSelector param="type" />, {
        initial: { type: 'persons' },
    });
    expect(screen.getByText('[persons]')).toBeInTheDocument();
});

test('SearchProvider initialises with config for non person types', () => {
    searchRender(<ContextSelector param="sort" />, {
        initial: { type: 'assets' },
    });
    expect(screen.getByText('[null]')).toBeInTheDocument();
});

test('SearchProvider dispatches searchText', () => {
    searchRender(
        <Dispatcher
            action={{ type: 'SEARCH', payload: 'Hello' }}
            param="searchText"
        />,
        {
            initial: { type: 'persons' },
        }
    );
    expect(screen.getByText('[Hello]')).toBeInTheDocument();
});

test('SearchProvider dispatches searchText', () => {
    searchRender(
        <Dispatcher
            action={{ type: 'TYPE', payload: 'tenures' }}
            param="type"
        />,
        {
            initial: { type: 'persons' },
        }
    );
    expect(screen.getByText('[tenures]')).toBeInTheDocument();
});

test('SearchProvider dispatches page', () => {
    searchRender(
        <Dispatcher action={{ type: 'PAGE', payload: 2 }} param="page" />,
        {
            initial: { type: 'persons' },
        }
    );
    expect(screen.getByText('[2]')).toBeInTheDocument();
});

test('SearchProvider dispatches limit', () => {
    searchRender(
        <Dispatcher
            action={{ type: 'LIMIT', payload: LimitOptions.MEDIUM }}
            param="pageSize"
        />,
        {
            initial: { type: 'persons' },
        }
    );
    expect(screen.getByText(`[${LimitOptions.MEDIUM}]`)).toBeInTheDocument();
});

test('SearchProvider wont reduce limit dispatches for unknown limits', () => {
    searchRender(
        <Dispatcher action={{ type: 'LIMIT', payload: 14 }} param="pageSize" />,
        {
            initial: { type: 'persons', pageSize: LimitOptions.SMALL },
        }
    );
    expect(screen.getByText(`[${LimitOptions.SMALL}]`)).toBeInTheDocument();
});

test('SearchProvider dispatches sort', () => {
    searchRender(
        <Dispatcher
            action={{ type: 'SORT', payload: PersonSortOptions.SURNAME }}
            param="sort"
        />,
        {
            initial: { type: 'persons' },
        }
    );
    expect(
        screen.getByText(`[${PersonSortOptions.SURNAME}]`)
    ).toBeInTheDocument();
});

test('SearchProvider wont reduce sort dispatches for unknown sorts', () => {
    searchRender(
        <Dispatcher
            action={{ type: 'SORT', payload: 'street' as PersonSortOptions }}
            param="sort"
        />,
        {
            initial: { type: 'persons' },
        }
    );
    expect(screen.getByText(`[${PersonSortOptions.BEST}]`)).toBeInTheDocument();
});

test('SearchProvider only reduces sorts for type', () => {
    searchRender(
        <Dispatcher
            action={{ type: 'SORT', payload: PersonSortOptions.SURNAME }}
            param="sort"
        />,
        {
            initial: { type: 'tenures' },
        }
    );
    expect(screen.getByText('[null]')).toBeInTheDocument();
});

test('SearchProvider dispatches order', () => {
    searchRender(
        <Dispatcher
            action={{ type: 'ORDER', payload: OrderByOptions.DESC }}
            param="order"
        />,
        {
            initial: { type: 'persons' },
        }
    );
    expect(screen.getByText(`[${OrderByOptions.DESC}]`)).toBeInTheDocument();
});

test('SearchProvider wont dispatch order for unknown order', () => {
    searchRender(
        <Dispatcher
            action={{ type: 'ORDER', payload: 'name' as OrderByOptions }}
            param="order"
        />,
        {
            initial: { type: 'persons' },
        }
    );
    expect(screen.getByText(`[${OrderByOptions.ASC}]`)).toBeInTheDocument();
});

test('SearchProvider only reduces order for type', () => {
    searchRender(
        <Dispatcher
            action={{ type: 'ORDER', payload: OrderByOptions.DESC }}
            param="order"
        />,
        {
            initial: { type: 'assets' },
        }
    );
    expect(screen.getByText(`[null]`)).toBeInTheDocument();
});

test('SearchProvider only reduces known actions', () => {
    searchRender(
        <Dispatcher
            action={{
                type: 'ERROR' as 'SEARCH',
                payload: 'Hello',
            }}
            param="searchText"
        />,
        {
            initial: { type: 'persons' },
        }
    );
    expect(screen.getByText(`[]`)).toBeInTheDocument();
});

test('SearchProvider will reset page to the maximum when over extended', async () => {
    searchRender(
        <Dispatcher
            action={{
                type: 'PAGE',
                payload: 100,
            }}
            param="page"
            waitForResults
        />,
        {
            initial: { type: 'persons', searchText: 'Jane' },
        }
    );

    await waitFor(() =>
        expect(screen.queryByText('Loading')).not.toBeInTheDocument()
    );

    await waitFor(() => expect(screen.getByText(`[4]`)).toBeInTheDocument());
});

test('SearchURLProvider hydrates from url', () => {
    routeRender(
        <SearchURLProvider redirect="/">
            <ContextSelector param="type" />
            <ContextSelector param="searchText" />
            <ContextSelector param="page" />
            <ContextSelector param="pageSize" />
        </SearchURLProvider>,
        {
            url: '/assets?s=Hello&p=3&l=40',
            path: '/:type',
        }
    );

    expect(screen.getByText('[assets]')).toBeInTheDocument();
    expect(screen.getByText('[Hello]')).toBeInTheDocument();
    expect(screen.getByText('[3]')).toBeInTheDocument();
    expect(screen.getByText('[40]')).toBeInTheDocument();
});

test('SearchURLProvider persists to sessionStorage', () => {
    routeRender(
        <SearchURLProvider sessionKey="test" redirect="/">
            <Dispatcher
                action={{ type: 'SEARCH', payload: 'World' }}
                param="searchText"
            />
        </SearchURLProvider>,
        {
            url: '/assets?s=Hello&l=40',
            path: '/:type',
        }
    );

    expect(window.sessionStorage.getItem('test')).toBe('assets?s=World&l=40');
});

test('SearchURLProvider persists to sessionStorage with all options', () => {
    routeRender(
        <SearchURLProvider sessionKey="test" redirect="/">
            <Dispatcher
                action={{ type: 'ORDER', payload: OrderByOptions.DESC }}
                param="searchText"
            />
        </SearchURLProvider>,
        {
            url: '/persons?s=Hello&p=3&sort=surname',
            path: '/:type',
        }
    );

    expect(window.sessionStorage.getItem('test')).toBe(
        'persons?s=Hello&p=3&o=desc&sort=surname'
    );
});

test('SearchURLProvider redirects if there is no searchTerm in hydration', () => {
    const { history } = routeRender(
        <SearchURLProvider redirect="/redirect"></SearchURLProvider>,
        {
            url: '/persons?p=3',
            path: '/:type',
        }
    );

    expect(history.location.pathname).toBe('/redirect');
});

test('SearchURLProvider defaults to assets', () => {
    routeRender(
        <SearchURLProvider redirect="/redirect">
            <ContextSelector param="type" />
        </SearchURLProvider>,
        {
            url: '/persons?s=Hello',
            path: '/',
        }
    );

    expect(screen.getByText('[assets]')).toBeInTheDocument();
});
