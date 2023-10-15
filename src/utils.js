function getElement(selector) {
  const elem = document.querySelector(selector);
  if (!elem) {
    return;
  }
  return elem;
}

function getArrayElements(selector) {
  const array = Array.from(document.querySelectorAll(selector));
  if (array) {
    return Array.from(document.querySelectorAll(selector));
  }
}

export { getElement, getArrayElements };
