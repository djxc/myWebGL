学习webGL，lib为一些库函数
# 学习使用Three.js
---
1. 场景scene是三维里的容器，其包含：*相机*、*光源*、*物体*
---
1. 场景scene的基本操作：scene.add()*添加物体*、scene.remove()*移除物体*、scene.children()*列出场景中所有子对象*、scene.getChildByName()*根据物体的名称获得物体的引用*、scene.traverse((e)=>{})*循环场景中每个对象，进行操作*

# js原始没有模块化，因此如果要引入其他js文件，需要利用bable进行语法转化，将es6转换为低版本。可以利用webpack配置babel
- 1、webpack安装`npm install webpack webpack-cli --save-dev`，由于webpack只在开发阶段使用，因此添加为dev。
- 2、利用webpack打包，`npx webpack`，将src下的index.js文件打包输出到dist目录中
- 3、webpack默认支持模块化，每一个文件都是一个模块

