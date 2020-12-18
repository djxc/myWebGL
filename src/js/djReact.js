import React, {useState} from '../react/dReact'
import DReactDom, { reRender } from '../react/render';

function Home() {
    const [name, setName] = useState("dj");
    return (
        <div>
            <h2>this is home, {name}</h2>
            <button onClick={showTime}>主页</button>
        </div>
    )

    function showTime() {
        // 修改state，重新渲染。state需要为全局变量
        setName("djxc")
        // let root = document.getElementById("root");
        // reRender("", root)
        // createButton()
    }
}

export function createButton() {   
    let root = document.getElementById("root");
    let btn = <div id="reactDIV">
        name
        <Home></Home>
    </div>
    DReactDom.renderer(btn, root);
   
}