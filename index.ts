export type ElementConstructor<T extends Element> = {
    prototype: T;
    new(): T;
};

export function isTypeOfElement<T extends Element>(element: Element, type: ElementConstructor<T>): element is T {
    return element instanceof type;
}

export function querySelector<T extends Element>(selector: string, type: ElementConstructor<T>): T {
    const element = document.querySelector(selector);

    if (element === null) {
        throw new Error(`Element "${selector}" is not found`);
    }

    if (!isTypeOfElement(element, type)) {
        throw new TypeError(`Element "${selector}" is not ${type.name}`);
    }

    return element;
}
