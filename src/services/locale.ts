export default {
    home: 'Home',
    search: 'Search',
    category: 'Category',
    form: {
        persons: 'Person',
        tenures: 'Tenure',
    },
    results: {
        searchResults: 'Search Results',
        searchAgain: 'Search again',
        searchType: {
            persons: 'Person',
            tenures: 'Tenure',
        },
    },
    controls: {
        loadingResults: 'Loading search results...',
        noMatchingResults: 'No matching search results found',
        searchResults: (
            page: number,
            pageSize: number,
            total: number
        ): string =>
            `Items ${page * pageSize - pageSize + 1}—${Math.min(
                page * pageSize,
                total
            )} of ${total} results`,
        sortLabel: 'Sort by',
        limitLabel: 'Show',
        sortOptions: {
            'best': 'Best match',
            'surname-asc': 'Last name A-Z',
            'surname-desc': 'Last name Z-A',
        },
        limitOption: (value: number): string => `${value} items`,
    },
    pagination: {
        previous: 'Previous',
        next: 'Next',
        assistiveNavigation: (page: number): string => `Page ${page}`,
        searchResults: (
            page: number,
            pageSize: number,
            total: number
        ): string =>
            `Showing ${page * pageSize - pageSize + 1}—${Math.min(
                page * pageSize,
                total
            )} of ${total} results`,
    },
    errors: {
        alertTitle: 'Error',
        minSearchTerm: 'Please enter 2 or more characters for a search term',
        searchUnexpectedErrorTitle: 'Unable to retrieve search results',
        searchUnexpectedErrorDescription:
            'Please try again. If the issue persists, please contact support.',
    },
};
