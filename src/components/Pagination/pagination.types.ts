export type PaginationProperties = {
    totalResults?: number;
    pageSize?: number;
    onChange: (pageNumber: number) => void;
    navLinksPageSize?: number;
};
