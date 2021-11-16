import React from 'react';
import { screen } from '@testing-library/react';
import { PersonCardLegacy } from './person-card-legacy';
import { routeRender } from '../../test-utils';
import { locale } from '../../services';
import { mockPersons } from '../../mocks';

test('it renders the person card', () => {
    routeRender(<PersonCardLegacy person={mockPersons[0]} />);
    expect(screen.getByText(locale.person.multipleTenures)).toBeInTheDocument();
});

test('it renders a person without tenures', () => {
    routeRender(
        <PersonCardLegacy person={{ ...mockPersons[0], tenures: [] }} />
    );
    expect(
        screen.queryByText(locale.person.tenureLabel, { exact: false })
    ).not.toBeInTheDocument();
    expect(
        screen.queryByText(locale.person.multipleTenures)
    ).not.toBeInTheDocument();
});

test('it renders a person card with one active tenure', () => {
    routeRender(
        <PersonCardLegacy
            person={{ ...mockPersons[0], tenures: [mockPersons[0].tenures[0]] }}
        />
    );
    expect(
        screen.getByText(locale.person.tenureLabel, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText(/Active/)).toBeInTheDocument();
});

test('it renders a person card with one inactive tenure', () => {
    routeRender(
        <PersonCardLegacy
            person={{
                ...mockPersons[0],
                tenures: [{ ...mockPersons[0].tenures[0], isActive: false }],
            }}
        />
    );
    expect(
        screen.getByText(locale.person.tenureLabel, { exact: false })
    ).toBeInTheDocument();

    expect(screen.getByText(/Inactive/)).toBeInTheDocument();
});