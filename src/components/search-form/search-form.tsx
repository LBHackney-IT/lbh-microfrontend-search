import React, { ComponentPropsWithoutRef } from "react";

import cn from "classnames";
import { Form, Formik } from "formik";

import {
  Button,
  Center,
  Field,
  Fieldset,
  InlineField,
  Input,
  Radio,
  RadioGroup,
  Spinner,
} from "@mtfh/common/lib/components";
import { useErrorCodes } from "@mtfh/common/lib/hooks";

import { locale } from "../../services";
import { SearchType, SearchTypes } from "../../types";
import { SearchFormData, searchSchema } from "./schema";

interface SearchFormProps
  extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
  onSubmit: (values: SearchFormData) => void;
  defaultType?: SearchTypes;
  disableCategory?: boolean;
}

export const SearchForm = ({
  className,
  onSubmit,
  defaultType = "assets",
  disableCategory = false,
  ...props
}: SearchFormProps): JSX.Element => {
  const errorMessages = useErrorCodes();

  if (!errorMessages) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Formik<SearchFormData>
      initialValues={{ searchText: "", type: defaultType }}
      validationSchema={searchSchema(errorMessages)}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}
    >
      <Form
        noValidate
        id="search-form"
        className={cn("mtfh-search-form", className)}
        role="search"
        {...props}
      >
        <Field
          id="search-form-searchTerm"
          className="visually-hidden-label"
          name="searchText"
          label={locale.search}
          required
        >
          <Input />
        </Field>
        {!disableCategory && (
          <Fieldset
            id="search-form-type"
            variant="hidden"
            heading={locale.category}
          >
            <RadioGroup>
              {Object.values(SearchType).map((type) => (
                <InlineField key={type} type="radio" name="type">
                  <Radio id={`search-form-type-${type}`} value={type}>
                    {locale.form[type]}
                  </Radio>
                </InlineField>
              ))}
            </RadioGroup>
          </Fieldset>
        )}
        <Button type="submit">{locale.search}</Button>
      </Form>
    </Formik>
  );
};
