/**
 * **渲染函数，将虚拟dom转换为真实的dom**
 * @param {*} vdom 
 * @param {*} root 
 */
function dRender(vdom, root) {
    let { tag, attribute, children } = vdom
    console.log(tag, attribute, children);

    let vnode = document.createElement(tag);
    for (let name in attribute) {
        vnode.setAttribute(name, attribute[name])            
    }
    for (let child of children) {
        console.log(typeof child);
        // 遍历子节点数组，如果是字符串需要将其赋值给vnode的innerHTML
        if (typeof child === "string") {
            vnode.innerHTML = child
        }   
        // 如果是对象则为一个元素需要将其添加到vnode节点中，因此需要调用dRender方法
        if (typeof child === "object") {
            dRender(child, vnode)
        }
    }
    
    root.appendChild(vnode)
}

let  DReactDom = {
    renderer(vdom, root) {
        dRender(vdom, root)
    }
}

export default DReactDom
