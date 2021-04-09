const persons = [
    {
        id: "1",
        title: "Mrs",
        firstname: "Julie",
        middleName: "",
        surname: "Evans",
        preferredFirstname: "string",
        preferredSurname: "string",
        ethinicity: "Christian",
        nationality: "Canadian",
        placeOfBirth: "Toronto",
        dateOfBirth: "1990-02-19",
        gender: "F",
        identification: [
            {
                identificationType: "NI",
                value: "1234A",
                originalDocumentSeen: true,
                linkToDocument: "string",
            },
        ],
        personTypes: ["Housing Officer"],
        IsPersonCautionaryAlert: true,
        IsTenureCautionaryAlert: true,
        tenures: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "secure",
                startDate: "string",
                endDate: "string",
                assetFullAddress: "Apartment 22, 18 G road, SW11",
            },
        ],
    },
    {
        id: "2",
        title: "Mrs",
        firstname: "Julie",
        middleName: "",
        surname: "Evans",
        preferredFirstname: "string",
        preferredSurname: "string",
        ethinicity: "Christian",
        nationality: "Canadian",
        placeOfBirth: "Toronto",
        dateOfBirth: "1990-02-19",
        gender: "F",
        identification: [
            {
                identificationType: "NI",
                value: "1234A",
                originalDocumentSeen: true,
                linkToDocument: "string",
            },
        ],
        personTypes: ["Housing Officer"],
        IsPersonCautionaryAlert: true,
        IsTenureCautionaryAlert: true,
        tenures: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "secure",
                startDate: "string",
                endDate: "string",
                assetFullAddress: "Apartment 22, 18 G road, SW11",
            },
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "secure",
                startDate: "string",
                endDate: "string",
                assetFullAddress: "Apartment 22, 18 G road, SW11",
            },
        ],
    },
    {
        id: "3",
        title: "Mrs",
        firstname: "Julie",
        middleName: "",
        surname: "Evans",
        preferredFirstname: "string",
        preferredSurname: "string",
        ethinicity: "Christian",
        nationality: "Canadian",
        placeOfBirth: "Toronto",
        dateOfBirth: "1990-02-19",
        gender: "F",
        identification: [
            {
                identificationType: "NI",
                value: "1234A",
                originalDocumentSeen: true,
                linkToDocument: "string",
            },
        ],
        personTypes: ["Housing Officer"],
        IsPersonCautionaryAlert: true,
        IsTenureCautionaryAlert: true,
        tenures: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "secure",
                startDate: "string",
                endDate: "string",
                assetFullAddress: "Apartment 22, 18 G road, SW11",
            },
        ],
    },
    {
        id: "4",
        title: "Mrs",
        firstname: "Julie",
        middleName: "",
        surname: "Evans",
        preferredFirstname: "string",
        preferredSurname: "string",
        ethinicity: "Christian",
        nationality: "Canadian",
        placeOfBirth: "Toronto",
        dateOfBirth: "1990-02-19",
        gender: "F",
        identification: [
            {
                identificationType: "NI",
                value: "1234A",
                originalDocumentSeen: true,
                linkToDocument: "string",
            },
        ],
        personTypes: ["Housing Officer"],
        IsPersonCautionaryAlert: true,
        IsTenureCautionaryAlert: true,
        tenures: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "secure",
                startDate: "string",
                endDate: "string",
                assetFullAddress: "Apartment 22, 18 G road, SW11",
            },
        ],
    },
    {
        id: "5",
        title: "Mrs",
        firstname: "Julie",
        middleName: "",
        surname: "Evans",
        preferredFirstname: "string",
        preferredSurname: "string",
        ethinicity: "Christian",
        nationality: "Canadian",
        placeOfBirth: "Toronto",
        dateOfBirth: "1990-02-19",
        gender: "F",
        identification: [
            {
                identificationType: "NI",
                value: "1234A",
                originalDocumentSeen: true,
                linkToDocument: "string",
            },
        ],
        personTypes: ["Housing Officer"],
        IsPersonCautionaryAlert: true,
        IsTenureCautionaryAlert: true,
        tenures: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "secure",
                startDate: "string",
                endDate: "string",
                assetFullAddress: "Apartment 22, 18 G road, SW11",
            },
        ],
    },
    {
        id: "6",
        title: "Mrs",
        firstname: "Julie",
        middleName: "",
        surname: "Evans",
        preferredFirstname: "string",
        preferredSurname: "string",
        ethinicity: "Christian",
        nationality: "Canadian",
        placeOfBirth: "Toronto",
        dateOfBirth: "1990-02-19",
        gender: "F",
        identification: [
            {
                identificationType: "NI",
                value: "1234A",
                originalDocumentSeen: true,
                linkToDocument: "string",
            },
        ],
        personTypes: ["Housing Officer"],
        IsPersonCautionaryAlert: true,
        IsTenureCautionaryAlert: true,
        tenures: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                type: "secure",
                startDate: "string",
                endDate: "string",
                assetFullAddress: "Apartment 22, 18 G road, SW11",
            },
        ],
    },
];

const mockFindByName = (term?: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                results: {
                    persons: persons,
                },
                total: persons.length,
            });
        }, 1000);
    });
};

export { persons, mockFindByName };
