import React, { useState, useEffect } from "react";
import "./Search.scss";
import mockedSearchResults from "./mockedData";
import { ISearchResult, SearchResultItem } from "./SearchResultItem";
import { createBemElementBuilder } from "../utils/";

export default function Search() {
    const [results, setResults] = useState<ISearchResult[]>([]);
    const [pageTitle, setPageTitle] = useState<string>("Search");
    const [searchedTerm, setSearchedTerm] = useState<string>("Joan Fisher");
    const bemBlock = "mtfh-search";
    const __ = createBemElementBuilder(bemBlock);

    useEffect(() => {
        setResults(mockedSearchResults);
    }, []);

    useEffect(() => {
        setPageTitle(`Search${results.length ? " results" : ""}`);
    }, [results]);

    return (
        <div className={bemBlock}>
            <div className={__("header")}>
                <h2 className={__("title")}>{pageTitle}</h2>
                <h3 className={__("subtitle")}>
                    Person:{" "}
                    <span className={__("subtitle__highlight")}>
                        {searchedTerm}
                    </span>
                </h3>
                <div className="govuk-form-group lbh-form-group">
                    <input
                        className="govuk-input lbh-input"
                        id="searchInput"
                        name="test-name"
                        type="text"
                    />
                </div>
                <div className="govuk-form-group lbh-form-group">
                    <fieldset
                        className="govuk-fieldset"
                        aria-describedby="example-hint"
                    >
                        <div className="govuk-radios lbh-radios">
                            <div className="govuk-radios__item">
                                <input
                                    className="govuk-radios__input"
                                    id="example"
                                    name="example"
                                    type="radio"
                                    value="yes"
                                    defaultChecked
                                />
                                <label
                                    className="govuk-label govuk-radios__label"
                                    htmlFor="example"
                                >
                                    Person
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <button
                    className="govuk-button lbh-button"
                    data-module="govuk-button"
                >
                    Search
                </button>
            </div>
            <div className="mtfh-search__results">
                {results.map((r) => (
                    <SearchResultItem key={r.id} {...r} />
                ))}
            </div>
        </div>
    );
}
