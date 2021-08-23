import { HouseholdMember, Tenure, Person, AssetAddress } from '@types';

const locale = {
    home: 'Home',
    search: 'Search',
    category: 'Category',
    form: {
        persons: 'Person',
        tenures: 'Tenure',
        assets: 'Property',
    },
    results: {
        searchResults: 'Search Results',
        searchAgain: 'Search again',
        searchType: {
            persons: 'Person',
            tenures: 'Tenure',
            assets: 'Property',
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
    person: {
        personTitleAbbr: (title: string): string => {
            if (['Dr', 'Mr', 'Mrs', 'Ms'].includes(title)) {
                return `${title}.`;
            }
            return title;
        },
        personOriginalFullName: (person: Person): string =>
            [
                locale.person.personTitleAbbr(person.title),
                person.firstname,
                person.middleName,
                person.surname,
            ]
                .filter(prop => prop)
                .join(' '),
        multipleTenures: 'Multiple Tenures',
        tenureType: `Tenure type`,
    },
    tenure: {
        paymentRef: (ref: string): string => `Tenure payment ref ${ref}`,
        tenureType: `Tenure type`,
        active: 'active',
    },
    property: {
        address: (assetAddress: AssetAddress) => {
            const {
                postPreamble,
                addressLine1,
                addressLine2,
                addressLine3,
                addressLine4,
                postCode,
            } = assetAddress;

            return [
                postPreamble,
                addressLine1,
                addressLine2,
                addressLine3,
                addressLine4,
                postCode,
            ]
                .filter(addressLine => !!addressLine)
                .join(' ');
        },
        propertyTypeLabel: 'Property type',
        propertyType: (propertyType: string) => {
            const type =
                propertyType === 'Dwelling'
                    ? 'Dwelling'
                    : 'Lettable non-dwelling';
            return type;
        },
        tenureLabel: 'Tenure',
        tenureInformation: (isActive: boolean, tenureType: string) => {
            const tenureActivityState = `${isActive ? 'Active' : 'Inactive'}`;
            const isSecured = `${
                tenureType === 'SECURE' ? 'secured' : 'unsecured'
            }`;
            return `${tenureActivityState}, ${isSecured}`;
        },
        uprnLabel: 'UPRN',
        active: 'active',
    },
    errors: {
        alertTitle: 'Error',
        minSearchTerm: 'You must enter a minimum of 2 characters',
        searchUnexpectedErrorTitle: 'Unable to retrieve search results',
        searchUnexpectedErrorDescription:
            'Please try again. If the issue persists, please contact support.',
    },
};

export default locale;
