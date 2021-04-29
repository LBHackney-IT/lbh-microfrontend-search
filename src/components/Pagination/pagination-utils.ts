export function pages(totalResults = 0, pageSize = 0): number {
    return totalResults === 0 || pageSize === 0
        ? 0
        : Math.ceil(totalResults / pageSize);
}

export function navPages(
    totalResults = 0,
    pageSize = 0,
    navPageSize = 0
): number[] {
    const navigationPages = [];
    if (totalResults === 0 || pageSize === 0 || navPageSize === 0) {
        return [];
    }

    const nrOfNavLinks = pages(totalResults, pageSize);
    const nrOfNavPages = pages(nrOfNavLinks, navPageSize);

    for (let index = 1; index <= nrOfNavPages; index++) {
        navigationPages.push(index);
    }

    return navigationPages;
}

export function navPageLinks(linksPerPage = 0, pageNumber = 0): number[] {
    if (linksPerPage === 0 || pageNumber === 0) return [];

    const links = [];
    const min = linksPerPage * (pageNumber - 1) + 1;
    const max = linksPerPage * pageNumber;
    for (let index = min; index <= max; index++) {
        links.push(index);
    }
    return links;
}

export function navigation(
    currentNavLinksPage: number,
    totalNavLinksPages: number,
    totalResultPages: number,
    navLinksPageSize: number
): { isPrevDisabled: boolean; isNextDisabled: boolean; pages: number[] } {
    const isFirstPage = currentNavLinksPage < 2;
    const isLastPage =
        currentNavLinksPage === totalNavLinksPages || totalResultPages === 0;
    let newNavPageLinks = navPageLinks(navLinksPageSize, currentNavLinksPage);

    if (isLastPage) {
        const remainder = totalResultPages % navLinksPageSize;
        const navLinksForPage = navPageLinks(
            navLinksPageSize,
            currentNavLinksPage
        );
        newNavPageLinks = remainder
            ? navLinksForPage.slice(0, remainder)
            : navLinksForPage;
    }

    return {
        isPrevDisabled: isFirstPage,
        isNextDisabled: isLastPage,
        pages: newNavPageLinks,
    };
}
