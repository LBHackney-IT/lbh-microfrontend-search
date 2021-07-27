import { useHistory } from 'react-router-dom';
import React, { ComponentPropsWithoutRef } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';
import { Button, Fieldset, Input, Radio, RadioGroup } from '@mtfh/common';

import { locale, SearchType } from '@services';
import { searchSchema, SearchFormData } from './schema';
import { Field, InlineField } from '../../components/field';

export const SearchForm = ({
    className,
    ...props
}: ComponentPropsWithoutRef<'form'>): JSX.Element => {
    const history = useHistory();
    return (
        <Formik<SearchFormData>
            initialValues={{ searchTerm: '', type: SearchType.PERSON }}
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
