import locale from './locale';

describe('locale', () => {
    describe('personTitleAbbr', () => {
        it('should add a dot if a title is known', () => {
            ['Dr', 'Mr', 'Mrs', 'Ms'].forEach(title =>
                expect(locale.person.personTitleAbbr(title)).toBe(`${title}.`)
            );
        });
        it('should return the title if its not known', () => {
            const NOT_KNOWN_TITLE = 'NotKnown';
            expect(locale.person.personTitleAbbr(NOT_KNOWN_TITLE)).toBe(
                NOT_KNOWN_TITLE
            );
        });
    });
});
