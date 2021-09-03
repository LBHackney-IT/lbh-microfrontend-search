import * as Yup from 'yup';

import { SearchType, SearchTypes } from '../../types';
import { locale } from '../../services';
import './styles.scss';

const { minSearchTerm } = locale.errors;

export const searchSchema = Yup.object({
    searchText: Yup.string().min(2, minSearchTerm).required(),
    type: Yup.mixed<SearchTypes>().oneOf(Object.values(SearchType)).required(),
});

export type SearchFormData = Yup.Asserts<typeof searchSchema>;
