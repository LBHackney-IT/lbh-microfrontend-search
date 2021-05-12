import faker from 'faker';
import { Person, Tenure } from '@types';

faker.seed(1);

const generateMockTenure = (): Tenure => ({
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
        generateMockTenure()
    ),
});

export const mockPersons = Array.from({ length: 40 }).map(() =>
    generateMockPerson()
);
