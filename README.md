学习webGL，lib为一些库函数
# 学习使用Three.js
---
1. 场景scene是三维里的容器，其包含：*相机*、*光源*、*物体*
---
1. 场景scene的基本操作：scene.add()*添加物体*、scene.remove()*移除物体*、scene.children()*列出场景中所有子对象*、scene.getChildByName()*根据物体的名称获得物体的引用*、scene.traverse((e)=>{})*循环场景中每个对象，进行操作*

# webgl
- 1、js向webgl传值，1) 首先创建着色器程序，2) 然后在js中获取着色器中定义的变量，3) 然后向着色器变量填写具体值，4) 最后通过`drawArrays`绘制点。这种方式只能每次绘制一个点，如果需要绘制多个点需要遍历获取，因此效率低。
- 2、采用缓冲区对象绘制图形，可以一次性向着色器传入多个顶点数据。

# js原始没有模块化，因此如果要引入其他js文件，需要利用bable进行语法转化，将es6转换为低版本。可以利用webpack配置babel
- 1、webpack安装`npm install webpack webpack-cli --save-dev`，由于webpack只在开发阶段使用，因此添加为dev。
- 2、利用webpack(静态模块打包工具)打包，`npx webpack`，将src下的index.js文件打包输出到dist目录中
- 3、webpack默认支持模块化，每一个文件都是一个模块
- 4、配置webpack,在根目录下创建webpack.config.js文件，在其中配置webpack(入口文件、输出目录等配置)，运行时`npx webpack --config webpack.config.js`
- 5、bable可以将 ES6 的代码转化为 ES5，以及可以解析jsx语法(实际通过react进行解析jsx)。首先安装bable，以及bable的加载器：`@babel/core,@babel/preset-env, @babel/preset-react,babel-loader`，在webpack中配置js、ts、jsx或tsx结尾的采用babel-loader处理；最后在根目录下添加babel的配置文件。babel解析jsx文件，将元素转换为元素名称、属性对象以及子节点三部分，通过这三部分虚拟dom，通过虚拟dom可以构建真实dom。babel只是生成了虚拟dom，生成真实的dom交给react进行实现。
- 6、在项目中引用typescript，首先安装typescript:`npm install typescript`,然后安装`ts-loader`,告诉webpack对ts文件需要采用ts-loader进行处理，需要修改webpack.config.js文件。还需要在根目录下创建tsconfig.json文件
- 7、安装webpack-dev-server,进行热启动，运行项目改为`npx webpack serve --config webpack.config.js`,热启动时打包的js文件在电脑的内存中保存，因此可以实时更新。


