export type ElementInterface<T extends Element> = {
    prototype: T;
    new(): T;
};

/** Assert element is not null */
export function assertElementFound(selector: string, element: Element | null): asserts element is Element {
    if (element === null) {
        throw new Error(`Element "${selector}" is not found`);
    }
}

/** Assert element is instance of provided interface */
export function assertTypeOfElement<T extends Element>(selector: string, element: Element, type: ElementInterface<T>): asserts element is T {
    if (!(element instanceof type)) {
        throw new TypeError(`Element "${selector}" is not ${type.name}`);
    }
}

/** Wrap the type guard around parent's querySelector method */
export function wrapQuerySelector(parent: ParentNode) {
    return <T extends Element>(selector: string, type: ElementInterface<T>): T => {
        const element = parent.querySelector(selector);

        assertElementFound(selector, element);
        assertTypeOfElement(selector, element, type);

        return element;
    };
}

/** Wrap the type guard around parent's querySelectorAll method */
export function wrapQuerySelectorAll(parent: ParentNode) {
    return <T extends Element>(selector: string, type: ElementInterface<T>): NodeListOf<T> => {
        const elements = parent.querySelectorAll<T>(selector);

        for (let i = 0; i < elements.length; i++) {
            assertTypeOfElement(`(${selector})[${i}]`, elements[i], type);
        }

        return elements;
    };
}

/** The type guard wrapped around document's querySelector method */
export const querySelector = wrapQuerySelector(document);

/** The type guard wrapped around document's querySelectorAll method */
export const querySelectorAll = wrapQuerySelectorAll(document);
