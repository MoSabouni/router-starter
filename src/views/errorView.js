const createErrorView = (props) => {
  const root = document.createElement('div');
  root.className = 'dialog-container';

  root.innerHTML = String.raw`
    <div class="alert alert-error">
      ${props.error?.message ?? 'Oops... something went wrong.'}
    </div>
    <button type="button">Home</button>
  `;

  const homeButton = root.querySelector('button');
  homeButton.addEventListener('click', props.onClick);

  return { root };
};

export default createErrorView;
