class Story extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.copiedClassName = 'copied';
    this.timeout = 1000;
  }

  connectedCallback() {
    this.render();
    this.#bindEvents();
  }

  render() {
    const label = this.getAttribute('label');

    this.shadowRoot.innerHTML = /* html */ `
      <article class="Story">
        <header>
          ${label ? `<h2>${label}</h2>` : ''}
          <button type="button" class="ClipboardButton" aria-label="코드 복사" title="코드 복사"></button>
        </header>
        <div class="ComponentWrapper">
          <slot></slot>
        </div>
      </article>

      <style>
        :host .Story {
          margin-block-start: 24px;
          & > header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-block-end: 8px;
          }
        }
        
        :host h2 {
          margin-block: 0;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1;
          color: var(--metal-700);
        }

        :host .ClipboardButton {
          --icon-size: 16px;

          width: var(--icon-size);
          height: var(--icon-size);
          border: 0;
          border-radius: 4px;
          background: var(--white) url('/lookbook/assets/images/clipboard.svg') no-repeat center;

          &:hover {
            background-color: var(--metal-100);
          }

          &:focus {
            outline: none;
          }

          &:focus-visible {
            outline: 2px solid var(--metal-800);
            outline-offset: 1px;
          }

          &:active {
            background-image: url('/lookbook/assets/images/clipboard-copied.svg');
          }
        }

        :host-context([dark]) .ComponentWrapper {
          background-color: var(--metal-900);
        }

        :host .ComponentWrapper {
          cursor: pointer;
          position: relative;
          margin: 4px 0;
          border-radius: 6px;
          border: 1px solid var(--metal-200);
          padding: 1em;
          background-color: var(--white);
          line-height: 1;

          &::before {
            content: 'COPIED CODE';
            position: absolute;
            z-index: -1;
            display: grid;
            place-content: center;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0 0 0 / 5%);
            color: var(--metal-400);
            font-size: 12px;
            font-weight: 700;
            backdrop-filter: blur(2px);
          }

          &.copied::before {
            z-index: 1000;
          }
        }
      </style>
    `;
  }

  #bindEvents() {
    const context = this.shadowRoot;
    const story = context?.querySelector('.Story');
    const clipboardButton = story?.querySelector('.ClipboardButton');
    const componentWrapper = story?.querySelector('.ComponentWrapper');

    componentWrapper?.addEventListener('click', this.#handleCopyClipboard.bind(this, componentWrapper));
    clipboardButton.addEventListener('click', this.#handleCopyClipboard.bind(this, componentWrapper));
  }

  #handleCopyClipboard = async (target) => {
    const slot = this.shadowRoot?.querySelector('slot');
    const slotContents = slot?.assignedElements();

    const slotContentsHTML = slotContents?.reduce((slotContentsHTML, content) => {
      return slotContentsHTML += content.outerHTML;
    }, '');

    target.classList.add(this.copiedClassName);
    
    await navigator.clipboard.writeText(slotContentsHTML);
    setTimeout(() => {
      target.classList.remove(this.copiedClassName);
    }, this.timeout);
  };
}

customElements.define('y-story', Story);
