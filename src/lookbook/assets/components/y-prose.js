class Prose extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const headline = this.getAttribute('headline');

    this.shadowRoot.innerHTML = /* html */ `
      <section class="Prose">
        ${headline ? `<h1>${headline}</h1>` : ''}
        <slot></slot>
      </section>

      <style>
        :host .Prose {
          margin: 20px;
        }

        :host h1 { 
          margin-block-end: 1rem;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.5;
          color: var(--metal-800);
        }
      </style>
    `;
  }
}

customElements.define('y-prose', Prose);
