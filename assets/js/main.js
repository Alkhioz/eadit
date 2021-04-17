var activeNode;

let nodeFocus  = (target) =>  {
    if(activeNode){
        nodeLostFocus();
    }
    let resizableContainer = target.closest(".resizableContainer");
    let resizableContainerCurrentWidth = resizableContainer.offsetWidth+'px';
    resizableContainer.classList.add("resizableContainerResize");
    resizableContainer.classList.remove("resizableContainerFix");
    resizableContainer.style.width = resizableContainerCurrentWidth;
    resizableContainer.style.maxWidth = "100%";
    activeNode = resizableContainer;    
}

let nodeLostFocus = () => {
    let activeNodeCurrentWidth = activeNode.offsetWidth+'px';
    activeNode.classList.add("resizableContainerFix");
    activeNode.classList.remove("resizableContainerResize");
    activeNode.style.maxWidth = activeNodeCurrentWidth;
    activeNode.style.width = "100%";
    activeNode = false;  
}

window.onclick = function(e) {
    let event = e || window.event;
    let target = event.target || event.srcElement;

    if(target.classList.contains("responsiveImage") || target.classList.contains("responsiveVideoOverlay")  ){
        nodeFocus(target);
    }else{
        if(activeNode){
            nodeLostFocus();
        }
        
    }
}

let createResizableContainer = (newChild) =>{
    let templateContainer = document.querySelector("#containerTemplate");
    let clone = templateContainer.content.cloneNode(true);
    let resizableContainer = clone.querySelector(".resizableContainer");
    resizableContainer.appendChild(newChild);
    document.querySelector("#textarea").appendChild(clone);
}

var image_form = document.querySelector("#addImage");

if(document.contains(image_form)){
    image_form.addEventListener('submit', ()=>{
        event.preventDefault();
        let imageSrc = document.querySelector("#srcImage").value;
        let imageAlt = document.querySelector("#altImage").value;
        let templateImageToInsert = document.querySelector("#imageTemplate");
        let clone = templateImageToInsert.content.cloneNode(true);
        let image = clone.querySelector("img");
        image.src = imageSrc;
        image.alt = imageAlt;
        createResizableContainer(clone);
        closeModal("#imageModal");
        image_form.reset();
    });
}


var video_form = document.querySelector("#addVideo");

if(document.contains(video_form)){
    video_form.addEventListener('submit', ()=>{
        event.preventDefault();
        let videoSrc = document.querySelector("#srcVideo").value;
        let templateVideoToInsertIframe = document.querySelector("#videoTemplate");
        let clone = templateVideoToInsertIframe.content.cloneNode(true);
        let video = clone.querySelector("iframe");
        video.src = videoSrc;
        createResizableContainer(clone);
        closeModal("#videoModal");
        video_form.reset();
    });
}

var code_form = document.querySelector("#addCode");

if(document.contains(code_form)){
    code_form.addEventListener('submit', ()=>{
        event.preventDefault();
        let codeText = document.querySelector("#textCode").value;
        let codeOption = document.querySelector("#langCode");
        let lanCode = codeOption.options[codeOption.selectedIndex].value;
        let templateCodeToInsert = document.querySelector("#codeTemplate");
        let clone = templateCodeToInsert.content.cloneNode(true);
        let code = clone.querySelector("code");
        let pre = clone.querySelector("pre");
        code.innerHTML = codeText;
        code.classList.add(lanCode);
        pre.classList.add(lanCode);
        document.querySelector("#textarea").appendChild(clone);
        closeModal("#codeModal");
        code_form.reset();
        Prism.highlightAll()
    });
}

/* Modal Logic */

let openModal = (modalId)  => {
    document.querySelector(modalId).style.display = "block";
}
let closeModal = (modalId)  => {
    document.querySelector(modalId).style.display = "none";
}


let assignCancelBtn = (idBtn, idModal) => {
    let cancelBtn = document.querySelector(idBtn);
   
    if(document.contains(cancelBtn)){
        cancelBtn.onclick = function () {
            closeModal(idModal);
        };
    }
}

assignCancelBtn("#addImageCancelBtn", "#imageModal");
assignCancelBtn("#addVideoCancelBtn", "#videoModal");
assignCancelBtn("#addCodeCancelBtn", "#codeModal");


/*OLD */

let size = String(document.body.clientHeight - 20)+'px';
let bar_size = String(document.body.clientHeight - 20 - document.querySelector("#myTopnav").clientHeight - 50)+'px';
document.querySelector("#container").style.height = size;
document.querySelector("#card").style.height = size;
document.querySelector("#textarea").style.height = bar_size;

function negrita() {
  document.execCommand('bold');
  document.querySelector("#textarea").focus();
}
function italica() {
  document.execCommand('italic');
  document.querySelector("#textarea").focus();
}
function subrayado() {
  document.execCommand('underline');
  document.querySelector("#textarea").focus();
}
function imagen() {
  openModal("#imageModal");
}
function video() {
    openModal("#videoModal");
}
function codigo() {
    openModal("#codeModal");
}
function centrar() {
  document.execCommand('justifyCenter');
  document.querySelector("#textarea").focus();
}

function justificar() {
  document.execCommand('justifyFull');
  document.querySelector("#textarea").focus();
}