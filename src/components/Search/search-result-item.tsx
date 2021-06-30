import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { LinkBox, LinkOverlay, Link } from '@mtfh/common';
import { createBemElementBuilder } from '@utilities';
import { Person } from '@types';
import './search-result-item.scss';

export function SearchResultItem(p: Person): JSX.Element {
    const bemBlock = 'mtfh-search-result';
    const __ = createBemElementBuilder(bemBlock);
    const tenure = p.tenures[0];
    const { assetFullAddress: address, type } = tenure;
    const isMultipleTenancies = p.tenures.length > 1;
    // there is more than one status. e.g. active, secure
    const tenureStatuses = [type];

    return (
        <LinkBox className={bemBlock} data-testid={`searchResult_${p.id}`}>
            <p className={__('title')} data-testid={`searchResultName_${p.id}`}>
                {p.title} {p.firstname}
                {p.middleName ? ` ${p.middleName}` : ''} {p.surname}
            </p>
            {!isMultipleTenancies && (
                <div
                    className={__('subtitle')}
                    data-testid={`searchResultAddress_${p.id}`}
                >
                    {address}
                </div>
            )}
            {isMultipleTenancies && (
                <div
                    className={__('subtitle')}
                    data-testid={`searchResultMultipleTenancies_${p.id}`}
                >
                    Multiple tenancies
                </div>
            )}
            <div className={__('row')} data-testid={`searchDOB_${p.id}`}>
                <strong>DOB:</strong> {p.dateOfBirth}
            </div>

            {!isMultipleTenancies && (
                <p
                    className={__('row')}
                    data-testid={`searchTenureStatuses_${p.id}`}
                >
                    <strong>Tenure:</strong> {tenureStatuses.join(', ')}
                </p>
            )}
            <LinkOverlay
                className={__('row')}
                data-testid={`searchMoreDetails_${p.id}`}
            >
                <Link as={RouterLink} to={`/person/${p.id}`}>
                    More details
                </Link>
            </LinkOverlay>
        </LinkBox>
    );
}
