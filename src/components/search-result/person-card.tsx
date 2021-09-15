import { Link as RouterLink } from 'react-router-dom';
import React, { ComponentPropsWithoutRef } from 'react';
import { parseISO, format } from 'date-fns';
import cn from 'classnames';
import { Link, LinkBox, LinkOverlay } from '@mtfh/common';
import { SearchCard } from '../search-card';

import { PersonSearchType } from '../../types';
import { locale } from '../../services';

interface PersonCardProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    person: Person;
}

const { personOriginalFullName, multipleTenures, tenureType } = locale.person;

export const PersonCard = ({
    person,
    className,
    ...props
}: PersonCardProps): JSX.Element => {
    const hasTenure = person.tenures.length > 0;
    const tenure = person.tenures[0] || {};
    const { assetFullAddress: address, type = 'N/A' } = tenure;
    const isMultipleTenancies = person.tenures.length > 1;
    return (
        <LinkBox className={cn('mtfh-search-person', className)}>
            <SearchCard {...props}>
                <LinkOverlay>
                    <Link
                        as={RouterLink}
                        to={`/person/${person.id}`}
                        variant="text-colour"
                    >
                        {personOriginalFullName(person)}
                    </Link>
                </LinkOverlay>
                {!isMultipleTenancies && address && (
                    <p>
                        <strong>{address}</strong>
                    </p>
                )}
                {isMultipleTenancies && (
                    <p>
                        <strong>{multipleTenures}</strong>
                    </p>
                )}
                <p>
                    <strong>DOB:</strong>{' '}
                    {format(parseISO(person.dateOfBirth), 'dd/MM/yyyy')}
                </p>

                {hasTenure && !isMultipleTenancies && (
                    <p>
                        <strong>{tenureType}:</strong> {type}
                    </p>
                )}
            </SearchCard>
        </LinkBox>
    );
};
