import { manualDrawPoints, drawMultiPoints } from './drawPoints';
import { getWebGLContext, initShaders } from './lib/cuon-utils';



/**
 * @FileDescription 学习webgl
 * webgl利用canvas作为基础绘制三维图型，没有webgl，canvas只能绘制二维图形；
 * webgl利用canvas可以绘制三维图形
 * @Author small dj
 * @Date 2020-11-21
 * @LastEditor small dj
 * @LastEditTime 2020-11-21 11:12
 */

var ctx;		// 定义画布上下文的全局变量
main()

/**
 * **在html中利用h5新特性canvas绘制图像**  
 * 1、canvas可以动态绘制图像
 * 2、具体步骤为：1) 获取canvas元素;2) 获取canvas的上下文; 3) 在上下文中绘制图像
 */
function main() {
    // 获取canvas元素，检查其是否存在
    var canvas = document.getElementById('example')
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element')
        return
    }
    testWebGL(canvas)
    // testCanvas(canvas)
}

/**
 * **测试canvas**
 */
function testCanvas(canvas) {
    // 获取上下文，在上下文中绘制二维图形
    ctx = canvas.getContext('2d')
    if (!ctx) {
        console.log('Failed to get the rendering context for WebGL')
        return
    }
    drawR(ctx)
}

/**
 * **测试webgl**
 */
function testWebGL(canvas) {
    // 获取上下文，在上下文中绘制三维图形，这里采用包装好的函数
    ctx = getWebGLContext(canvas)
    if (!ctx) {
        console.log('Failed to get the rendering context for WebGL')
        return
    }
    // clearColor()
    // drawPoint2(ctx)
    // manualDrawPoints(canvas, ctx)
    drawMultiPoints(ctx)
}

// 利用canvas绘制一个矩形
function drawR(ctx) {
    ctx.fillStyle = 'rgba(100, 100, 255, 0.3)'
    ctx.fillRect(120, 10, 150, 150)
}

/**
 * **webgl清空<canvas>的颜色**  
 * 1、首先指定背景色  
 * 2、清空颜色缓冲区，然后canvas中显示即为设定的背景色
 */
function clearColor() {
    ctx.clearColor(0.0, 1.0, 0.0, 0.2)
    ctx.clear(ctx.COLOR_BUFFER_BIT)
}

/**
 * **绘制点**  
 * 1、webgl图形绘制依赖着色器机制，因此需要先创建着色器。着色器语言类似于c语言
 * 1、顶点着色器与片元着色器；点的绘制在着色器中操作
 * @param {webgl上下文} ctx 
 */
function drawPoint(ctx) {
    // 定点着色器，在程序中规定了点的位置以及点的大小。
    var VSHADER_SOURCE =
        'void main(){\n' +
        ' gl_Position = vec4(0.5, 0.0, 0.0, 1.0);\n' +
        ' gl_PointSize = 10.0;\n' +
        '}\n'
    // 片元着色器，在程序中规定了点的颜色
    var FSHADER_SOURCE =
        'void main() {\n' +
        ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
        '}\n'
    // 初始化着色器
    if (!initShaders(ctx, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders')
        return
    }
    // 清空颜色
    clearColor()
    // 绘制新的图形
    ctx.drawArrays(ctx.POINTS, 0, 1)
}

/**
 * **通过js设置着色器的参数**
 */
function drawPoint2(ctx) {
    // 定点着色器
    var VSHADER_SOURCE =
        'attribute vec4 a_Position;\n' +
        'attribute float a_PointSize;\n' +
        'void main(){\n' +
        ' gl_Position = a_Position;\n' +
        ' gl_PointSize = a_PointSize;\n' +
        '}\n'
    // 片元着色器
    var FSHADER_SOURCE =
        'void main() {\n' +
        ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
        '}\n'
    if (!initShaders(ctx, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders')
        return
    }
    var a_Position = ctx.getAttribLocation(ctx.program, 'a_Position');
    var a_PointSize = ctx.getAttribLocation(ctx.program, 'a_PointSize');
    if (a_Position < 0 || a_PointSize < 0) {
        console.log("Failed to get the storage location of a_Position");
        return
    }
    ctx.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    ctx.vertexAttrib1f(a_PointSize, 20.0);
    clearColor()
    ctx.drawArrays(ctx.POINTS, 0, 1)
}

