import { rest } from 'msw';

import { mockPersons, mockTenures } from './data';
import { config } from '../services';

const data = {
    persons: mockPersons,
    tenures: mockTenures,
};

export const handlers = [
    rest.get(
        `${config.searchApiUrl}/search/:type`,
        (request, response, context) => {
            const { type } = request.params;
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
                ? (parameters.get('sortBy') as string)
                : null;

            let results = data[type as keyof typeof data] as any[];
            if (sortBy) {
                results = results.sort((a, b) => {
                    const sort = sortBy as keyof typeof a;
                    if (sortBy in a) {
                        if (a[sort] > b[sort]) {
                            return isDesc ? -1 : 1;
                        } else if (a[sort] < b[sort]) {
                            return isDesc ? 1 : -1;
                        }
                    }

                    return 0;
                });
            }

            const pagedResults = results.slice((page - 1) * size, page * size);

            return response(
                context.status(200),
                context.json({
                    results: { [type]: pagedResults },
                    total: results.length,
                })
            );
        }
    ),
];
