const loadCss = (cssName) => {
  let script = document.currentScript;
  let fullUrl = script.src;
  let path = fullUrl.replace("katsu-editor.js","");
  const cssFile = document.createElement('link');
  cssFile.setAttribute('rel', 'stylesheet');
  cssFile.setAttribute('href', path+cssName);
  return cssFile;
}

const containerTemplate = document.createElement("template");
containerTemplate.innerHTML  = `
    <div  class="resizableContainer" contenteditable="false"></div>
  `;

// Create a class for the element
class Katsu extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // Create a shadow root
      const shadow = this.attachShadow({mode: 'open'});
  
      let card = document.createElement("div");
      card.classList.add("card");
      card.id = "card"

      let topNavbar = document.createElement("div");
      topNavbar.classList.add("topnav");
      topNavbar.id = "myTopnav";

      topNavbar.appendChild(this._createNavbarBtn("./assets/icons/bold.svg", "Bold", this._textToBold));
      topNavbar.appendChild(this._createNavbarBtn("./assets/icons/italic.svg", "Italic", this._textToItalic));
      topNavbar.appendChild(this._createNavbarBtn("./assets/icons/underline.svg", "Underline", this._textToUnderline));
      topNavbar.appendChild(this._createNavbarBtn("./assets/icons/image.svg", "Image", this._textToBold));
      topNavbar.appendChild(this._createNavbarBtn("./assets/icons/video.svg", "Video", this._textToBold));
      topNavbar.appendChild(this._createNavbarBtn("./assets/icons/code.svg", "Code", this._textToBold));
      topNavbar.appendChild(this._createNavbarBtn("./assets/icons/center.svg", "Center", this._centerText));
      topNavbar.appendChild(this._createNavbarBtn("./assets/icons/justify.svg", "Justify", this._justifyText));

      let textArea = document.createElement("div");
      textArea.classList.add("textarea");
      textArea.id = "textarea";
      textArea.contentEditable = "true";

      card.appendChild(topNavbar);
      card.appendChild(textArea);

      shadow.appendChild(loadCss('katsu-editor.css'));
      shadow.appendChild(card);
    }

    _createIcon = (iconSrc, iconTitle) =>{
      let icon = document.createElement("img");
      icon.src = iconSrc;
      icon.classList.add("navBarIcon");
      icon.title = iconTitle;
      return icon;
    }
    
    _createNavbarBtn = (iconSrc, iconTitle, action) => {
      let navbarBtn = document.createElement("A");
      navbarBtn.classList.add("navBarBtn");
      navbarBtn.href = "javascript:void(0);";
      navbarBtn.appendChild( this._createIcon(iconSrc, iconTitle));
      navbarBtn.onclick = () => action();
      return navbarBtn;
    }
    //actions
    _textToBold = () =>{
      document.execCommand('bold');
      this.shadowRoot.querySelector("#textarea").focus();
    }
    _textToItalic = () =>{
      document.execCommand('italic');
      this.shadowRoot.querySelector("#textarea").focus();
    }
    _textToUnderline = () =>{
      document.execCommand('underline');
      this.shadowRoot.querySelector("#textarea").focus();
    }
    _centerText = () =>{
      document.execCommand('justifyCenter');
      this.shadowRoot.querySelector("#textarea").focus();
    }
    _justifyText = () =>{
      document.execCommand('justifyFull');
      this.shadowRoot.querySelector("#textarea").focus();
    }

  }
  
customElements.define('katsu-editor', Katsu); //katsu es escarabajo en kichwa