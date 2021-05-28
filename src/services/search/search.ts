import * as queryString from 'query-string';

import { $auth } from '@mtfh/common';
import { FindByPersonNameRequestData } from './search.types';
import { config } from '../config';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${$auth.getValue().token}`,
};

export function findByPersonName(
    parameters: FindByPersonNameRequestData
): Promise<Response> {
    return fetch(
        `${config.searchApiUrl}/search/persons?${queryString.stringify(
            parameters
        )}`,
        { headers }
    );
}
