import * as Yup from 'yup';

import { locale, SearchType } from '../../services';
import './styles.scss';

const { minSearchTerm } = locale.errors;

export const searchSchema = Yup.object({
    searchTerm: Yup.string().min(2, minSearchTerm).required(),
    type: Yup.mixed<SearchType>().oneOf(Object.values(SearchType)).required(),
});

export type SearchFormData = Yup.Asserts<typeof searchSchema>;
