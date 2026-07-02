import type { ParseSelector } from 'typed-query-selector/parser'

export interface ElementInterface<T extends Element> {
  prototype: T
  new(): T
}

/** Assert element is not null */
export function assertElementFound(selector: string, element: Element | null): asserts element is Element {
  if (element === null) {
    throw new Error(`Element "${selector}" is not found`)
  }
}

/** Assert element is instance of provided interface */
export function assertTypeOfElement<T extends Element>(selector: string, element: Element, type: ElementInterface<T>): asserts element is T {
  if (!(element instanceof type)) {
    throw new TypeError(`Element "${selector}" is not ${type.name}`)
  }
}

/** Wrap the type guard around parent's querySelector method */
export function wrapQuerySelector(parent: ParentNode) {
  function querySelector<T extends string>(selector: T): ParseSelector<T>
  function querySelector<T extends Element>(selector: string, type: ElementInterface<T>): T
  function querySelector(selector: string, type?: ElementInterface<Element>) {
    const element = parent.querySelector(selector)
    assertElementFound(selector, element)
    if (type) {
      assertTypeOfElement(selector, element, type)
      return element;
    }

    return element
  }

  return querySelector
}
/** Wrap the type guard around parent's querySelectorAll method */
export function wrapQuerySelectorAll(parent: ParentNode) {
  function querySelectorAll<T extends string>(selector: T): NodeListOf<ParseSelector<T>>
  function querySelectorAll<T extends Element>(selector: string, type: ElementInterface<T>): NodeListOf<T>
  function querySelectorAll(selector: string, type?: ElementInterface<Element>): NodeListOf<Element> {
    const elements = parent.querySelectorAll(selector)

    for (let i = 0; i < elements.length; i++) {
      if (type) {
        assertTypeOfElement(`(${selector})[${i}]`, elements[i], type)
      }
    }

    return elements
  }

  return querySelectorAll
}

/** The type guard wrapped around document's querySelector method */
export const querySelector = wrapQuerySelector(document)

/** The type guard wrapped around document's querySelectorAll method */
export const querySelectorAll = wrapQuerySelectorAll(document)
