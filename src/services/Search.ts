const buildSearchUrl = (term) =>
    `https://y1e46yws9c.execute-api.eu-west-2.amazonaws.com/development/api/v1/search/persons?searchText=${term}`;
const headers = {
    "Content-Type": "application/json",
    "x-api-key": "PdVeW0KpKr4o1vPDhlWwK6fK7QfM3v2h7FAwD5ml",
};
export function findByPersonName(name: string = "") {
    return fetch(buildSearchUrl(name), { headers });
}
