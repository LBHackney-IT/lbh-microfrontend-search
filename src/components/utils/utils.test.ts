import { createBemElementBuilder } from "./index";

test("elements BEM classes are correctly formatted", () => {
    const bemBlock = "foo";
    const finalClass = "foo__bar";
    const __ = createBemElementBuilder(bemBlock);
    expect(__("bar")).toEqual(finalClass);
});
