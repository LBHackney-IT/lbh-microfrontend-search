import * as queryString from 'query-string';

import { findByPersonNameParameters } from './search.types';

const api = (parameters: findByPersonNameParameters): string => {
    return `https://y1e46yws9c.execute-api.eu-west-2.amazonaws.com/development/api/v1/search/persons?${queryString.stringify(
        parameters
    )}`;
};

const headers = {
    'Content-Type': 'application/json',
    'x-api-key': 'PdVeW0KpKr4o1vPDhlWwK6fK7QfM3v2h7FAwD5ml',
};

export function findByPersonName(
    parameters: findByPersonNameParameters
): Promise<Response> {
    return fetch(api(parameters), { headers });
}
