//@ts-check
/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */

/**
 * Create an HTML element and optionally set attributes and text content.
 * @param {string} tagName The name of the element to create
 * @param {object} options An object with key-value pairs of attributes.
 * @returns
 */
export const createElement = (tagName = 'div', options = {}) => {
  const elem = document.createElement(tagName);

  // `text` is not a regular attribute but must be set via `.textContent`
  const { text, ...rest } = options;

  // set regular attributes
  for (const [name, value] of Object.entries(rest)) {
    elem.setAttribute(name, value);
  }

  // set text (if any) using `.textContent`
  if (text) {
    elem.textContent = text;
  }

  return elem;
};

/**
 * Removes all child elements of an element.
 * @param {HTMLElement} elem The HTML element to clear.
 */
export const clearElement = (elem) => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};
