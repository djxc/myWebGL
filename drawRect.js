
var ctx

function main() {
	var canvas = document.getElementById('example')
	if (!canvas) {
		console.log('Failed to retrieve the <canvas> element')
		return
	}
	//ctx = canvas.getContext('2d')
	ctx = getWebGLContext(canvas)
	if (!ctx) {
		console.log('Failed to get the rendering context for WebGL')
		return
	}
}

// 绘制一个矩形
function drawR() {
	ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'
	ctx.fillRect(120, 10, 150, 150)
}

// 清空<canvas>的颜色
function clearColor(){
	ctx.clearColor(0.0, 0.0, 0.0, 1.0)	
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
