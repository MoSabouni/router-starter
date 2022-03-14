import { navigateTo } from '../../lib/hashRouter.js';
import createErrorView from '../views/errorView.js';

function createErrorPage({ error }) {
  return createErrorView({ error, onClick: () => navigateTo('home') });
}

export default createErrorPage;
