import React from "react";

export type PersonType = "Housing Officer" | string;

export interface IIdentification {
    identificationType: string;
    value: string;
    originalDocumentSeen: boolean;
    linkToDocument: string;
}

export interface ITenure {
    id: string;
    type: string;
    startDate: string;
    endDate: string;
    assetFullAddress: string;
}

export interface ISearchResult {
    id: string;
    title: string;
    firstname: string;
    middleName?: string;
    surname: string;
    preferredFirstname: string;
    preferredSurname: string;
    ethinicity: string;
    nationality: string;
    placeOfBirth: string;
    dateOfBirth: string;
    gender: string;
    identification: IIdentification[];
    personTypes: PersonType[];
    IsPersonCautionaryAlert: boolean;
    IsTenureCautionaryAlert: boolean;
    tenures: ITenure[];
    [key: string]: any;
}

export function SearchResultItem(p: ISearchResult) {
    const isMultipleTenancies = p.tenures.length > 1;
    return (
        <div className="mtfh-search__result">
            <p>
                {p.title} {p.firstname}
                {p.middleName ? ` ${p.middleName}` : ""} {p.surname}
            </p>
            {isMultipleTenancies && <p> Multiple tenancies </p>}
            <p>DOB: {p.dateOfBirth}</p>
            {!isMultipleTenancies && (
                <div>
                    {p.tenures.map((t, index) => (
                        <p key={index}>{t.assetFullAddress}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
