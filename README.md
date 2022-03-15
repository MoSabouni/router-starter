# Simple hash-based router starter project using plain vanilla JS

An example application that demonstrates a simple, hash-based router written in plain vanilla JavaScript.

## Installing Dependencies

There are no dependencies needed to run the website, everything is prepared to work with vanilla JavaScript. However, if you want to install prettier for this project then run (generally you always want to do this if you see a `package.json` file):

```bash
npm install
```

## Code Organization

In this starter project we present a recommended folder structure and recommendations for the design of your application code.

### Folder Structure

```text
public
src
└── example
└── fetchers
└── lib
└── pages
└── views
└── app.js
└── constants.js
└── data.js
└── .secrets.js
index.html
```

> Note: Students at HackYourFuture may recognize this folder structure as similar to the one recommended for the group project in the Browsers module.

<!-- prettier-ignore -->
| Folder | Description |
|--------|-------------|
| `public` | This folder contains the static files that can be used by the `index.html` file. |
| `src` | This contains all of the JavaScript code. |
| `src/example` | Contains a fully worked-out example that displays information about the repositories of the HackYourFuture organization. If no longer needed, this folder and its contents can be deleted. |
| `src/fetchers` | This folder contain functions that deal with fetching application data from specific urls for use by Page functions. |
| `src/lib` | This folder provides two ready-made library functions that you can use in your application. (See later.) |
| `src/pages` | This folder contains functions that create pages to be displayed in the UI, for instance a Home page, an About page etc. These Page functions contain the logic to handle user interactions and for fetching data from Web APIs.The creation and update of DOM elements are a delegated by the Page function to a companion View function. Page functions are called by the router when the page needs to be loaded into the DOM. |
| `src/views` | This folder contains functions used by Page functions to create and update DOM elements that belong to the page. To enable user interactions, a View function can add event listeners provided by the Page function to DOM elements. |
| `app.js` |  This file our initialization code. Generally this code should only run once and starts the application. |
| `constants.js` | This file contains constants for use throughout your application. |
| `data.js` | This file defines the initial application state (if needed) in an constant. |
| `.secrets.js` | This file can be used to define constants for secret API keys, etc. It is listed in `.gitignore` and will therefore not be included if you publish your repo on GitHub.
| `index.html` | The one and only HTML file for the application. It includes a `div` element that serves as the root element for our application. It also loads the `app.js` file using a `script` tag with the `type` set to `module` so that we can use ES6 `import` and `export` keywords to load additional modules.

#### Library function `fetchData()`

> _Throughout this README we will use the TypeScript syntax for presenting function definitions. This syntax is the same as you will see in VSCode Intellisense when you hover the mouse pointer over a function header._

```ts
// src/lib/fetchData.js
fetchData(url: string, options?: object) => Promise<any>
```

The provided library function fetches JSON data from the Web API specified by the `url` parameter. By providing an optional second parameter it can cache the response. Subsequent requests to the same `url` are served from the cache. This is particularly useful when using Web APIs that use request rate limiting.

## Advanced Application Architecture

**_You can use the provided folder structure to build an application without using any of the recommendations for application design described in this and the next sections. These recommendations are entirely optional._**

In the sections that follow we will outline architectural patterns and techniques that will help you to build a robust, maintainable Single Page Application using plain vanilla JavaScript, using concepts inspired by libraries/frameworks such as React and Angular.

> **Application Architecture Definition**
>
> _An application architecture describes the patterns and techniques used to design and build an application. The architecture gives you a roadmap and best practices to follow when building an application, so that you end up with a well-structured app.)_
>
> _Software design patterns can help you to build an application. A pattern describes a repeatable solution to a problem._
>
> Source: <https://www.redhat.com/en/topics/cloud-native-apps/what-is-an-application-architecture>

For this start repo we will outline patterns for standard Page and View functions, standard techniques for fetching data and handling events. We also introduce the concept of a client-side _router_, which allows the SPA to programmatically load different pages, by applying, and responding to, changes to the browser's `location` url.

### Page functions: `createXXXPage()`

A Page function represents an application page. It is called by the router when the page needs to be loaded into the DOM.

A Page function is responsible for handling all user interactions for this page and fetching any required data from external Web APIs. Preferably, it should delegate the creation and update of DOM elements to a companion View function. Page functions are called by the router when the associated page needs to be loaded into the DOM.

The function signature for a Page function is as follows:

```js
createXXXPage(state: object, params?: string[]) => { root: HTMLElement }
```

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `state`   | This object represents the global application state and is passed to the Page function by the router. |
| `params` | This optional string array contains any parameters encoded in the browser's location url. |

The name of a Page function should follow the naming convention **create**_XXX_**Page**, where _XXX_ is the name of the View. Example: `createAboutPage`.

The standard pattern for a Page function is as follows:

```js
import createSampleView from '../views/sampleView.js';

function createSamplePage(state) {
  const props = {
    // Add properties to be passed to the View function
  };
  const sampleView = createSampleView(props);

  // Place any code needed to initialize the page, e.g. to fetch data, here.

  // Return the object containing the root DOM element for this page to the
  // the router.
  return sampleView;
}

export default createSamplePage;
```

A Page function can pass event handlers to the View function through the `props` object. The View function can then add the event handler(s) to the intended DOM element by calling `.addEventListener()` on the element.

```js
// file: src/examples/pages/aboutPage.js
import { navigateTo } from '../../lib/hashRouter.js';
import createAboutView from '../views/aboutView.js';

function createAboutPage() {
  const props = { onClick: () => navigateTo('home') };
  return createAboutView(props);
}

export default createAboutPage;
```

### View functions: `createXXXView()`

```js
createXXXView(props?: object) => { root: HTMLElement, update?: Function }
```

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `props`   | On object with properties that hold values and/or event handlers function to be used for the View's DOM elements. |

View functions are used to create and update DOM elements in the service of corresponding Page functions. A View function can use application data and event handlers passed through the `props` parameter. It can respond to `state` updates by including an `update()` callback function in the object it returns.

The name of a View function should follow the naming convention **create**_XXX_**View**, where _XXX_ is the name of the View. Example: `createAboutView`.

A View function typically first creates a DOM element that forms the root element of the View. Then it add child elements to that root by using its `.innerHTML` property.

> Warning: You should not use `.innerHTML` for production applications. There are potential security issues with it's use. However, sine you are expected to soon switch to established libraries for building SPAs, e.g. React, this starter repo has decided to opt for the simplicity that `.innerHTML` for defining HTML structures.
>
> For more info on the security issues, see [Security considerations](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations) on the MDN web site.

Here is an example:

```js
// file: src/example/views/aboutView.js
function createAboutView(props) {
  const root = document.createElement('div');
  root.className = 'dialog-container centered';
  root.innerHTML = String.raw`
    <h1>Router Starter Application</h1>
    <p>This starter application implements and demonstrates a standard 
      application architecture, featuring a hash-based router. The architecture 
      includes the following:
    </p>
    <div class="button-container">
      <button type="button" id="btn-home">Home</button>
    </div>
  `;

  const homeButton = root.querySelector('#btn-home');
  homeButton.addEventListener('click', props.onClick);

  return { root };
}

export default createAboutView;
```

A View function should return an object that should include a property for its root element.

You can access child elements from the `root` element by calling `.querySelector()` on it, as is done in this example to add an event handler function passed a prop to the button.

#### The `update()` callback

A View function can return an optional `update()` callback function that for updating the view with changes in the state. Here is an example:

```js
// file: src/examples/views/filterView.js
function createFilterView(props) {
  const root = document.createElement('div');
  root.className = 'filter-view';
  root.innerHTML = String.raw`
    <div>Filter:</div>
    <input type="text" class="filter-input"/>
    <button type="button" id="btn-clear" disabled>Clear</button>
  `;

  const filterInput = root.querySelector('.filter-input');
  filterInput.addEventListener('input', props.onFilterInput);

  const btnClear = root.querySelector('#btn-clear');
  btnClear.addEventListener('click', props.onClearFilter);

  const update = (state) => {
    filterInput.value = state.filter || '';
    btnClear.disabled = !state.filter;
  };

  return { root, update };
}

export default createFilterView;
```

The generated UI looks roughly like this:

```text
 ┌─────────┬───────────────┐┌───────┐
 │ Filter: │               ││ Clear │
 └─────────┴───────────────┘└───────┘
```

The `update()` function is used here to update the value of input field and to disable this **Clear** button if the filter field is empty.

This View function is effectively called like this:

```js
// see files src/examples/pages/reposPage.js and src/examples/views/reposView.js
const props = {
  onFilterInput: (e) => {
    state.filter = e.target.value.trim().toLowerCase();
    reposView.update(state);
  },
  onClearFilter: () => {
    state.filter = '';
    reposView.update(state);
  },
};
//...
const reposView = createReposView(props);
```

The `input` is completely controlled by JavaScript code (in React this is called a _controlled component_). For instance, the `onFilterInput()` event handler ignore any leading and/or trailing spaces and convert any uppercase letters to lowercase.

#### Fetching data in a Page function

This is the an example of recommended practice for fetching data from a Web API inside a Page function.

```js
// file: src/examples/pages/repoDetailPage.js
function createRepoDetailPage(state, [owner, repoName]) {
  const props = {
    /* ... */
  };
  const repoView = createRepoDetailView(props);

  (async () => {
    state.error = null;
    state.loading = true;
    repoView.update(state);

    try {
      const { repo, contributors } = await fetchRepo(owner, repoName);
      state.repo = repo;
      state.contributors = contributors;
    } catch (err) {
      navigateTo('error');
      return;
    } finally {
      state.loading = false;
    }

    repoView.update(state);
  })();

  return repoView;
}

export default createRepoDetailPage;
```

Page functions are _not_ called asynchronously by the router. However, data fetches _must_ be done asynchronously. There the recommended practice is to use an async IIFE to fetch the data.

Before calling the async function that fetches the data we set the `.loading` property to `true` and the `.error` property to `null` (no error). We then call `.update()` on the View function which will typically show a spinner to indicate that we are loading data.

If the data is successfully fetched we want to hide the spinner and render the fetched data. Therefore we set `.loading` to false and call `.update()` on the View again to hide the spinner and render the data now in the `state` object.

If an error was encountered we handle it, in this case by navigating to an error page and returning from this Page function.

In the corresponding View function the `update()` callback function typically handles the loading and render phases as follows:

```js
// file: src/examples/views/repoDetailView.js
const update = (state) => {
  if (state.loading) {
    // Show the spinner
    loadingIndicator.root.hidden = false;
    return;
  }

  // Hide the spinner
  loadingIndicator.root.hidden = true;

  // Since we expect the Page function to redirect to another page in case of
  // an error, let's throw an error if we are called just the same.
  if (state.error) {
    throw new Error('Unexpected call to `update()`');
  }

  const { repo, contributors } = state;

  // Code that follows (omitted) renders the fetched data to the DOM.
};
```

or (optionally) from the `state` object passed passed to the optional `update()` callback function.

JS data into DOM elements. The optional `props` (short for'properties') is a JavaScript object that is used to pass data and callback functions (e.g., event handlers) to the View function.

View functions should return a JavaScript object with at minimum a `root` property that is a reference to the root element of the subtree returned by the function. An `update` callback function may also be included in the returned object. This function can be called by the Page function to update the View with new data.

## Router

The purpose of a (client-side) router in a Single Page Application is to let the client programmatically load different application 'pages' into the DOM., by manipulating the browser's location url. In a hash-based router, the specific page to load is determined by the `hash` fragment of the url. In a url, a hash fragment is the part that starts with a `#` mark. Everything following the `#` mark is considered part of the hash.

We can take advantage of the hash to specify the name of the page to load and can optional add parameters to pass to the page. It can be said that the url form part of the application state.

A hash-based router uses an event listener to listen for hash changes and responds by loading a matching page (see **Implementation** below).

Example of a hash with a page name and two parameters.

```text
#repo/HackYourFuture/UsingAPIs
```

This hash identifies a page named `repo` and two string parameters to be passed to the Page function: `"HackYourFuture"` and `"UsingAPIs"`.

## Benefits of a hash-based router

The hash fragment in a url is not considered part of the web address. The browser will only use the url parts preceding the hash when making an HTTP request to load an HTML page. In a Single Page Application using a hash-based router you can therefore do the following without the need for backend support:

- You can reload the browser and return to the same application page as specified by the hash. If the parameters required to fetch data are included in the hash then that data is fetched automatically too.
- You can bookmark an application url and return to the same page in the future.
- You can send the url to a friend who then lands on the expected application page.

### Implementation

The router is created in `app.js` by calling `createRouter()` and passing it a `routes` array of route objects.

```ts
// src/lib/hashRouter.js
createRouter(routes: Route[], routerOutlet: HTMLElement, state?: object) => void
```

This function creates a hash-based router. It takes the following arguments:

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `routes` | An array of route definitions.|
| `routerOutlet` | The DOM element into which pages should be loaded. |
| `state` |  An optional JavaScript object that represent the global application state. If none is provided an empty object will be used instead. |

Please see the section **Routing** below for more details.

```ts
// src/lib/hashRouter.js
navigateTo(pageName: string, ...args: any) => void
```

Encodes the page name and optional arguments into a string and assigns it to the browser's location hash. This will trigger hash change event that the router will pick up. Please see the section **Routing** below for more details.

Here is an examples `routes` array as used in this starter project:

```js
// file src/example/pages/routes.js
const routes = [
  { path: 'home', page: createHomePage, default: true },
  { path: 'about', page: createAboutPage },
  { path: 'repos', page: createReposPage },
  { path: 'repo', page: createRepoDetailPage },
  { path: 'error', page: createErrorPage },
];
```

The `path` property identifies the name of the page. The `page` property identifies the corresponding Page function that should be called. The optional `default` property identifies the page that should be loaded when the browser's url does not specify a hash. There should be only one route object with a `default` property.

The main code of the router is inside the function `createRouter()`. Below is a simplified part of the code that illustrates how the router works.

```js
const createRouter = (routes, routerOutlet, state = {}) => {
  //...
  window.addEventListener('hashchange', () => {
    // Search the routes table for the route corresponding to the path name.
    const route = findRouteByPathname(pathname);
    // Call the Page function to create the page.
    const { root } = route.page(state, ...params);
    // Mount the page in the DOM, removing any previous page.
    clearElement(routerOutlet);
    routerOutlet.appendChild(root);
  });
  //...
};
```

## Using this starter for your own project

1. Fork this repo and clone it on your computer.
2. In `src/constants.js`, change the `USE_EXAMPLE` boolean from `true` to `false`:

   ```js
   export const USE_EXAMPLE = false;
   ```

   This will instruct `apps.js` to load the page routes from the `src/pages` folder instead of `src/examples/pages`.

3. Load the application in your browser. You should now see the message from the Home Page: **It works!**.

4. Change the Home Page and View functions in the `src/pages` and `src/views` folders as required for your app.

5. Add further Page, View and helpers function as needed. Update the routes table in `src/page/routes.js` to add routes for the new pages.

6. If in doubt how to achieve some specific functionality, examine the `example` folder for possible approaches.
