import faker from 'faker';
import { Tenure, HouseholdMember } from '@mtfh/common/lib/api/tenure/v1';
import {
    PersonSearchResult,
    TenureSummary,
    IdentificationTypes,
} from '@mtfh/common/lib/api/person/v1';
import { AssetSearchResult } from '../types';

faker.seed(1);

const generateMockTenureSummary = (): TenureSummary => ({
    id: faker.datatype.uuid(),
    type: 'secure',
    startDate: faker.date.past(1).toISOString().slice(0, 10),
    endDate: faker.date.future(1).toISOString().slice(0, 10),
    assetFullAddress: faker.address.streetAddress(),
    assetId: faker.datatype.uuid(),
    isActive: true,
    paymentReference: '',
    propertyReference: '',
    uprn: faker.datatype
        .number({ max: 99999999999 })
        .toString()
        .padStart(11, '0'),
});

export const generateMockPerson = (): PersonSearchResult => ({
    id: faker.datatype.uuid(),
    title: faker.name.prefix(),
    firstname: faker.name.firstName(),
    middleName: faker.name.middleName(),
    preferredFirstname: '',
    preferredSurname: '',
    surname: faker.name.lastName(),
    // Subset of ethnic groups https://www.ethnicity-facts-figures.service.gov.uk/style-guide/ethnic-groups
    ethinicity: faker.helpers.randomize([
        'English',
        'Irish',
        'Indian',
        'Chinese',
        'African',
        'Caribbean',
        'Arab',
    ]),
    // SUbset of nationalities https://www.gov.uk/government/publications/nationalities/list-of-nationalities
    nationality: faker.helpers.randomize([
        'Afghan',
        'Bahamian',
        'Cambodian',
        'Danish',
        'Egyptian',
        'French',
        'German',
        'Haitian',
        'Icelandic',
    ]),
    placeOfBirth: faker.address.cityName(),
    dateOfBirth: faker.date.past(30).toISOString().slice(0, 10),
    gender: faker.helpers.randomize(['M', 'F']),
    identification: [
        {
            identificationType: IdentificationTypes.NI,
            value: faker.random.alphaNumeric(8),
            isOriginalDocumentSeen: false,
        },
    ],
    personTypes: ['Tenant'],
    isPersonCautionaryAlert: faker.datatype.boolean(),
    isTenureCautionaryAlert: faker.datatype.boolean(),
    tenures: Array.from({ length: 3 }).map<TenureSummary>(() =>
        generateMockTenureSummary()
    ),
});

export const mockPersons = Array.from({ length: 40 }).map(() =>
    generateMockPerson()
);

const tenureTypes = {
    LEA: 'Leasehold (RTB)',
    NON: 'Non-Secure',
    SEC: 'Secure',
    TLA: 'Temp Annex',
    TBB: 'Temp B&B',
};

export const generateMockTenure = (): Tenure => {
    const isActive = faker.datatype.boolean();
    const startOfTenureDate = faker.date.past();
    const endOfTenureDate = isActive
        ? faker.datatype.boolean()
            ? faker.date.future()
            : null
        : faker.date.between(startOfTenureDate, new Date());
    const tenureType = faker.random.arrayElement(Object.keys(tenureTypes));
    return {
        id: faker.datatype.uuid(),
        paymentReference: faker.datatype
            .number({ max: 999999999 })
            .toString()
            .padStart(9, '0'),
        startOfTenureDate: startOfTenureDate.toISOString().slice(0, 10),
        endOfTenureDate:
            endOfTenureDate && endOfTenureDate.toISOString().slice(0, 10),
        householdMembers: [
            ...Array.from({ length: faker.datatype.number(4) }).map(() => ({
                id: faker.datatype.uuid(),
                fullName: faker.name.findName(),
                dateOfBirth: faker.date.past(30).toISOString().slice(0, 10),
                isResponsible: true,
                type: 'person' as HouseholdMember['type'],
            })),
            ...Array.from({ length: faker.datatype.number(4) }).map(() => ({
                id: faker.datatype.uuid(),
                fullName: faker.name.findName(),
                dateOfBirth: faker.date.past(30).toISOString().slice(0, 10),
                isResponsible: false,
                type: 'person' as HouseholdMember['type'],
            })),
        ],
        tenureType: {
            code: tenureType,
            description: tenureTypes[tenureType as keyof typeof tenureTypes],
        },
        tenuredAsset: {
            id: faker.datatype.uuid(),
            fullAddress: faker.address.streetAddress(),
            type: 'Dwelling',
            uprn: faker.datatype
                .number({ max: 99999999999 })
                .toString()
                .padStart(11, '0'),
        },
        // here
        propertyReference: '2653838280',
        accountType: { code: 'S', description: 'Service Charge' },
        charges: {
            rent: 0,
            currentBalance: 0,
            billingFrequency: '01',
            paymentReference: '299049788',
            rentGroupCode: 'LSC',
            rentGroupDescription: 'LH Serv Charges',
            serviceCharge: 0,
            otherCharges: 0,
            combinedServiceCharges: 0,
            combinedRentCharges: 0,
            tenancyInsuranceCharge: 0,
            originalRentCharge: 0,
            originalServiceCharge: 0,
        },
        isActive: false,
        isTenanted: false,
        terminated: { isTerminated: true, reasonForTermination: '' },
        successionDate: '1900-01-01T00:00:00',
        masterAccountTenureReference: '',
        evictionDate: '1900-01-01T00:00:00',
        potentialEndDate: '1900-01-01T00:00:00',
        rentCostCentre: 'H2951',
        isMutualExchange: false,
        informHousingBenefitsForChanges: false,
        isSublet: true,
        subletEndDate: '1900-01-01T00:00:00',
        subsidiaryAccountsReferences: [],
        notices: [
            {
                type: '',
                servedDate: '1900-01-01T00:00:00',
                expiryDate: '1900-01-01T00:00:00',
                effectiveDate: '1900-01-01T00:00:00',
                endDate: 'null',
            },
        ],
        legacyReferences: [
            { name: 'uh_tag_ref', value: '0905836/01' },
            { name: 'u_saff_tenancy', value: '' },
        ],
        agreementType: { code: 'M', description: 'Master Account' },
    };
};

export const mockTenures = Array.from({ length: 40 }).map(() =>
    generateMockTenure()
);

export const mockAssetSearchResult: AssetSearchResult = {
    id: '986a2a9e-9eb4-0966-120a-238689e3e265',
    assetId: '00054374',
    assetType: 'LettableNonDwelling',
    assetAddress: {
        uprn: '100021065786',
        addressLine1: 'Powell Road',
        addressLine2: 'Hackney',
        addressLine3: 'London',
        addressLine4: '',
        postCode: 'E5 8DH',
        postPreamble: '1 Newcome House',
    },
    tenure: {
        id: '0bb55bde-bc73-d7fe-0324-5cee5b59bc8c',
        paymentReference: '228008546',
        type: 'SECURE',
        startOfTenureDate: '2004-09-16',
        endOfTenureDate: '2021-08-03',
        isActive: true,
    },
};
