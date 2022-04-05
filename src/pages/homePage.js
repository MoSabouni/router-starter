import createHomeView from '../views/homeView.js';

function createHomePage() {
  const props = {
    title: 'CORNFLIX',
    intro:
      'We help you find the best and the newest movies, TV series and shows. you are just one click away from entertainment!.',
    btnText: 'Start searching!',
    btnHref: '#movie',
  };
  return createHomeView(props);
}

export default createHomePage;
