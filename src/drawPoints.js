/**
 * @FileDescription 绘制点
 * 利用webgl绘制点
 * @Author small dj
 * @Date 2020-11-25
 * @LastEditor small dj
 * @LastEditTime 2020-11-25 08:43
 */

import { initShaders } from './lib/cuon-utils';


/**
 * **创建着色器**  
 * 1、这里的着色器采用字符串的形式编写
 * @return string[]
 */
function createdShader() {
    // 定点着色器,包括顶点的位置以及顶点的大小
    var VSHADER_SOURCE =
        'attribute vec4 a_Position;\n' +
        'attribute float a_PointSize;\n' +
        'void main(){\n' +
        ' gl_Position = a_Position;\n' +
        ' gl_PointSize = a_PointSize;\n' +
        '}\n'
    // 片元着色器，颜色
    var FSHADER_SOURCE =
        'precision mediump float;\n' +
        'uniform vec4 u_FragColor;\n' +
        'void main() {\n' +
        ' gl_FragColor = u_FragColor;\n' +
        '}\n'
    return [VSHADER_SOURCE, FSHADER_SOURCE]
}
/**
 * **根据输入点的位置与大小绘制点**
 * @param {*} ctx webgl上下文
 * @param {float[]} point_position 点坐标
 * @param {float} point_size 点大小，浮点型
 */
function draw_point(ctx, point_position, point_size) {  
    // 获取着色器
    let [VSHADER_SOURCE, FSHADER_SOURCE] = createdShader()
    if (!initShaders(ctx, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders')
        return
    }
    var a_Position = ctx.getAttribLocation(ctx.program, 'a_Position');
    var a_PointSize = ctx.getAttribLocation(ctx.program, 'a_PointSize');
    var u_FragColor = ctx.getUniformLocation(ctx.program, 'u_FragColor');

    if (a_Position < 0 || a_PointSize < 0) {
        console.log("Failed to get the storage location of a_Position");
        return
    }
    ctx.vertexAttrib3f(a_Position, point_position[0], point_position[1], point_position[2]);
    ctx.vertexAttrib1f(a_PointSize, point_size);
    ctx.uniform4f(u_FragColor, 0.2, 0.5, 0.6, 0.78);
    // clearColor()
    ctx.drawArrays(ctx.POINTS, 0, 1)
}

/**
 * **手动绘制点**  
 * 1、首先注册canvas点击事件，获取点的点的坐标，然后触发绘制点函数
 * @param {*} canvas 
 * @param {*} ctx 
 */
export function manualDrawPoints(canvas, ctx) {
    canvas.onmousedown = function (ev) {
        // 鼠标点的位置
        let x = ev.clientX
        let y = ev.clientY
        // canvas画布的尺寸
        let rect = ev.target.getBoundingClientRect()
        let x_ = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
        let y_ = (rect.width / 2 - (y - rect.top)) / (canvas.width / 2);
        console.log("djxc", ev.target, x, y, rect, [x_, y_])
        draw_point(ctx, [x_, y_, 0.0], 5.0)
    }
}

/**
 * **在缓冲区内写入多个点**  
 * 1、创建缓冲区
 * 2、绑定缓冲区
 * 3、向缓冲区填写数据
 * 4、获取着色器中的变量
 * 5、给着色器变量赋值
 * @param {*} gl 
 * @return n 点的个数
 */
function initVertexBuffers(gl) {
    let vertices = new Float32Array([
        -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5
    ])
    console.log(vertices.length / 2);
    let n = vertices.length / 2;
    let vertexBuffer = gl.createBuffer();                                   // 创建缓冲区
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);                           // 绑定缓冲区到ARRAY_BUFFER
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);               // 向缓冲区写入数据(即为将数据写入ARRAY_BUFFER)
    
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');        // 获取着色器中的变量，然后将缓冲区分配给着色器变量
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');      // 获取着色器中的顶点大小变量
    // 如果获取着色器中的变量失败，给出提示
    if (a_PointSize < 0 || a_Position < 0) {
        console.log("Failed to get the storage location of a_Position or a_PointSize");
        return
    }

    gl.vertexAttrib1f(a_PointSize, 8.0);                                    // 给缓冲区的点大小变量赋值
    // 给缓冲区内的点数组赋值，2表示每个点个数据个数，这里为xy坐标，每个点只有两个数据
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);           
    gl.enableVertexAttribArray(a_Position);

    return n;
}

// webgl清空<canvas>的颜色
function clearColor(ctx) {
    ctx.clearColor(0.0, 1.0, 0.0, 0.8)
    ctx.clear(ctx.COLOR_BUFFER_BIT)
}

/**
 * **绘制不同图型**  
 * 1、创建图形的步骤为：  
 *     1) 获取webgl上下文  
 *     2) 创建着色器(着色器的创建与编译、program的创建与着色器的关联)  
 *     3) 清空画布  
 *     4) 采用drawArrays进行绘制，drawArray可以绘制不同的形状。   
 * 2、如果在着色器中没有规定图形的位置与颜色，而是通过js传送参数过去的，
 * 需要在webgl创建缓冲区，然后将js中声明的变量填充到该缓冲器，这一步涉及到js与显卡的数据传输会很耗时。
 * 尽量减少内存与显存的数据传输，提高程序运行速度。
 * @param {*} ctx 
 */
export function drawMultiPoints(ctx) {
    // 获取着色器
    let [VSHADER_SOURCE, FSHADER_SOURCE] = createdShader()
    // 初始化着色器，在webgl中创建program，将着色器程序加载并且编译，即可在显卡中运行
    if (!initShaders(ctx, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders')
        return
    }
    // 创建缓冲区并将js中的变量填充到该缓冲区中
    let n = initVertexBuffers(ctx)
    if (n < 0) {
        console.log("sorry to draw");
        return
    }
    // 获取着色器中的变量，为方便对其赋值
    var u_FragColor = ctx.getUniformLocation(ctx.program, 'u_FragColor');
    ctx.uniform4f(u_FragColor, 0.6, 0.5, 0.6, 0.78);

    clearColor(ctx)
    // 第一个参数为绘制的类型，这里为点；第二个参数为从第几个点开始绘制；第二个参数为为绘制点的个数
    // ctx.drawArrays(ctx.POINTS, 1, 1)
    // 绘制三角形，主要修改第一个参数，其主要取值为：POINTS(点)、TRIANGLES(三角形)、LINES(单独线)、LINES_STRIP(连接线)、LINE_LOOP(闭合线)
    // TRIANGLE_STRIP(连续三角形)
    ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, n)
}