includeJS = (file) => {   
    let script  = document.createElement('script'); 
    script.src  = file; 
    script.type = 'text/javascript'; 
    script.defer = true;
    document.getElementsByTagName('body').item(0).appendChild(script); 
}
/*includeCSS = (file) => {   
  let link  = document.createElement('link');
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = file;
  link.media = 'all';
  document.getElementsByTagName('head').item(0).appendChild(link); 
}  */
includeJS('./assets/components/katsu-editor/katsu-editor.js');
//includeCSS('./assets/components/katsu-editor/katsu-editor.css');