import { navigateTo } from '../lib/hashRouter.js';
import createErrorView from '../views/errorView.js';

const createErrorPage = (context) => {
  const onClick = () => navigateTo('home');
  return createErrorView({ error: context.error, onClick });
};

export default createErrorPage;
