export function pages(totalResults = 0, pageSize = 0): number {
    if (totalResults === 0 || pageSize === 0) {
        return 0;
    } else {
        return Math.ceil(totalResults / pageSize);
    }
}

export function navPages(totalResults = 0, pageSize = 0, navPageSize = 0) {
    const navigationPages = [];
    if (totalResults === 0 || pageSize === 0 || navPageSize === 0) {
        return [];
    }

    const nrOfNavLinks = pages(totalResults, pageSize);
    const nrOfNavPages = pages(nrOfNavLinks, navPageSize);

    for (let i = 1; i <= nrOfNavPages; i++) {
        navigationPages.push(i);
    }

    return navigationPages;
}

export function navPageLinks(linksPerPage = 0, pageNumber = 0) {
    if (linksPerPage === 0 || pageNumber === 0) return [];

    const links = [];
    const min = linksPerPage * (pageNumber - 1) + 1;
    const max = linksPerPage * pageNumber;
    for (let i = min; i <= max; i++) {
        links.push(i);
    }
    return links;
}

export function navigation(
    currentNavLinksPage: number,
    totalNavLinksPages: number,
    totalResultPages: number,
    navLinksPageSize: number
) {
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
