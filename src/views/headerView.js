function createHeaderView(props) {
  const header = document.createElement('header');
  header.className = 'header';

  if (props?.content) {
    header.appendChild(props.content);
  }

  return { root: header };
}

export default createHeaderView;
