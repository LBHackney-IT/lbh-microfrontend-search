import React, { ComponentPropsWithoutRef } from "react";
import { Link as RouterLink } from "react-router-dom";

import cn from "classnames";

import { Link, LinkBox, LinkOverlay } from "@mtfh/common/lib/components";

import { locale } from "../../services";
import { SearchCard } from "../search-card";

import type { AssetSearchResult } from "../../types";

interface PropertyCardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  asset: AssetSearchResult;
}

const {
  address,
  assetTypeLabel,
  assetType,
  tenureTypeLabel,
  uprnLabel,
  tenureActivityStatus,
} = locale.asset;

export const PropertyCard = ({
  asset,
  className,
  ...props
}: PropertyCardProps): JSX.Element => {
  return (
    <LinkBox className={cn("mtfh-search-tenure", className)}>
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
          <strong>{assetTypeLabel} </strong>
          {assetType(asset.assetType)}
        </p>
        <p>
          <strong>{tenureTypeLabel} </strong>
          {tenureActivityStatus(!!asset.tenure?.isActive)}
          {asset.tenure?.type && `, ${asset.tenure?.type}`}
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
