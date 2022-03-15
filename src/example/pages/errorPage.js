import { navigateTo } from '../../lib/hashRouter.js';
import createErrorView from '../views/errorView.js';

function createErrorPage(state) {
  return createErrorView({
    error: state.error,
    onClick: () => {
      state.error = null;
      navigateTo('home');
    },
  });
}

export default createErrorPage;
