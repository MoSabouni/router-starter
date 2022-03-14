//@ts-check
/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */

/**
 * Navigates to a specified page.
 * @param {string} pageName The name of the page to load.
 * @param {*} args First arg is the pathname, any remaining args are
 * passed to the page creator function.
 */
export const navigateTo = (pageName, ...args) => {
  const encodedHash = encodeURI('#' + [pageName, ...args].join('/'));
  window.location.assign(encodedHash);
};

const getRouteParts = () => {
  const [hash, ...rest] = decodeURI(window.location.hash).split('/');
  const path = hash.replace('#', '');
  return [path, ...rest];
};

/** @typedef {(data: object, action?: string) => void} UpdateCallback*/
/** @typedef {{root: HTMLElement, update?: UpdateCallback}} ViewObject*/
/** @typedef {(context?: object, data?: object) => ViewObject} PageFunction */
/** @typedef {{path: string, page: PageFunction, default?: boolean}} Route */

/**
 * Create a location hash based router.
 * @param {Route[]} routes An array of route objects.
 * @param {HTMLElement} routerOutlet The DOM element where page are loaded into.
 * @param {object} [context] A context object to be passed to Page functions
 */
function createRouter(routes, routerOutlet, context = {}) {
  // Find the first route object in the `routes` table that has the property
  // `default` set to `true` (or thruthy). This is the default route.
  const getDefaultRoute = () => {
    const defaultRoute = routes.find((route) => route.default);
    if (!defaultRoute) {
      throw new Error('Missing default route in routes table');
    }
    return defaultRoute;
  };

  const findRouteByPathname = (pathname) =>
    routes.find((route) => route.path === pathname);

  // Routes are encoded in the hash part of the document location.
  // We listen for changes to the hash and attempt to load a corresponding
  // page from the `routes` table.
  window.addEventListener('hashchange', () => {
    const [pathname, ...params] = getRouteParts();

    // Find the page corresponding to the current hash value
    const route = findRouteByPathname(pathname);

    // If not found, redirect to default page
    if (!route) {
      navigateTo(getDefaultRoute().path);
      return;
    }

    // Create the page corresponding to the route.
    // The page creation function is expected to return its root element
    // in the root property of the returned object.
    const { root } = route.page(context, params);

    // Clear the content router outlet container and append the page
    // root element as its new child.
    routerOutlet.innerHTML = '';
    routerOutlet.appendChild(root);
  }); // end of event handler

  // Kickstart the router at creation time.
  window.dispatchEvent(new Event('hashchange'));
}

export default createRouter;
