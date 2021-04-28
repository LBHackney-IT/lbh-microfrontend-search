export function fromTo(
    currentPage: number,
    pageSize: number,
    totalResults: number
) {
    const from = (currentPage - 1) * pageSize + 1;
    const nrOfPages = Math.ceil(totalResults / pageSize);

    if (currentPage > nrOfPages) {
        return [0, 0];
    }

    let to = pageSize * currentPage;
    if (to > totalResults) {
        to = from + (totalResults % pageSize) - 1;
    }

    return [from, to];
}

export function parseSort(sortToken: string): [string, boolean] {
    const parts = sortToken.split('_');
    return [parts[0], Boolean(Number(parts[1]))];
}
