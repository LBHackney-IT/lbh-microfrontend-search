import React from "react";
import "./Search.scss";

export default function Search() {
  return (
    <div className="mtfh-search">
      <h2 className="lbh-heading-h2">Search</h2>
      <div className="govuk-form-group lbh-form-group">
        <input
          className="govuk-input lbh-input"
          id="searchInput"
          name="test-name"
          type="text"
        />
      </div>
      <div className="govuk-form-group lbh-form-group">
        <fieldset className="govuk-fieldset" aria-describedby="example-hint">
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
      <button className="govuk-button lbh-button" data-module="govuk-button">
        Search
      </button>
    </div>
  );
}
