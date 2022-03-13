//@ts-check
import { createElement } from '../lib/domHelpers.js';

function createContributorListView(props) {
  const root = createElement('section', {
    class: 'contributors-container whiteframe',
  });

  root.appendChild(
    createElement('div', {
      text: 'Contributions',
      class: 'contributor-header',
    })
  );

  const ul = createElement('ul', {
    class: 'contributor-list',
  });
  root.appendChild(ul);

  props.contributors.forEach((contributor) => {
    const li = createElement('li');
    ul.appendChild(li);

    const a = createElement('a', {
      href: contributor.html_url,
      class: 'contributor-item',
      target: '_blank',
    });
    li.appendChild(a);

    a.appendChild(
      createElement('img', {
        src: contributor.avatar_url,
        alt: `avatar for ${contributor.login}`,
        class: 'contributor-avatar',
      })
    );

    const div = createElement('div', { class: 'contributor-data' });
    a.appendChild(div);

    div.appendChild(createElement('div', { text: contributor.login }));
    div.appendChild(
      createElement('div', {
        text: contributor.contributions,
        class: 'contributor-badge',
      })
    );
  });

  return { root };
}

export default createContributorListView;
