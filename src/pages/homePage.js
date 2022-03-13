//@ts-check
import { navigateTo } from '../lib/hashRouter.js';
import createHomeView from '../views/homeView.js';

const createHomePage = () => {
  const onStart = () => navigateTo('repos');
  const onAbout = () => navigateTo('about');
  return createHomeView({ onStart, onAbout });
};

export default createHomePage;
