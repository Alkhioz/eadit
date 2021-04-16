var image_form = document.querySelector("#addImage");
var activeNode;

let imageIsFocus  = (target) =>  {
    let resizableContainer = target.parentElement;
    let resizableContainerCurrentWidth = resizableContainer.offsetWidth+'px';
    resizableContainer.style.resize = "horizontal";
    resizableContainer.style.overflow = "auto";
    resizableContainer.style.maxWidth = "100%";
    resizableContainer.style.width = resizableContainerCurrentWidth;
    resizableContainer.style.border = "5px solid #1e91d9";
    let resizableContainerControl =  resizableContainer.querySelector("div");
    resizableContainerControl.style.display = "block";
    activeNode = resizableContainer;    
}

let imageLostFocus = () => {
    let activeNodeCurrentWidth = activeNode.offsetWidth+'px';
    activeNode.style.resize = "none";
    activeNode.style.overflow = "visible";
    activeNode.style.width = "100%";
    activeNode.style.maxWidth = activeNodeCurrentWidth;
    activeNode.style.border = "none";
    let activeNodeControl =  activeNode.querySelector("div");
    activeNodeControl.style.display = "none";
    activeNode = false;  
}

window.onclick = function(e) {
    let event = e || window.event;
    let target = event.target || event.srcElement;
    if(target.classList.contains("resposiveImage")){
        imageIsFocus(target);
    }else{
        if(activeNode){
            imageLostFocus();
        }
        
    }
}

if(document.contains(image_form)){
    image_form.addEventListener('submit', ()=>{

        event.preventDefault();
        let imageSrc = document.querySelector("#srcImage").value;
        let imageAlt = document.querySelector("#altImage").value;
        console.log(imageSrc+" "+imageAlt);
        let templateImageToInsert = document.querySelector("#imageTemplate");
        let clone = templateImageToInsert.content.cloneNode(true);
        let image = clone.querySelector("img");
        image.src = imageSrc;
        image.alt = imageAlt;
        document.querySelector("body").appendChild(clone);

    });
}