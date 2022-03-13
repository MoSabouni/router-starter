const createHomeView = (props) => {
  const root = document.createElement('div');
  root.className = 'dialog-container';

  root.innerHTML = String.raw`
    <h1>Router Starter Application</h1>
    <p>Features a hash-based router written in plain vanilla JavaScript. 
      This example uses the GitHub API to lists repositories from the 
      HackYourFuture organization.
    </p>
    <div class="button-container">
      <button type="button" id="start-btn">Start</button>
      <button type="button" id="about-btn">About</button>
    </div>
  `;

  const startButton = root.querySelector('#start-btn');
  startButton.addEventListener('click', props.onStart);

  const aboutButton = root.querySelector('#about-btn');
  aboutButton.addEventListener('click', props.onAbout);

  return { root };
};

export default createHomeView;
