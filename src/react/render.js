/**
 * **渲染函数，将虚拟dom转换为真实的dom**
 * @param {*} vdom 
 * @param {*} root 
 */
function dRender(vdom, root) {
    let { tag, attribute, children } = vdom
    let vnode = document.createElement("div")

    // 如果标签是一个函数，则是函数式组件,则函数返回值为虚拟dom，递归调用dRender
    if (typeof tag === "function") {
        dRender(tag(), root)
    } else {
        // 如果tag不是一个函数，则直接将其转换为真实的dom
        vnode = document.createElement(tag);
        for (let name in attribute) {
            switch (typeof attribute[name]) {
                case "string":
                    vnode.setAttribute(name, attribute[name])
                    break
                // 如果虚拟dom的属性值是function需要,将事件添加到元素上
                case "function":
                    let eventType = "click";
                    switch (name) {
                        case "onClick":
                            eventType = "click"
                            break
                    }
                    vnode.addEventListener(eventType, attribute[name])
                    break

            }
        }
        for (let child of children) {
            // 遍历子节点数组，如果是字符串需要将其赋值给vnode的innerHTML
            if (typeof child === "string") {
                vnode.innerHTML += child
            }
            // 如果子节点是对象则为一个元素需要将其添加到vnode节点中，因此需要调用dRender方法
            if (typeof child === "object") {
                dRender(child, vnode)
            }
        }
    }
    // 将虚拟dom生成的dom添加到根节点上
    root.appendChild(vnode)
}

/**
 * **重新渲染**  
 * 1、修改了state需要进行重新渲染
 * 2、先将根节点清空，然后重新根据虚拟dom生成节点
 */
export function reRender(vdom, root) {
    // 获取 div 标签下的所有子节点
    var pObjs = root.childNodes;
    for (var i = pObjs.length - 1; i >= 0; i--) { // 一定要倒序，正序是删不干净的，可自行尝试
        root.removeChild(pObjs[i]);
    }
    dRender(vdom, root)
}

let root = null
let vdom = null
let DReactDom = {
    renderer(vdom_, root_) {
        root = root_
        vdom = vdom_
        dRender(vdom, root_)
    },
    reRender() {
        reRender(vdom, root)
    }
}

export default DReactDom
