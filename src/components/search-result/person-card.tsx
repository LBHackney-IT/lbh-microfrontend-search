import { Link as RouterLink } from 'react-router-dom';
import React, { ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';

import { formatDate } from '@mtfh/common/lib/utils';
import { Link, LinkBox, LinkOverlay } from '@mtfh/common/lib/components';
import type { PersonSearchResult } from '@mtfh/common/lib/api/person/v1';
import { SearchCard } from '../search-card';
import { locale } from '../../services';

interface PersonCardProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    person: PersonSearchResult;
}

const {
    personOriginalFullName,
    multipleTenures,
    tenureLabel,
    tenureStatus,
    tenureType,
} = locale.person;

export const PersonCard = ({
    person,
    className,
    ...props
}: PersonCardProps): JSX.Element => {
    const activeTenures = person.tenures.filter(tenure => tenure.isActive);
    const inactiveTenures = person.tenures.filter(tenure => !tenure.isActive);

    const hasMultipleActiveTenures = activeTenures.length > 1;
    const hasOneActiveTenure = activeTenures.length === 1;
    const latestActiveTenure = activeTenures[0];

    const hasNoActiveTenures = activeTenures.length === 0;
    const latestInactiveTenure = inactiveTenures[0];

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
                {hasOneActiveTenure && !hasMultipleActiveTenures && (
                    <p>{latestActiveTenure?.assetFullAddress}</p>
                )}
                {hasNoActiveTenures && !hasMultipleActiveTenures && (
                    <p>{latestInactiveTenure?.assetFullAddress}</p>
                )}

                {hasMultipleActiveTenures && (
                    <p>
                        <strong>{multipleTenures}</strong>
                    </p>
                )}
                <p>
                    <strong>DOB </strong> {formatDate(person.dateOfBirth)}
                </p>

                {hasOneActiveTenure && (
                    <p>
                        <strong>{tenureLabel}</strong>{' '}
                        {tenureStatus(latestActiveTenure.isActive)},{' '}
                        {tenureType(latestActiveTenure?.type)}
                    </p>
                )}

                {hasNoActiveTenures && (
                    <p>
                        <strong>{tenureLabel}</strong>{' '}
                        {tenureStatus(latestInactiveTenure?.isActive)},{' '}
                        {tenureType(latestInactiveTenure?.type)}
                    </p>
                )}
            </SearchCard>
        </LinkBox>
    );
};
