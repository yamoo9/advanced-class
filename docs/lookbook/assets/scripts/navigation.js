const {body} = document;

body.style.setProperty('display', 'none');

body.insertAdjacentHTML(
  'afterbegin',
  `<nav class="GlobalNavigation" lang="en">
    <ul>
      <li><a href="/" aria-label="홈" title="홈">HOME</a></li>
      <li><a href="/lookbook" aria-label="룩북" title="룩북">LOOKBOOK</a></li>
    </ul>
  </nav>`
);

if (location.pathname.includes('lookbook')) {
  document.querySelector('.GlobalNavigation a[href="/lookbook"]')?.classList.add('active');
} else {
  document.querySelector('.GlobalNavigation a[href="/"]')?.classList.add('active');
}

body.style.removeProperty('display');