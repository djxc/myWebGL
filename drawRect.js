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
	
	
}

/**
 * **测试canvas**
 */
function testCanvas(canvas) {
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
	ctx = getWebGLContext(canvas)
	if (!ctx) {
		console.log('Failed to get the rendering context for WebGL')
		return
	}
	clearColor()
}

// 利用canvas绘制一个矩形
function drawR(ctx) {
	ctx.fillStyle = 'rgba(100, 100, 255, 0.3)'
	ctx.fillRect(120, 10, 150, 150)
}

// webgl清空<canvas>的颜色
function clearColor(){
	ctx.clearColor(0.0, 1.0, 0.0, 0.2)	
	ctx.clear(ctx.COLOR_BUFFER_BIT)
}

function drawPoint() {
	// 定点着色器
	var VSHADER_SOURCE = 
		'void main(){\n' +
		' gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + 
		' gl_PointSize = 10.0;\n' + 
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
	clearColor()
	ctx.drawArrays(ctx.POINTS, 0, 1)
}
