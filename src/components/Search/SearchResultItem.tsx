import React from "react";
import "./SearchResultItem.scss";

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
    const bemBlock = "mtfh-search-result";
    // bem element notation utility
    const __ = (suffix) => `${bemBlock}__${suffix}`;
    const isMultipleTenancies = p.tenures.length > 1;
    const address = "1 Hill Street, E5 9HL";
    return (
        <div className={bemBlock}>
            <p className={__("title")}>
                {p.title} {p.firstname}
                {p.middleName ? ` ${p.middleName}` : ""} {p.surname}
            </p>
            <p className={__("subtitle")}>{address}</p>
            <p className={__("row")}>
                <strong>DOB:</strong> {p.dateOfBirth}
            </p>
            {isMultipleTenancies && (
                <div className={__("row")}> Multiple tenancies </div>
            )}
            {!isMultipleTenancies && (
                <div className={__("row")}>
                    {p.tenures.map((t, index) => (
                        <p key={index}>{t.assetFullAddress}</p>
                    ))}
                </div>
            )}
            <div className={__("row")}>
                <a href="/">More details</a>
            </div>
        </div>
    );
}
