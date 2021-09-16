import React from 'react';
import { screen } from '@testing-library/react';
import { PersonCard } from './person-card';
import { routeRender } from '../../test-utils';
import { locale } from '../../services';
import { mockPersons } from '../../mocks';

test('it renders the person card', () => {
    const {
        result: { container },
    } = routeRender(<PersonCard person={mockPersons[0]} />);
    expect(container).toMatchSnapshot();
});

test('it renders a person without tenures', () => {
    const {
        result: { container },
    } = routeRender(<PersonCard person={{ ...mockPersons[0], tenures: [] }} />);
    expect(container).toMatchSnapshot();
});

test('it renders a person with one tenure', () => {
    routeRender(
        <PersonCard
            person={{ ...mockPersons[0], tenures: [mockPersons[0].tenures[0]] }}
        />
    );
    expect(
        screen.queryByText(locale.person.multipleTenures)
    ).not.toBeInTheDocument();
});
