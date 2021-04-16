var image_form = document.querySelector("#addImage");
var activeNode;

//https://codepen.io/ZeroX-DG/pen/vjdoYe

let imageIsFocus  = (target) =>  {
    let resizableContainer = target.parentElement;
    let resizableContainerCurrentWidth = resizableContainer.offsetWidth+'px';
    resizableContainer.classList.add("resizableContainerResize");
    resizableContainer.classList.remove("resizableContainerFix");
    resizableContainer.style.width = resizableContainerCurrentWidth;
    resizableContainer.style.maxWidth = "100%";
    activeNode = resizableContainer;    
}

let imageLostFocus = () => {
    let activeNodeCurrentWidth = activeNode.offsetWidth+'px';
    activeNode.classList.add("resizableContainerFix");
    activeNode.classList.remove("resizableContainerResize");
    activeNode.style.maxWidth = activeNodeCurrentWidth;
    activeNode = false;  
}

window.onclick = function(e) {
    let event = e || window.event;
    let target = event.target || event.srcElement;
    if(target.classList.contains("resposiveImage")){
        console.log("meek");
        imageIsFocus(target);
    }else{
        if(activeNode){
            console.log("mook");
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