function createFilterView(props) {
  const root = document.createElement('div');
  root.className = 'filter-view';
  root.innerHTML = String.raw`
    <div>Filter:</div>
    <input type="text" class="filter-input"/>
    <button type="button" id="btn-clear" disabled>Clear</button>
  `;

  const filterInput = root.querySelector('.filter-input');
  filterInput.addEventListener('input', props.onFilterInput);

  const btnClear = root.querySelector('#btn-clear');
  btnClear.addEventListener('click', props.onClearFilter);

  const update = (state) => {
    filterInput.value = state.filter || '';
    btnClear.disabled = !state.filter;
  };

  return { root, update };
}

export default createFilterView;
