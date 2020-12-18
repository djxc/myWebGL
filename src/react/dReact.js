import DReactDom from "./render"

let React = {
    // babel将元素转换为元素标签、属性以及子节点对象三部分
    createElement(tag, attribute, ...children) {
        return {tag, attribute, children}
    }
}
/**
 * **定义state**  
 * 1、传入初始化的state值  
 * 2、返回state的变量以及修改该变量的函数
 */
export function useState(stateValue) {   
    let state = stateValue
    let changeState = function (newStateValue) {
        console.log("修改状态 ", newStateValue);
        // 重新渲染
        console.log("重新渲染");  
        DReactDom.reRender()
    }
    return [state, changeState]
}

export default React