function createAboutView(props) {
  const root = document.createElement('div');
  root.className = 'dialog-container centered';
  root.innerHTML = String.raw`
    <h1>Router Starter Application</h1>
    <p>This starter application implements and demonstrates a standard 
      application architecture, featuring a hash-based router. The architecture 
      includes the following:
    </p>
    <ul>
      <li>A standard folder structure.</li>
      <li>Standards for application functions, interacting in a standard way.</li>
    </ul>
    <div class="button-container">
      <button type="button" id="btn-home">Home</button>
    </div>
  `;

  const homeButton = root.querySelector('#btn-home');
  homeButton.addEventListener('click', props.onClick);

  return { root };
}

export default createAboutView;
