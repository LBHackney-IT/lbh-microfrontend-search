import React, { ComponentPropsWithoutRef } from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';
import {
    Button,
    Fieldset,
    Input,
    Radio,
    RadioGroup,
    Field,
    InlineField,
} from '@mtfh/common';

import { searchSchema, SearchFormData } from './schema';
import { SearchTypes, SearchType } from '../../types';
import { locale } from '../../services';

export interface SearchFormProps
    extends Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
    onSubmit: (values: SearchFormData) => void;
    defaultType?: SearchTypes;
    disableCategory?: boolean;
}

export const SearchForm = ({
    className,
    onSubmit,
    defaultType = 'assets',
    disableCategory = false,
    ...props
}: SearchFormProps): JSX.Element => {
    return (
        <Formik<SearchFormData>
            initialValues={{ searchText: '', type: defaultType }}
            validationSchema={searchSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={onSubmit}
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
                            {Object.values(SearchType).map(type => (
                                <InlineField
                                    key={type}
                                    type="radio"
                                    name="type"
                                >
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
                )}
                <Button type="submit">{locale.search}</Button>
            </Form>
        </Formik>
    );
};
