import * as Yup from 'yup';

import { locale, SearchTypeLegacy } from '@services';
import './styles.scss';

const { minSearchTerm } = locale.errors;

export const searchSchema = Yup.object({
    searchTerm: Yup.string().min(2, minSearchTerm).required(),
    type: Yup.mixed<SearchTypeLegacy>()
        .oneOf(Object.values(SearchTypeLegacy))
        .required(),
});

export type SearchFormData = Yup.Asserts<typeof searchSchema>;
