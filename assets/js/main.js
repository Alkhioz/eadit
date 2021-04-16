var image_form = document.querySelector("#addImage");
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

    if(target.classList.contains("responsiveImage") || target.classList.contains("responsiveVideoOverlay")){
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
    document.querySelector("body").appendChild(clone);
}

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
    });
}

//video
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
    });
}
