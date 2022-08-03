const linkList = [
  {
    url: '../home/index.html',
    text: 'tech stack'
  },
  {
    url: '../hardware/index.html',
    text: 'hardware information'
  },
  {
    url: '../password/index.html',
    text: 'password generator'
  },
  {
    url: '../cdn-services/index.html',
    text: 'cdnjs links'
  },
  {
    url: '../music/index.html',
    text: 'lyrics finder'
  },
  {
    url: '../digimon/index.html',
    text: 'digimon cards'
  },
];

class DeltaNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // shadow dom
    const shadowRoot = this.attachShadow({ mode: "open" });

    // styles
    const styles = document.createElement('style');

    styles.textContent = `
      .navbar {
        margin: 8px;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1em;
        background-color: var(--background-glass);
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.47 );
        backdrop-filter: blur(20px);
        border-radius: 20px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
      }

      .brand {
        display: block;
        height: 64px;
      }

      .menu-btn, .menu {
        margin-left: auto;
      }

      .menu {
        list-style: none;
      }

      .menu-item {
        display: inline-block;
        font-weight: bold;
      }

      .menu-item:nth-child(odd) {
        margin-inline: 4px;
      }

      .menu-btn {
        display: none;
        height: 26px;
        width: 26px;
        cursor: pointer;
      }

      .link {
        text-decoration: none;
        transition: text-decoration 250ms;
        color: var(--light);
      }

      .link-active {
        background-color: var(--light);
        color: var(--dark);
      }

      @media(hover: hover) {
        .link:hover {
          padding-bottom: 2px;
          color: var(--dark);
          text-decoration: underline var(--dark);
        }

        .link-active:hover {
          background-color: var(--dark);
          color: var(--light);
          text-decoration: underline var(--light);
        }
      }
    `;

    // elements
    const navElement = document.createElement('nav');
    navElement.classList.add('navbar');

    const menuElement = document.createElement('menu');
    menuElement.classList.add('menu');

    const brandLogo = document.createElement('img');
    brandLogo.src = '../logo.png';
    brandLogo.alt = 'delta logo';

    // append links
    linkList.forEach(link => {
      const menuItem = document.createElement('li');
      menuItem.classList.add('menu-item');

      const menuLink = document.createElement('a');
      menuLink.href = link.url;
      menuLink.textContent = link.text;
      menuLink.classList.add('link');

      const path = link.url.substring(2, link.url.length);
      // console.log(path);

      if(location.pathname.indexOf(path) !== -1) {
        menuLink.classList.add('link-active');
      }

      menuItem.append(menuLink);
      menuElement.append(menuItem);
    });

    navElement.append(brandLogo, menuElement);
    shadowRoot.append(styles, navElement);
  }
}

customElements.define('delta-navbar', DeltaNavbar);
