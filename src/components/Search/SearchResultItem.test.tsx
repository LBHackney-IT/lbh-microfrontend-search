import React from "react";
import { render, screen } from "@testing-library/react";
import { SearchResultItem, ISearchResult } from "./SearchResultItem";

let multipleTenanciesResult: ISearchResult;
let singleTenancyResult: ISearchResult;

beforeEach(() => {
    multipleTenanciesResult = {
        id: "2",
        title: "Mrs",
        firstname: "Julie",
        middleName: "",
        surname: "Evans",
        preferredFirstname: "string",
        preferredSurname: "string",
        ethinicity: "Christian",
        nationality: "Canadian",
        placeOfBirth: "Toronto",
        dateOfBirth: "1990-02-19",
        gender: "F",
        identification: [
            {
                identificationType: "NI",
                value: "1234A",
                originalDocumentSeen: true,
                linkToDocument: "string",
            },
        ],
        personTypes: ["Housing Officer"],
        IsPersonCautionaryAlert: true,
        IsTenureCautionaryAlert: true,
        tenures: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "secure",
                startDate: "string",
                endDate: "string",
                assetFullAddress: "Apartment 22, 18 G road, SW11",
            },
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "secure",
                startDate: "string",
                endDate: "string",
                assetFullAddress: "Apartment 22, 18 G road, SW11",
            },
        ],
    };

    singleTenancyResult = {
        id: "3",
        title: "Mrs",
        firstname: "Julie",
        middleName: "",
        surname: "Evans",
        preferredFirstname: "string",
        preferredSurname: "string",
        ethinicity: "Christian",
        nationality: "Canadian",
        placeOfBirth: "Toronto",
        dateOfBirth: "1990-02-19",
        gender: "F",
        identification: [
            {
                identificationType: "NI",
                value: "1234A",
                originalDocumentSeen: true,
                linkToDocument: "string",
            },
        ],
        personTypes: ["Housing Officer"],
        IsPersonCautionaryAlert: true,
        IsTenureCautionaryAlert: true,
        tenures: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "secure",
                startDate: "string",
                endDate: "string",
                assetFullAddress: "Apartment 22, 18 G road, SW11",
            },
        ],
    };
});

test("It renders without throwing an error", () => {
    render(<SearchResultItem {...singleTenancyResult} />);
    const { id } = singleTenancyResult;
    const wrapper = screen.queryByTestId(`searchResult_${id}`);
    const title = screen.queryByTestId(`searchResultName_${id}`);
    const moreDetails = screen.queryByTestId(`searchMoreDetails_${id}`);
    const dob = screen.queryByTestId(`searchDOB_${id}`);

    expect(wrapper).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(moreDetails).toBeInTheDocument();
    expect(dob).toBeInTheDocument();
});

test("Item with single tenancy displays the address", () => {
    render(<SearchResultItem {...singleTenancyResult} />);
    const { id } = singleTenancyResult;
    const address = screen.queryByTestId(`searchResultAddress_${id}`);
    const multipleTenanciesMessage = screen.queryByTestId(
        `searchResultMultipleTenancies_${id}`
    );

    expect(address).toBeInTheDocument();
    expect(multipleTenanciesMessage).not.toBeInTheDocument();
});

test("Item with multiple tenancies does not display any address", () => {
    render(<SearchResultItem {...multipleTenanciesResult} />);
    const { id } = multipleTenanciesResult;
    const address = screen.queryByTestId(`searchResultAddress_${id}`);
    const multipleTenanciesMessage = screen.queryByTestId(
        `searchResultMultipleTenancies_${id}`
    );

    expect(address).not.toBeInTheDocument();
    expect(multipleTenanciesMessage).toBeInTheDocument();
});
