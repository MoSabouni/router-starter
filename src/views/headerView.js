const createHeaderView = (childRoot) => {
  const header = document.createElement('header');
  header.className = 'header';

  if (childRoot) {
    header.appendChild(childRoot);
  }

  return { root: header };
};

export default createHeaderView;
