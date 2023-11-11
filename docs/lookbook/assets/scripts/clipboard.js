const BUTTON = '.ClipboardButton';

const clipboardButtons = Array.from(document.querySelectorAll(BUTTON));

clipboardButtons.forEach((button) => {
  const header = button.parentElement;
  const componentWrapper = header?.nextElementSibling;

  componentWrapper?.addEventListener(
    'click',
    handleCopyClipboard.bind(null, componentWrapper)
  );
  button.addEventListener(
    'click',
    handleCopyClipboard.bind(null, componentWrapper)
  );
});

const COPIED_CLASSNAME = 'copied';
const TIMEOUT = 1000;

async function handleCopyClipboard(target) {
  target.classList.add(COPIED_CLASSNAME);
  await navigator.clipboard.writeText(target.innerHTML.trim());
  setTimeout(() => {
    target.classList.remove(COPIED_CLASSNAME);
  }, TIMEOUT);
}
