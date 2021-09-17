import { Link as RouterLink } from 'react-router-dom';
import React, { ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';

import { Link, LinkBox, LinkOverlay } from '@mtfh/common/lib/components';
import type { Property } from '@mtfh/common/lib/api/property/v1';
import { SearchCard } from '../search-card';

import { locale } from '../../services';

interface PropertyCardProps
    extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    asset: Property;
}

const {
    address,
    propertyTypeLabel,
    propertyType,
    tenureTypeLabel,
    tenureStatusLabel,
    uprnLabel,
    tenureActivityStatus,
} = locale.property;

export const PropertyCard = ({
    asset,
    className,
    ...props
}: PropertyCardProps): JSX.Element => {
    return (
        <LinkBox className={cn('mtfh-search-tenure', className)}>
            <SearchCard {...props}>
                <LinkOverlay>
                    <Link
                        className="mtfh-search-tenure__title"
                        as={RouterLink}
                        to={`/property/${asset.id}`}
                        variant="text-colour"
                    >
                        {address(asset.assetAddress)}
                    </Link>
                </LinkOverlay>
                <p>
                    <strong>{propertyTypeLabel} </strong>
                    {propertyType(asset.assetType)}
                </p>
                <p>
                    <strong>{tenureTypeLabel} </strong>
                    {asset.tenure?.type}
                </p>
                <p>
                    <strong>{tenureStatusLabel} </strong>
                    {tenureActivityStatus(
                        asset.tenure ? asset.tenure.isActive : false
                    )}
                </p>
                <p>
                    <strong>{uprnLabel} </strong>
                    {asset.assetAddress.uprn}
                </p>
                {/* {tenure.householdMembers.map(
                    member =>
                        member.type === 'person' &&
                        member.isResponsible && (
                            <p key={member.id}>{member.fullName}</p>
                        )
                )} */}
            </SearchCard>
        </LinkBox>
    );
};
