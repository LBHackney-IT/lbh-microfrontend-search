import { stringify } from 'query-string';
import { useAxiosSWR, AxiosSWRResponse } from '@mtfh/common';

import { Person } from '@types';
import { config } from '../config';

export enum SearchType {
    PERSON = 'persons',
    // TENURE = 'tenures',
}
export interface SearchResults {
    results: {
        persons?: Person[];
        // tenures?: Tenure[];
    };
    total: number;
}

interface GetSearchForPersonsParams {
    type: SearchType;
    searchText: string;
    pageSize: number;
    page?: number;
    isDesc?: boolean;
    sortBy?: string;
}

export enum SearchSortOptions {
    BEST = 'best',
    SURNAME_ASC = 'surname-asc',
    SURNAME_DESC = 'surname-desc',
}

export enum SearchLimitOptions {
    SMALL = 12,
    MEDIUM = 20,
    LARGE = 40,
}

export const useSearch = ({
    type,
    isDesc,
    ...params
}: GetSearchForPersonsParams): AxiosSWRResponse<SearchResults> => {
    const query = {
        ...params,
        isDesc: isDesc ? 'true' : 'false',
    };
    return useAxiosSWR<SearchResults>(
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
