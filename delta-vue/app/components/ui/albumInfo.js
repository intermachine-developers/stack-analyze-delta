class AlbumInfo extends HTMLElement {
	constructor() {
		super();
		this.img;
		this.name;
		this.type;
		this.artist;
		this.content;
	}
	
	static get observedAttributes() {
		return ['img', 'name', 'type', 'artist', 'content'];
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = newValue;
  }
  
  connectedCallback() {
  	// shadow root
  	const shadowRoot = this.attachShadow({ mode: "closed" });
  	
  	// main elements
  	const styles = document.createElement('style');
  	styles.textContent = `
  		.album {
  			max-height: 40rem;
  			background-color: var(--background-glass);
  			box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.47 );
  			backdrop-filter: blur(20px);
  			border-radius: 3%;
  			border: 1px solid rgba( 255, 255, 255, 0.18 );
  		}
  		
  		img {
  			max-width: 100%;
  			filter: drop-shadow(0 0 0.55rem var(--image-shadow));
  		}
  		
  		p {
  			padding: 10px;
  		}
  	`;
  	
  	const album = document.createElement('article');
  	album.classList.add('album');
  	
  	// header elements
  	const albumHeader = document.createElement('figure');
  	const albumImage = document.createElement('img');
  	albumImage.src = this.img;
  	albumImage.alt = this.name;
  	
  	const albumTitle = document.createElement('figcaption');
  	albumTitle.textContent = `${this.name} - ${this.artist}`;
  	
  	albumHeader.append(albumImage, albumTitle);
  	
  	// content
  	const albumContent = document.createElement('p');
  	albumContent.innerHTML = `
  	record type: ${this.type} <br/>
  	content: ${this.content}
  	`;
  	
  	album.append(albumHeader, albumContent);
  	shadowRoot.append(styles, album);
  }
}

customElements.define('album-info', AlbumInfo);
