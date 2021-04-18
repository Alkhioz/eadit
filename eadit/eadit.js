const getCurrentPath = () =>{
  let script = document.currentScript;
  let fullUrl = script.src;
  let path = fullUrl.replace("eadit.js","");
  return path;
}

const loadCss = (cssName) => {
  let path = getCurrentPath();
  const cssFile = document.createElement('link');
  cssFile.setAttribute('rel', 'stylesheet');
  cssFile.setAttribute('href', path+cssName);
  return cssFile;
}

const loadIcon = (iconName) =>{
  let path = getCurrentPath();
  return path+iconName;
}

const containerTemplate = document.createElement("template");
containerTemplate.innerHTML  = `
    <div  class="resizableContainer" contenteditable="false"></div>
  `;

const imageTemplate = document.createElement("template");
imageTemplate.innerHTML  = `
  <img src="" alt="" class="responsiveImage">
  `;

const videoTemplate = document.createElement("template");
videoTemplate.innerHTML  = `
    <div class="videoKeepRatio">
      <iframe class="responsiveVideo" src="" allowfullscreen></iframe>
      <div class="responsiveVideoOverlay"></div>
    </div>
    `;

const codeTemplate = document.createElement("template");
codeTemplate.innerHTML  = `
  <div class="codeContainer" contenteditable="false">
    <pre ><code style="pointer-events: none;"></code></pre>
    </div>
    `;

const addImageTemplate = document.createElement("template");
addImageTemplate.innerHTML  = `
  <h3>Add Image</h3>
  <label for="srcImage">Image url</label>
  <input type="text" name="srcImage" id="srcImage" required>
  <label for="altImage">Alt text</label>
  <input type="text" name="altImage" id="altImage">
  <input id="addImageSubmit" type="submit" value="Add Image">
  <input type="reset" value="Cancel" id="addImageCancelBtn">
  `;

const addVideoTemplate = document.createElement("template");
addVideoTemplate.innerHTML  = `
  <h3>Add Video</h3>
  <label for="srcVideo">Video url</label>
  <input type="text" name="srcVideo" id="srcVideo" required>
  <input id="addVideoSubmit" type="submit" value="Add Video">
  <input type="reset" value="Cancel" id="addVideoCancelBtn">
  `;

const addCodeTemplate = document.createElement("template");
addCodeTemplate.innerHTML  = `
  <h3>Add Code</h3>
  <label for="textCode">Code</label>
  <textarea id="textCode" name="textCode" rows="4" cols="50"></textarea>
  <label for="langCode">Languaje</label>
  <select id="langCode" name="lanCode">
    <option value="language-php">PHP</option>
    <option value="language-javascript">JAVASCRIPT</option>
    <option value="language-css">HTML</option>
    <option value="language-python">PYTHON</option>
    <option value="language-sql">SQL</option>
    <option value="language-java">JAVA</option>
    <option value="language-css">CSS</option>
  </select>
  <input id="addCodeSubmit" type="submit" value="Add Code">
  <input type="reset" value="Cancel" id="addCodeCancelBtn">
  `;

// Create a class for the element
class Eadit extends HTMLElement {
    get value(){
      let textAreaContent = this.shadowRoot.querySelector("#textarea").innerHTML;
      //textAreaContent = textAreaContent.replaceAll('"','&#34;')
      //textAreaContent = textAreaContent.replaceAll("'","&#39;")
      textAreaContent = textAreaContent.replaceAll('<div class="responsiveVideoOverlay"></div>', '');
      return textAreaContent;
    }
    set value(node){
      //node = node.replaceAll("'","&#39;")
      //node = node.replaceAll('"','&#34;')
      let nodeTemplate = document.createElement("template");
      nodeTemplate.innerHTML = node;
      let newNode = nodeTemplate.content.cloneNode(true)
      this.shadowRoot.querySelector("#textarea").appendChild(newNode);
    }
    constructor() {
      // Always call super first in constructor
      super();
  
      // Create a shadow root
      const shadow = this.attachShadow({mode: 'open'});

      let addImage = addImageTemplate.content.cloneNode(true);
      let imageForm = this._CreateForm("addImage", addImage);
      let imageModal = this._CreateModal("imageModal", imageForm);

      let addVideo = addVideoTemplate.content.cloneNode(true);
      let videoForm = this._CreateForm("addVideo", addVideo);
      let videoModal = this._CreateModal("videoModal", videoForm);

      let addCode = addCodeTemplate.content.cloneNode(true);
      let codeForm = this._CreateForm("addCode", addCode);
      let codeModal = this._CreateModal("codeModal", codeForm);
  
      let card = document.createElement("div");
      card.classList.add("card");
      card.id = "card"
      card.onclick = (e) =>{
        let event = e || window.event;
        let target = event.target || event.srcElement;
        this._checkResizable(target);
      }

      let topNavbar = document.createElement("div");
      topNavbar.classList.add("topnav");
      topNavbar.id = "myTopnav";

      topNavbar.appendChild(this._createNavbarBtn(loadIcon("icons/bold.svg"), "Bold", this._textToBold));
      topNavbar.appendChild(this._createNavbarBtn(loadIcon("icons/italic.svg"), "Italic", this._textToItalic));
      topNavbar.appendChild(this._createNavbarBtn(loadIcon("icons/underline.svg"), "Underline", this._textToUnderline));
      topNavbar.appendChild(this._createNavbarBtn(loadIcon("icons/image.svg"), "Image", () => {return this._openModal("imageModal")} ));
      topNavbar.appendChild(this._createNavbarBtn(loadIcon("icons/video.svg"), "Video", () => {return this._openModal("videoModal")}
      ));
      topNavbar.appendChild(this._createNavbarBtn(loadIcon("icons/code.svg"), "Code", () => {return this._openModal("codeModal")} ));
      topNavbar.appendChild(this._createNavbarBtn(loadIcon("icons/center.svg"), "Center", this._centerText));
      topNavbar.appendChild(this._createNavbarBtn(loadIcon("icons/justify.svg"), "Justify", this._justifyText));

      let textArea = document.createElement("div");
      textArea.classList.add("textarea");
      textArea.id = "textarea";
      textArea.contentEditable = "true";

      card.appendChild(topNavbar);
      card.appendChild(textArea);
      card.appendChild(imageModal);
      card.appendChild(codeModal);
      card.appendChild(videoModal);
      
      shadow.appendChild(loadCss('eadit.css'));
      shadow.appendChild(loadCss('external/prism/prism.css'));
      shadow.appendChild(card);

      this._assignCancelBtn("addImageCancelBtn", "imageModal");
      this._assignCancelBtn("addVideoCancelBtn", "videoModal");
      this._assignCancelBtn("addCodeCancelBtn", "codeModal");

      this._addEventToForm("imageModal", "addImage", this._onImageAdd, true);
      this._addEventToForm("videoModal", "addVideo", this._onVideoAdd, true);
      this._addEventToForm("codeModal", "addCode", this._onCodeAdd, false);

    }
    //variable
    activeNode; 

    //utils
    _openModal = (modalId)  => {
      this.shadowRoot.querySelector("#"+modalId).style.display = "block";
    }
    _closeModal = (modalId)  => {
      this.shadowRoot.querySelector("#"+modalId).style.display = "none";
    }
    _assignCancelBtn = (idBtn, idModal) => {
      let cancelBtn = this.shadowRoot.querySelector("#"+idBtn);
      cancelBtn.onclick = () => {
        this._closeModal(idModal);
      };
    }
    _appendToTextArea = (element, resizable) =>{
      if(resizable){
        element = this._createResizableContainer(element);
      }
      this.shadowRoot.querySelector("#textarea").appendChild(element);
    }
    _addEventToForm = (modalName,formId, element, resizable) => {
      let formElement = this.shadowRoot.querySelector("#"+formId);
      formElement.addEventListener('submit', (event)=>{
          event.preventDefault();
          this._appendToTextArea(element(formElement), resizable);
          this._closeModal(modalName);
          formElement.reset();
      });
    }
    _onImageAdd = (parent) =>{
      let imageSrc = parent.querySelector("#srcImage").value;
      let imageAlt = parent.querySelector("#altImage").value;
      let clone = imageTemplate.content.cloneNode(true);
      let image = clone.querySelector("img");
      image.src = imageSrc;
      image.alt = imageAlt;
      return clone;
    }
    _onVideoAdd = (parent) =>{
      let videoSrc = parent.querySelector("#srcVideo").value;
      let clone = videoTemplate.content.cloneNode(true);
      let video = clone.querySelector("iframe");
      video.src = videoSrc;
      return clone;
    }
    _onCodeAdd = (parent) =>{
      let codeText = parent.querySelector("#textCode").value;
      let codeOption = parent.querySelector("#langCode");
      let lanCode = codeOption.options[codeOption.selectedIndex].value;
      let clone = codeTemplate.content.cloneNode(true);
      let code = clone.querySelector("code");
      let pre = clone.querySelector("pre");
      codeText = codeText.replaceAll("<","&lt;");
      codeText = codeText.replaceAll(">","&gt;");
      codeText = codeText.replaceAll("'","&#39;")
      codeText = codeText.replaceAll('"','&#34;')
      code.innerHTML = codeText;
      code.classList.add(lanCode);
      pre.classList.add(lanCode);
      return clone;
    }
    _nodeFocus  = (target) =>  {
        if(this.activeNode){
            this._nodeLostFocus();
        }
        let resizableContainer = target.closest(".resizableContainer");
        let resizableContainerCurrentWidth = resizableContainer.offsetWidth+'px';
        resizableContainer.classList.add("resizableContainerResize");
        resizableContainer.classList.remove("resizableContainerFix");
        resizableContainer.style.width = resizableContainerCurrentWidth;
        resizableContainer.style.maxWidth = "100%";
        this.activeNode = resizableContainer;    
    }
    _nodeLostFocus = () => {
        let activeNodeCurrentWidth = this.activeNode.offsetWidth+'px';
        this.activeNode.classList.add("resizableContainerFix");
        this.activeNode.classList.remove("resizableContainerResize");
        this.activeNode.style.maxWidth = activeNodeCurrentWidth;
        this.activeNode.style.width = "100%";
        this.activeNode = false;  
    }
    _checkResizable = (target) => {
      if(target.classList.contains("responsiveImage") || target.classList.contains("responsiveVideoOverlay")  ){
          this._nodeFocus(target);
      }else{
          if(this.activeNode){
              this._nodeLostFocus();
          }
      }
    }
    //element creation
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
    _CreateModal = (identifier, element) =>{
      let modal = document.createElement("div");
      modal.classList.add(identifier);
      modal.id = identifier;
      modal.appendChild(element);
      return modal;
    }
    _CreateForm = (identifier, element) =>{
      let form = document.createElement("form");
      form.classList.add(identifier);
      form.id = identifier;
      form.appendChild(element);
      return form;
    }
    _createResizableContainer = (newChild) =>{
        let clone = containerTemplate.content.cloneNode(true);
        let resizableContainer = clone.querySelector(".resizableContainer");
        resizableContainer.appendChild(newChild);
        return clone;
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
  
customElements.define('eadit-input', Eadit);