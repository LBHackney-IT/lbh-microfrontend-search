import { Person } from '@types';

export function augmentWithTenure(searchResult: Person): Person {
    if (searchResult.tenures.length === 0) {
        searchResult.tenures = [
            {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                type: 'secure',
                startDate: 'string',
                endDate: 'string',
                assetFullAddress: 'Apartment 22, 18 Augmented Road, DEMO 123',
            },
        ];
    }

    return searchResult;
}