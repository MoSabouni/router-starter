//@ts-check
import { createElement } from '../lib/domHelpers.js';

const createContributorView = (props) => {
  const row = createElement('tr');
  row.appendChild(
    createElement('th', { text: `${props.label}:`, class: 'label' })
  );
  const valueText = createElement('td', { text: props.value });
  row.appendChild(valueText);
  return { root: row, valueText };
};

export default createContributorView;
