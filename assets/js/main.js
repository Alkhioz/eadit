var image_form = document.querySelector("#addImage");
var activeNode;

let nodeFocus  = (target) =>  {
    let resizableContainer = target.parentElement;
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
    if(target.classList.contains("responsiveImage")){
        nodeFocus(target);
    }else{
        if(activeNode){
            nodeLostFocus();
        }
        
    }
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
        document.querySelector("body").appendChild(clone);

    });
}

//video
var video_form = document.querySelector("#addVideo");
var activeVideoNode;

if(document.contains(video_form)){
    video_form.addEventListener('submit', ()=>{

        event.preventDefault();
        let videoSrc = document.querySelector("#srcVideo").value;
        
            let templateVideoToInsertIframe = document.querySelector("#videoTemplate");
            let clone = templateVideoToInsertIframe.content.cloneNode(true);
            let video = clone.querySelector("iframe");
            video.src = videoSrc;
            document.querySelector("body").appendChild(clone);
        

    });
}
