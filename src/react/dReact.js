let React = {
    // babel将元素转换为元素标签、属性以及子节点对象三部分
    createElement(tag, attribute, ...children) {
        return {tag, attribute, children}      
    }
}

export default React