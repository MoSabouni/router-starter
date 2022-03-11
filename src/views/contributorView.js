//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createContributorView = (label, value) => {
  const row = createElement('tr');
  row.appendChild(createElement('th', { text: `${label}:`, class: 'label' }));
  const valueText = createElement('td', { text: value });
  row.appendChild(valueText);
  return { root: row, valueText };
};

export default createContributorView;
