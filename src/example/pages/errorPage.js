import { navigateTo } from '../../lib/hashRouter.js';
import createErrorView from '../views/errorView.js';

function createErrorPage(state) {
  const props = {
    error: state.error,
    onClick: () => {
      state.error = null;
      navigateTo('home');
    },
  };
  return createErrorView(props);
}

export default createErrorPage;
