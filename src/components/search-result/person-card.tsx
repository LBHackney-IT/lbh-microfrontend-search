import { Link as RouterLink } from 'react-router-dom';
import React, { ComponentPropsWithoutRef } from 'react';
import { parseISO, format } from 'date-fns';
import cn from 'classnames';
import { Link, LinkBox, LinkOverlay } from '@mtfh/common';
import { Person } from '@types';

import { Card } from '../search-card';

import './person-card.scss';

interface PersonCardProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    person: Person;
}

export const PersonCard = ({
    person,
    className,
    ...props
}: PersonCardProps): JSX.Element => {
    const tenure = person.tenures[0] || {};
    const { assetFullAddress: address, type = 'N/A' } = tenure;
    const isMultipleTenancies = person.tenures.length > 1;
    const tenureStatuses = [type];
    return (
        <LinkBox className={cn('mtfh-search-person', className)}>
            <Card {...props}>
                <LinkOverlay className="mtfh-search-person__row">
                    <Link
                        className="mtfh-search-person__title"
                        as={RouterLink}
                        to={`/person/${person.id}`}
                        variant="text-colour"
                    >
                        {person.title} {person.firstname}
                        {person.middleName ? ` ${person.middleName}` : ''}{' '}
                        {person.surname}
                    </Link>
                </LinkOverlay>
                {!isMultipleTenancies && address && (
                    <p className="mtfh-search-person__subtitle">{address}</p>
                )}
                {isMultipleTenancies && (
                    <p className="mtfh-search-person__subtitle">
                        Multiple tenancies
                    </p>
                )}
                <p className="mtfh-search-person__row">
                    <strong>DOB:</strong>{' '}
                    {format(parseISO(person.dateOfBirth), 'dd/MM/yyyy')}
                </p>

                {!isMultipleTenancies && (
                    <p className="mtfh-search-person__row">
                        <strong>Tenure:</strong> {tenureStatuses.join(', ')}
                    </p>
                )}
            </Card>
        </LinkBox>
    );
};
