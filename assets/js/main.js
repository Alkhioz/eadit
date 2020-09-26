//let sizea4w = String(document.body.clientHeight * 0.7069555302166476)+'px';
//document.getElementById("card").style.width = sizea4w;


let size = String(document.body.clientHeight - 20)+'px';
let bar_size = String(document.body.clientHeight - 20 - document.getElementById("myTopnav").clientHeight - 50)+'px';
document.getElementById("container").style.height = size;
document.getElementById("card").style.height = size;
document.getElementById("textarea").style.height = bar_size;
function negrita() {
  document.execCommand('bold');
  document.getElementById("textarea").focus();
}
function italica() {
  document.execCommand('italic');
  document.getElementById("textarea").focus();
}
function subrayado() {
  document.execCommand('underline');
  document.getElementById("textarea").focus();
}
function imagen() {
  document.getElementById('file-input').click();
}
document.getElementById('file-input').onchange = e => { 

   // getting a hold of the file reference
   var file = e.target.files[0]; 

   // setting up the reader
   var reader = new FileReader();
   reader.readAsDataURL(file,'UTF-8');

   // here we tell the reader what to do when it's done reading...
   reader.onload = readerEvent => {
      var content = readerEvent.target.result; // this is the content!
      document.execCommand('insertImage', false, content);
      document.getElementById("textarea").focus();
   }

}
function centrar() {
  document.execCommand('justifyCenter');
  document.getElementById("textarea").focus();
}
function justificar() {
  document.execCommand('justifyFull');
  document.getElementById("textarea").focus();
}