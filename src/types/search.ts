export enum SearchType {
    PROPERTY = 'assets',
    PERSON = 'persons',
    TENURE = 'tenures',
}

export type SearchTypes = 'assets' | 'persons' | 'tenures';

export enum PersonSortOrderOptions {
    BEST = 'best',
    SURNAME_ASC = 'surname-asc',
    SURNAME_DESC = 'surname-desc',
}

export enum PersonSortOptions {
    BEST = '',
    SURNAME = 'surname',
}

export enum OrderByOptions {
    ASC = 'asc',
    DESC = 'desc',
}

export enum LimitOptions {
    SMALL = 12,
    MEDIUM = 20,
    LARGE = 40,
}
