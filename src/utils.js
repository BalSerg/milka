function getElement(selector, parent = document) {
  const elem = parent.querySelector(selector);
  if (!elem) {
    // throw new Error(`Element ${selector} not found`);
    return null;
  }

  return elem;
}

function getArrayElements(selector, parent = document) {
  const array = Array.from(parent.querySelectorAll(selector));
  if (!array) {
    return [];
  }

  return array;
}

export { getElement, getArrayElements };
