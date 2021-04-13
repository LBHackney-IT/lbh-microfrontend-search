import React, { useEffect, useState } from "react";
import { ISearchResult, SearchResultItem } from "./SearchResultItem";
import { findByPersonName } from "../../services/Search";
import { createBemElementBuilder } from "../utils";
import { augmentWithTenure } from "../utils/demo";
import "./Search.scss";

export default function Search() {
    const [results, setResults] = useState<ISearchResult[]>([]);
    const [totalResults, setTotalResults] = useState<Number>(0);
    const [pageTitle, setPageTitle] = useState<string>("Search");
    const [searchedTerm, setSearchedTerm] = useState<string>("");
    const [showingResultsForTerm, setshowingResultsForTerm] = useState<string>(
        ""
    );
    const bemBlock = "mtfh-search";
    const __ = createBemElementBuilder(bemBlock);

    const doSearch = () => {
        if (searchedTerm) {
            findByPersonName(searchedTerm)
                .then((res) => res.json())
                .then((data) => {
                    const {
                        results: { persons, total },
                    } = data;
                    persons.forEach(augmentWithTenure);
                    setResults(persons);
                    setTotalResults(total);
                    setshowingResultsForTerm(searchedTerm);
                });
        }
    };

    const onTypingSearhTerm = (evt) => {
        setSearchedTerm(evt.target.value.trim());
    };

    const onSearchAgain = () => {
        setshowingResultsForTerm("");
        setSearchedTerm("");
    };

    useEffect(() => {
        setPageTitle(`Search${results.length ? " results" : ""}`);
    }, [results]);

    return (
        <div className={bemBlock} data-testid="searchComponent">
            <div className={__("header")}>
                <h2 className={__("title")}>{pageTitle}</h2>
                {showingResultsForTerm && (
                    <>
                        <h3 className={__("subtitle")}>
                            Person:
                            <span className={__("subtitle__highlight")}>
                                {showingResultsForTerm}
                            </span>
                        </h3>
                        <div>
                            <button
                                className="govuk-button lbh-button"
                                data-module="govuk-button"
                                onClick={onSearchAgain}
                            >
                                Search again
                            </button>
                        </div>
                    </>
                )}

                {!showingResultsForTerm && (
                    <>
                        <div className="govuk-form-group lbh-form-group">
                            <input
                                className="govuk-input lbh-input"
                                id="searchInput"
                                name="searchedTerm"
                                type="text"
                                data-testid="searchInput"
                                onKeyUp={onTypingSearhTerm}
                            />
                        </div>
                        <button
                            className="govuk-button lbh-button"
                            data-module="govuk-button"
                            onClick={doSearch}
                            data-testid="btnSearch"
                        >
                            Search
                        </button>

                        <div className="govuk-form-group lbh-form-group">
                            <fieldset className="govuk-fieldset">
                                <div className="govuk-radios lbh-radios">
                                    <div className="govuk-radios__item">
                                        <input
                                            className="govuk-radios__input"
                                            id="filterPerson"
                                            name="filterPerson"
                                            type="radio"
                                            value="yes"
                                            defaultChecked
                                        />
                                        <label
                                            className="govuk-label govuk-radios__label"
                                            htmlFor="filterPerson"
                                        >
                                            Person
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </>
                )}
            </div>
            <div className="mtfh-search__results">
                {results.map((r) => (
                    <SearchResultItem key={r.id} {...r} />
                ))}
            </div>
        </div>
    );
}
