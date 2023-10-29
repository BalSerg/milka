function getElement(selector, parent = document) {
  const elem = parent.querySelector(selector);
  if (!elem) {
    throw new Error(`Element ${selector} not found`);
    // return null;
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

function toggleModal(text) {
  if (getElement('[class*= "js-modal"]').classList.contains('is-visibility')) {
    getElement('[class*= "js-modal"]').classList.remove('is-visibility');
  } else if (text) {
    getElement('.js-modal .modal__text').innerText = text;
    getElement('[class*= "js-modal"]').classList.add('is-visibility');
  }
}

export { getElement, getArrayElements, toggleModal };
