import { fromTo, parseSort } from './search-utils';

test('fromTo works', () => {
    expect(fromTo(1, 12, 25)).toEqual([1, 12]);
    expect(fromTo(3, 12, 25)).toEqual([25, 25]);
    expect(fromTo(4, 12, 25)).toEqual([0, 0]);
    expect(fromTo(10, 100, 913)).toEqual([901, 913]);
    expect(fromTo(1, 100, 913)).toEqual([1, 100]);
});

test('parseSort()', () => {
    expect(parseSort('surname_1')).toEqual(['surname', true]);
    expect(parseSort('surname_0')).toEqual(['surname', false]);
    expect(parseSort('streetname_1')).toEqual(['streetname', true]);
    expect(parseSort('streetname_0')).toEqual(['streetname', false]);
});
