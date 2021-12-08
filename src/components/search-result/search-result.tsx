import React from "react";

import type { PersonSearchResult } from "@mtfh/common/lib/api/person/v1";

import { isAsset, isPerson, isTenure } from "../../utils";
import { PersonCard } from "./person-card";
import { PropertyCard } from "./property-card";
import { TenureCard } from "./tenure-card";

import type { AssetSearchResult, TenureSearchResult } from "../../types";

export interface SearchResultProps {
  result: PersonSearchResult | TenureSearchResult | AssetSearchResult;
}

export const SearchResult = ({
  result,
  ...props
}: SearchResultProps): JSX.Element | null => {
  if (isPerson(result)) {
    return <PersonCard person={result as PersonSearchResult} {...props} />;
  }
  if (isTenure(result)) {
    return <TenureCard tenure={result} {...props} />;
  }
  if (isAsset(result)) {
    return <PropertyCard asset={result} {...props} />;
  }
  return null;
};
