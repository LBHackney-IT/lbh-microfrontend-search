import { pages, navPages, navPageLinks, navigation } from './pagination-utils';

test('pages() to return the correct total', () => {
    expect(pages(12, 5)).toEqual(3);
    expect(pages(0, 0)).toEqual(0);
    expect(pages(913, 5)).toEqual(183);
    expect(pages(12345, 12345)).toEqual(1);
    expect(pages(123, 0)).toEqual(0);
});

test('navPages() to return the correct page links for given page number', () => {
    expect(navPages(0, 123, 13)).toEqual([]);
    expect(navPages(12, 0, 12)).toEqual([]);
    expect(navPages(12, 123, 0)).toEqual([]);
    expect(navPages(12, 5, 5)).toEqual([1]);
    expect(navPages(100, 10, 5)).toEqual([1, 2]);
});

test('navPageLinks() return links for a nav page', () => {
    expect(navPageLinks(5, 1)).toEqual([1, 2, 3, 4, 5]);
    expect(navPageLinks(5, 3)).toEqual([11, 12, 13, 14, 15]);
    expect(navPageLinks(5, 0)).toEqual([]);
    expect(navPageLinks(0, 2)).toEqual([]);
    expect(navPageLinks(5, 2)).toEqual([6, 7, 8, 9, 10]);
});

test('navigation works', () => {
    expect(navigation(1, 3, 12, 5)).toEqual({
        isPrevDisabled: true,
        isNextDisabled: false,
        pages: [1, 2, 3, 4, 5],
    });

    expect(navigation(2, 3, 12, 5)).toEqual({
        isPrevDisabled: false,
        isNextDisabled: false,
        pages: [6, 7, 8, 9, 10],
    });

    expect(navigation(3, 3, 12, 5)).toEqual({
        isPrevDisabled: false,
        isNextDisabled: true,
        pages: [11, 12],
    });

    expect(navigation(2, 2, 10, 5)).toEqual({
        isPrevDisabled: false,
        isNextDisabled: true,
        pages: [6, 7, 8, 9, 10],
    });
});
