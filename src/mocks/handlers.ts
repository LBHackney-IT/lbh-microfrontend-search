import { rest } from 'msw';

import { Person } from '@types';
import { config } from '@services';
import { mockPersons } from './data';

export const handlers = [
    rest.get(
        `${config.searchApiUrl}/search/persons`,
        (request, response, context) => {
            const parameters = request.url.searchParams;
            const page = parameters.has('page')
                ? Number(parameters.get('page'))
                : 1;
            const size = parameters.has('pageSize')
                ? Number(parameters.get('pageSize'))
                : 1;
            const isDesc = parameters.has('isDesc')
                ? parameters.get('isDesc') === 'true'
                : false;
            const sortBy = parameters.has('sortBy')
                ? (parameters.get('sortBy') as keyof Person)
                : 'surname';

            const results = mockPersons.sort((a, b) => {
                if (a[sortBy] > b[sortBy]) {
                    return isDesc ? -1 : 1;
                } else if (a[sortBy] < b[sortBy]) {
                    return isDesc ? 1 : -1;
                }

                return 0;
            });

            const pagedResults = results.slice((page - 1) * size, page * size);

            return response(
                context.status(200),
                context.json({
                    results: { persons: pagedResults },
                    total: results.length,
                })
            );
        }
    ),
];
