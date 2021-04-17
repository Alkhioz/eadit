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

const createIcon = (iconSrc, iconTitle) =>{
  let icon = document.createElement("img");
  icon.src = iconSrc;
  icon.classList.add("navBarIcon");
  icon.title = iconTitle;
  return icon;
}

const createNavbarBtn = (iconSrc, iconTitle, action) => {
  let navbarBtn = document.createElement("A");
  navbarBtn.classList.add("navBarBtn");
  navbarBtn.href = "javascript:void(0);";
  navbarBtn.appendChild(createIcon(iconSrc, iconTitle));
  navbarBtn.onclick = () => action();
  return navbarBtn;
}

const textToBold = () =>{
  console.log("negrita");
}

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

      topNavbar.appendChild(createNavbarBtn("./assets/icons/bold.svg", "Bold", textToBold));
      topNavbar.appendChild(createNavbarBtn("./assets/icons/italic.svg", "Italic", textToBold));
      topNavbar.appendChild(createNavbarBtn("./assets/icons/underline.svg", "Underline", textToBold));
      topNavbar.appendChild(createNavbarBtn("./assets/icons/image.svg", "Image", textToBold));
      topNavbar.appendChild(createNavbarBtn("./assets/icons/video.svg", "Video", textToBold));
      topNavbar.appendChild(createNavbarBtn("./assets/icons/code.svg", "Code", textToBold));
      topNavbar.appendChild(createNavbarBtn("./assets/icons/center.svg", "Center", textToBold));
      topNavbar.appendChild(createNavbarBtn("./assets/icons/justify.svg", "Justify", textToBold));

      let textArea = document.createElement("div");
      textArea.classList.add("textarea");
      textArea.id = "textarea";
      textArea.contentEditable = "true";

      card.appendChild(topNavbar);
      card.appendChild(textArea);

      shadow.appendChild(loadCss('katsu-editor.css'));
      shadow.appendChild(card);
    }
  }
  
customElements.define('katsu-editor', Katsu); //katsu es escarabajo en kichwa