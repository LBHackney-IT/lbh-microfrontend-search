import * as Yup from 'yup';

import { SearchType, SearchTypes } from '../../types';
import './styles.scss';

export const searchSchema = (errorMessages: Record<string, string>) =>
    Yup.object({
        searchText: Yup.string()
            .min(2, errorMessages.W27)
            .required(errorMessages.W27),
        type: Yup.mixed<SearchTypes>()
            .oneOf(Object.values(SearchType))
            .required(),
    });

export type SearchFormData = Yup.Asserts<ReturnType<typeof searchSchema>>;
