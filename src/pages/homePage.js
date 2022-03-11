//@ts-check
import { navigateTo } from '../lib/hashRouter.js';
import createHomeView from '../views/homeView.js';

const createHomePage = () => {
  const { root, startBtn, aboutBtn } = createHomeView();

  startBtn.addEventListener('click', () => navigateTo('repos'));
  aboutBtn.addEventListener('click', () => navigateTo('about'));

  return { root };
};

export default createHomePage;
