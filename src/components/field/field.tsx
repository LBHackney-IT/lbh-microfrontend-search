import React, { cloneElement, ReactElement } from 'react';

import { useField } from 'formik';
import { FormGroup } from '@mtfh/common';

export interface FieldProps {
    name: string;
    id: string;
    label: string;
    children: ReactElement;
    required?: boolean;
    className?: string;
    type?: 'checkbox' | 'radio' | 'text' | 'number';
}

export const Field = ({
    id,
    label,
    children,
    name,
    type,
    ...props
}: FieldProps): JSX.Element => {
    const [field, meta] = useField({ name, type, value: children.props.value });
    return (
        <FormGroup id={id} label={label} error={meta.error} {...props}>
            {cloneElement(children, { ...field })}
        </FormGroup>
    );
};

export interface InlineFieldProps {
    name: string;
    children: ReactElement;
    type?: 'checkbox' | 'radio' | 'text' | 'number';
}

export const InlineField = ({
    children,
    name,
    type,
    ...props
}: InlineFieldProps): JSX.Element => {
    const [field, meta] = useField({ name, type, value: children.props.value });
    return cloneElement(children, { ...field, ...props, error: meta.error });
};
