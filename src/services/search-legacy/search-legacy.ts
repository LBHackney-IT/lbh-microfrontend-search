import { stringify } from 'query-string';
import { useAxiosSWR, AxiosSWRResponse } from '@mtfh/common';

import { Person, Tenure } from '@types';
import { config } from '../config';

export enum SearchTypeLegacy {
    PERSON = 'persons',
    TENURE = 'tenures',
}

export interface SearchResultsLegacy {
    results: {
        persons?: Person[];
        tenures?: Tenure[];
    };
    total: number;
}

interface GetSearchForPersonsParamsLegacy {
    type: SearchTypeLegacy;
    searchText: string;
    pageSize: number;
    page?: number;
    isDesc?: boolean;
    sortBy?: string;
}

export enum SearchSortOptionsLegacy {
    BEST = 'best',
    SURNAME_ASC = 'surname-asc',
    SURNAME_DESC = 'surname-desc',
}

export enum SearchLimitOptionsLegacy {
    SMALL = 12,
    MEDIUM = 20,
    LARGE = 40,
}

export const useSearchLegacy = ({
    type,
    isDesc,
    ...params
}: GetSearchForPersonsParamsLegacy): AxiosSWRResponse<SearchResultsLegacy> => {
    const query = {
        ...params,
        isDesc: isDesc ? 'true' : 'false',
    };

    return useAxiosSWR<SearchResultsLegacy>(
        `${config.searchApiUrl}/search/${type}?${stringify(query, {
            skipEmptyString: true,
        })}`,
        {
            onErrorRetry: /* istanbul ignore next */ error => {
                if (error.response?.status === 404) return;
            },
        }
    );
};
