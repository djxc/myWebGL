import React from '../react/dReact'
import DReactDom from '../react/render';
export function createButton() {
    let button = document.createElement("button")
    button.innerHTML = "dianji";
    
    let root = document.getElementById("root");
    root.appendChild(button);
    let btn = <div id="reactDIV">
        name
        <button id="btn">dj</button> 
    </div>
    console.log(btn);
    DReactDom.renderer(btn, root);
}