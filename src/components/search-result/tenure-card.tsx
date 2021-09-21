import { Link as RouterLink } from 'react-router-dom';
import React, { ComponentPropsWithoutRef } from 'react';
import { format, parseISO, isPast, isFuture } from 'date-fns';
import cn from 'classnames';

import { Link, LinkBox, LinkOverlay } from '@mtfh/common/lib/components';
import type { Tenure } from '@mtfh/common/lib/api/tenure/v1';
import { SearchCard } from '../search-card';
import { Active, InActive } from '../icons';
import { locale } from '../../services';

import './tenure-card.scss';

interface TenureCardProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    tenure: Tenure;
}

const { paymentRef, tenureType, active } = locale.tenure;

export const TenureCard = ({
    tenure,
    className,
    ...props
}: TenureCardProps): JSX.Element => {
    const startDate = parseISO(tenure.startOfTenureDate);
    const endDate =
        tenure.endOfTenureDate === '1900-01-01'
            ? null
            : tenure.endOfTenureDate && parseISO(tenure.endOfTenureDate);

    const isActive = isPast(startDate) && (!endDate || isFuture(endDate));
    return (
        <LinkBox className={cn('mtfh-search-tenure', className)}>
            <SearchCard {...props}>
                <LinkOverlay>
                    <Link
                        className="mtfh-search-tenure__title"
                        as={RouterLink}
                        to={`/tenure/${tenure.id}`}
                        variant="text-colour"
                    >
                        {paymentRef(tenure.paymentReference)}
                    </Link>
                </LinkOverlay>
                <p>
                    <strong>{tenure.tenuredAsset.fullAddress}</strong>
                </p>
                {tenure.householdMembers.map(
                    member =>
                        member.type.toLocaleLowerCase() === 'person' &&
                        member.isResponsible && (
                            <p key={member.id}>{member.fullName}</p>
                        )
                )}
                <div className="mtfh-search-tenure__active">
                    {isActive ? <Active /> : <InActive />}
                    <span>
                        {format(startDate, 'dd/MM/yyyy')} -{' '}
                        {!endDate
                            ? `[${active}]`
                            : format(endDate, 'dd/MM/yyyy')}
                    </span>
                </div>
                <p>
                    <strong>{tenureType}:</strong>{' '}
                    {tenure.tenureType.description}
                </p>
            </SearchCard>
        </LinkBox>
    );
};
