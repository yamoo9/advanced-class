import debounce from './debounce.js';

let data = [];

const componentListNav = document.querySelector('.ComponentList');
const componentList = componentListNav.querySelector('ul');
const searchComponentBar = document.querySelector('.SearchComponentBar');
const searchInput = searchComponentBar?.querySelector('input');

main();

function main() {
  makeComponentListData();
  renderComponentList();
  searchInput?.addEventListener('input', debounce(filterSearchedComponentList));
  document.addEventListener('keyup', handleBindShortcut);
}

function handleBindShortcut(e) {
  if (e.key === '/' && document.activeElement !== searchInput) {
    searchInput?.focus();
  }
}

function makeComponentListData() {
  const links = Array.from(componentList.querySelectorAll('a'));
  const listData = links.reduce((data, link) => {
    data.push({
      href: `./components/${link.href.split('/').reverse()[0]}`,
      text: link.textContent,
    });
    return data;
  }, []);

  data = listData;
}

function filterSearchedComponentList(e) {
  const search = e.target.value.trim();
  renderComponentList(search);
}

function renderComponentList(search) {
  let filteredData = [...data];

  if (search) {
    filteredData = data.filter((item) => {
      let keyward = search.toLowerCase();
      return item.href.includes(keyward) || item.text.includes(keyward);
    });
  }

  if (filteredData.length === 0) {
    componentList.innerHTML = `
      <li>⚠️ 검색에 매칭되는 컴포넌트가 없습니다.</li>
    `;
    return;
  }

  const listContents = filteredData
    .map(
      (item) => `
        <li>
          <a href="${item.href}">${item.text}</a>
        </li>
      `
    )
    .join('')
    .trim('');

  componentList.innerHTML = listContents;
}
