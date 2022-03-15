function createFilterView(props) {
  const root = document.createElement('div');
  root.className = 'filter-view';
  root.innerHTML = String.raw`
    <div>Filter:</div>
    <input type="text" class="filter-input"/>
  `;

  const filterInput = root.querySelector('.filter-input');
  filterInput.addEventListener('input', props.onFilterInput);
  return { root };
}

export default createFilterView;
