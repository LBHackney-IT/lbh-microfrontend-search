// Bem element notation string builder utility
// let's say you have a bem block called `search`
// you can create an element string builder like this
// const __ = createBemElementBuilder('my-bem-block')
// then when you need to put a class like this `my-bem-block__main-header`
// you can use __('main-header') so you don't have to repead yourself with the bem bock inside the
// jsx file
export function createBemElementBuilder(bemBlock: string): Function {
    return (suffix) => `${bemBlock}__${suffix}`;
}
