import faker from 'faker';
import { Person, TenureSummary, Tenure, HouseholdMember } from '@types';

faker.seed(1);

const generateMockTenureSummary = (): TenureSummary => ({
    id: faker.datatype.uuid(),
    type: 'secure',
    startDate: faker.date.past(1).toISOString().slice(0, 10),
    endDate: faker.date.future(1).toISOString().slice(0, 10),
    assetFullAddress: faker.address.streetAddress(),
});

export const generateMockPerson = (): Person => ({
    id: faker.datatype.uuid(),
    title: faker.name.prefix(),
    firstname: faker.name.firstName(),
    middlename: faker.name.middleName(),
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
            identificationType: 'NI',
            value: faker.random.alphaNumeric(8),
            originalDocumentSeen: faker.datatype.boolean(),
            linkToDocument: faker.system.filePath(),
        },
    ],
    personTypes: ['Person'],
    isPersonCautionaryAlert: faker.datatype.boolean(),
    isTenureCautionaryAlert: faker.datatype.boolean(),
    tenures: Array.from({ length: faker.datatype.number(3) }).map(() =>
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
                isResponsible: true,
                type: 'person' as HouseholdMember['type'],
            })),
            ...Array.from({ length: faker.datatype.number(4) }).map(() => ({
                id: faker.datatype.uuid(),
                fullName: faker.name.findName(),
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
    };
};

export const mockTenures = Array.from({ length: 40 }).map(() =>
    generateMockTenure()
);
