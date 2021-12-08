import React, { ComponentPropsWithoutRef } from "react";
import { Link as RouterLink } from "react-router-dom";

import cn from "classnames";
import { format, isFuture, isPast, parseISO } from "date-fns";

import { Link, LinkBox, LinkOverlay } from "@mtfh/common/lib/components";

import { locale } from "../../services";
import { TenureSearchResult } from "../../types";
import { Active, InActive } from "../icons";
import { SearchCard } from "../search-card";

import "./tenure-card.scss";

interface TenureCardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  tenure: TenureSearchResult;
}

const { paymentRef, tenureType, active } = locale.tenure;

export const TenureCard = ({
  tenure,
  className,
  ...props
}: TenureCardProps): JSX.Element => {
  const startDate = parseISO(tenure.startOfTenureDate);
  const endDate =
    tenure.endOfTenureDate === "1900-01-01"
      ? null
      : tenure.endOfTenureDate && parseISO(tenure.endOfTenureDate);

  const isActive = isPast(startDate) && (!endDate || isFuture(endDate));
  return (
    <LinkBox className={cn("mtfh-search-tenure", className)}>
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
          (member) =>
            member.type.toLocaleLowerCase() === "person" &&
            member.isResponsible && <p key={member.id}>{member.fullName}</p>
        )}
        <div className="mtfh-search-tenure__active">
          {isActive ? <Active /> : <InActive />}
          <span>
            {format(startDate, "dd/MM/yyyy")} -{" "}
            {!endDate ? `[${active}]` : format(endDate, "dd/MM/yyyy")}
          </span>
        </div>
        <p>
          <strong>{tenureType}:</strong> {tenure.tenureType.description}
        </p>
      </SearchCard>
    </LinkBox>
  );
};
