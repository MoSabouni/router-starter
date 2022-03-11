# Simple hash-based router starter project using plain vanilla JS

An example application that demonstrates a simple, hash-based router written in plain vanilla JavaScript.

## Installing Dependencies

There are no dependencies needed to run the website, everything is prepared to work with vanilla JavaScript. However, if you want to install prettier for this project then run (generally you always want to do this if you see a `package.json` file):

```bash
npm install
```

## Code Organization

In this project we present a couple of code design guidelines (specific to this application) that standardize the way functions and data are used. By documenting these standards and seeking adherence to it, a common vocabulary is created. This should make it easier to work together and reason about code with your project team members.

In the next few sections we will detail the guidelines and standards.

### Folder Structure

```text
public
src
└── fetchers
└── lib
└── pages
└── views
└── app.js
└── data.js
index.html
```

<!-- prettier-ignore -->
| Folder | Description |
|--------|-------------|
| `public` | This folder contains the static files that can be used by our `index.html` file. |
| `src` | This contains all of our JavaScript code. |
| `src/fetchers` | This folders contain functions that deal with fetching application data from specific urls for use by Page functions. |
| `src/lib` | This folder provides a number of ready-made library functions that you can use in your application. |
| `src/pages` | This folder contains our functions that create pages to be displayed in the UI, for instance a Home page, an About page etc. These functions create the DOM elements, either directly, or by calling View functions from the `src/views` folder. They also handle all user interactions through event handlers. |
| `src/views` | This folder contains pure functions that create parts of the UI by creating subtrees of DOM elements. |
| `app.js` |  This file our initialization code. Generally this code should only run once and starts the application. |
| `data.js` | This is our data model. Anything we need to store in the browser we place inside the data file. |
| `index.html` | The one and only HTML file for our application. It includes a `div` element that serves as the root element for our application. It also loads the `app.js` file using a `script` tag with the `type` set to `module` so that we can use ES6 `import` and `export` keywords to load additional modules.

### Provided library functions

A number of ready-made functions are provided in the `src/lib` folder that you can use in your application.

> Note: The syntax used below is the same TypeScript syntax that use see in VSCode Intellisense when you hover the mouse pointer over a function header.

```ts
// src/lib/domHelpers.js
createElement(tagName: string, options?: object) => HTMLElement
```

This function creates and returns an HTML element and optionally set its attributes and text content.

```ts
// src/lib/domHelpers.js
clearElement(element: HTMLElement) => void
```

Removes all children (if any) from an element.

```ts
// src/lib/fetchData.js
fetchData(url: string) => Promise<any>
```

Fetches JSON data from the Web API specified by the `url` parameter.

```ts
// src/lib/fetchData.js
fetchCachedData(url: string) => Promise<any>
```

Fetches JSON data from the Web API specified by the `url` parameter. Caches the response. Subsequent requests to the same `url` are served from the cache. This is particularly useful when using Web APIs that use request rate limiting.

```ts
// src/lib/hashRouter.js
createRouter(routes: Route[]) => void
```

This function creates a hash-based router. It takes an array of 'routes' as its argument. Please see the section **Routing** below for more details.

```ts
// src/lib/hashRouter.js
navigateTo(pageName: string, ...args: any) => void
```

Encodes the page name and optional arguments into a string and assigns it to the browser's location hash. This will trigger hash change event that the router will pick up. Please see the section **Routing** below for more details.

### View functions

```js
createXXXView(...args: any) => { root: HTMLElement }
```

View functions are _pure_ functions used to render JS data into DOM elements. They take primitives, objects or arrays as arguments and they return a subtree of created DOM elements.

View functions are called by Page functions (mostly) or other View functions (sometimes) which then incorporate the returned subtree in their own DOM subtrees.

View functions should return a JavaScript object with at minimum a `root` property that is a reference to the root element of the subtree returned by the function.

The returned object may optionally include additional properties that are references to child elements in the returned subtree. These may be used by Page functions, for instance when event listeners need to be added. See for example the file `button-view.js` in the `src/views` folder in this repo.

The name of a View function should follow the naming convention **create**_XXX_**View**, where _XXX_ is the name of the View. Example: `createWelcomeView`.

View functions should _never_ ...

- Read from the DOM. Instead, they will create _new_ DOM elements
- Write to the DOM. They return an object containing DOM elements.
- Use events (they should not add event handlers).
- Use `prompt`/`alert`/`confirm`.
- Use data that is not passed as a parameter.

### Page functions

```js
createXXXPage(...args: any) => { root: HTMLElement }
```

Page functions define user interactions per page. They will:

- Read user input from events and from the DOM.
- Read and modify program data variables.
- Process user data with logic functions.
- Update the DOM to show changes to the user.
- Log any important information for developers.

Each application page will have exactly one corresponding Page function.

A Page function can call upon View functions to create parts of the page UI. It can add event handlers to DOM elements.

> See the file `question-page.js` in the `src/pages` folder for an example of a Page function (`createWelcomePage`) that adds event listeners to DOM child elements returned by a View function (`createWelcomeView`)..

Page functions use the same calling convention as View functions. Any required data should be passed as arguments through the parameter list. A Page function should return a JavaScript object with a `root` property that holds a reference to the root element of the DOM subtree of the page.

A page is loaded into the DOM by passing the Page function and any required parameters to the provided `loadPage()` library function mentioned above.

The name of a Page function should follow the naming convention **create**_XXX_**Page**, where _XXX_ is the name of the View. Example: `createWelcomePage`.

### Routing

The purpose of a router in a Single Page Application is to programmatically load different application 'pages', depending on the browser's url, into the DOM. In a hash-based router, the specific page to load is indicated by the `hash` fragment of a url. In a url, a hash fragment is the part that starts with a `#` mark. Everything following the `#` mark is considered part of the hash.

We can take advantage of the hash to encode page specific application state in the url, such as the name of the page to load and optional (string) arguments for use by the page. A hash-based router uses an event listener to listen for hash changes and responds by loading a matching page (see **Implementation** below).

Example:

```text
#repo/HackYourFuture/UsingAPIs
```

This hash identifies a page named `repo` and two string values to be passed to the Page function: `"HackYourFuture"` and `"UsingAPIs"`.

#### Benefits of a hash-based router

The hash fragment in a url is not considered part of the web address. The browser will only use the url parts preceding the hash when making an HTTP request to load an HTML page. In a Single Page Application using a hash-based router you can therefore do the following without the need for backend support:

- Reload the browser and return to the same application page as specified by the hash.
- Bookmark an application url and return to the same page in the future.
- Send the url to a friend who then lands on the expected application page.

#### Implementation

The router is created in `app.js` by calling `createRouter()` and passing it a `routes` array of route objects as an argument.

Here is the `routes` array as used in this starter project:

```js
// file src/pages/routes.js
const routes = [
  { path: 'home', page: createHomePage, default: true },
  { path: 'repos', page: createReposPage },
  { path: 'error', page: createErrorPage },
];
```

The `path` property identifies the name of the page. The `page` property identifies the corresponding Page function that should be called. The optional `default` property identifies the page that should be loaded when the browser's url does not specify a hash. There should be only one route object with a `default` property.

The main code of the router is inside the function `createRouter()`. Below is a simplified part of the code that illustrates how the router works.

```js
const createRouter = (routes) => {
  //...
  window.addEventListener('hashchange', () => {
    // Search the routes table for the route corresponding to the path name.
    const route = findRouteByPathname(pathname);
    // Call the Page function to create the page.
    const { root } = route.page(...params);
    // Mount the page in the DOM, removing any previous page.
    const routerOutlet = document.getElementById('router-outlet');
    clearElement(routerOutlet);
    routerOutlet.appendChild(root);
  });
  //...
};
```
