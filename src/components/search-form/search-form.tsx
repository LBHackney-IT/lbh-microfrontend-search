import { useHistory } from 'react-router-dom';
import React, { ComponentPropsWithoutRef } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';
import { Button, Fieldset, Input, Radio, RadioGroup } from '@mtfh/common';

import { searchSchema, SearchFormData } from './schema';
import { locale, SearchType } from '../../services';
import { Field, InlineField } from '../../components/field';

export interface SearchFormProps extends ComponentPropsWithoutRef<'form'> {
    defaultType?: SearchType;
}

export const SearchForm = ({
    className,
    defaultType = SearchType.PROPERTY,
    ...props
}: SearchFormProps): JSX.Element => {
    const history = useHistory();
    return (
        <Formik<SearchFormData>
            initialValues={{ searchTerm: '', type: defaultType }}
            validationSchema={searchSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={({ searchTerm, type }) => {
                history.push(`/search/${type}?s=${searchTerm}`);
            }}
        >
            <Form
                id="search-form"
                className={cn('mtfh-search-form', className)}
                role="search"
                {...props}
            >
                <Field
                    id="search-form-searchTerm"
                    className="visually-hidden-label"
                    name="searchTerm"
                    label={locale.search}
                    required
                >
                    <Input />
                </Field>
                <Fieldset
                    id="search-form-type"
                    variant="hidden"
                    heading={locale.category}
                >
                    <RadioGroup>
                        {Object.values(SearchType).map(type => (
                            <InlineField key={type} type="radio" name="type">
                                <Radio
                                    id={`search-form-type-${type}`}
                                    value={type}
                                >
                                    {locale.form[type]}
                                </Radio>
                            </InlineField>
                        ))}
                    </RadioGroup>
                </Fieldset>
                <Button type="submit">{locale.search}</Button>
            </Form>
        </Formik>
    );
};
