var stats = initState()
var scene = new THREE.Scene()
var camera = initCamera()
var renderer = initRender()
// 添加坐标轴
var axes = new THREE.AxesHelper(20)
scene.add(axes)
var spotLight = addSpotLight(scene)
var plane = addPlane(scene)
var cube = addCube(scene)
var sphere = addSphere(scene)
// scene.fog = new THREE.Fog(0xffffff, 0.015, 100)
var webgl = document.getElementById('webgl')

webgl.append(renderer.domElement)
console.log(THREE.REVISION)
var step = 0

var controlJump = {
    speed: 0.02
}



addEvent()

addControl(controlJump)

renderScene()
console.log(scene.children)     // 输出场景中所有的子对象
/** 定义渲染函数，持续渲染，当浏览器跳转到其他页面时则不进行渲染 */
function renderScene() {
    step += controlJump.speed
    sphere.position.x = -5 + (8 * Math.cos(step))
    sphere.position.y = 4 + (8 * Math.abs(Math.sin(step)))
    cube.rotation.x += 0.02

    
    stats.update()
    requestAnimationFrame(renderScene)      // 调用本身
    renderer.render(scene, camera);
}

/** 创建检测动画运动的帧数 */
function initState() {
    var stats = new Stats()
    stats.setMode(0)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'
    document.getElementById('state').append(stats.domElement)
    return stats
}

/** 添加灯光 */
function addSpotLight(scene) {
    // 添加灯光以及阴影
    var spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(10, 10, 2)
    spotLight.castShadow = true
    scene.add(spotLight)
    return spotLight
}

/** 添加一个平面 */
function addPlane(scene) {
    /** 创建一个平面 */
    var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1)
    // var planeMaterial = new THREE.MeshBasicMaterial({color:0xEEEEEE})
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xEEEEEE })
    var plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0
    plane.receiveShadow = true  // 接收阴影
    scene.add(plane)
    return plane
}

/** 创建一个三维几何：1、创建几何；2、创建材质；3、创建mesh对象，几何以及材质作为参数；4、将mesh添加到场景中 */
function addCube(scene) {
    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });      // , wireframe: true
    var cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true  // 产生阴影
    cube.receiveShadow = true  // 接收阴影
    scene.add(cube);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    cube.position.y = 1
    return cube
}

/** 添加一个球体 */
function addSphere(scene) {
    var sphereGeometry = new THREE.SphereGeometry(3, 20, 20)
    var sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.x = -5
    sphere.position.y = 4
    sphere.castShadow = true
    scene.add(sphere)
    return sphere
}

/** 使用dat.gui创建控制变量的面板 */
function addControl(controlJump) {
    var gui = new dat.GUI()
    gui.add(controlJump, 'speed', 0.01, 0.05)
}

/** 初始化camera */
function initCamera() {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.x = 15
    camera.position.y = 10
    camera.position.z = 40
    return camera
}

/** 初始化渲染render */
function initRender() {
    var renderer = new THREE.WebGLRenderer()
    // renderer.setClearColor(0xEEEEEE)     // 设置背景颜色
    renderer.setSize(window.innerWidth - 20, window.innerHeight - 20)
    renderer.shadowMap.enabled = true
    return renderer
}

/** 添加鼠标点击上弹事件 */
function addEvent() {
    document.body.style.cursor = "grab";
    var isMove = false
    var isMiddleMove = false
    webgl.onmousedown = function (event) {
        switch (event.buttons) {
            case 1:
                isMove = !isMove
                document.body.style.cursor = "grabbing";
                break
            case 4:
                isMiddleMove = true
                break
            default:
                break
        }
    }

    /** 使用webgl.onmouseup()函数没有响应，因此使用addEventListener会触发鼠标弹起事件 */
    webgl.addEventListener('mouseup', (evt) => {
        isMove = false
        isMiddleMove = false
        document.body.style.cursor = "grab";
    })

    var theta = 0
    webgl.onmousemove = function (e) {
        if (isMove) {
            document.body.style.cursor = "grabbing";
            camera.position.x -= e.movementX * 0.06
            camera.position.y += e.movementY * 0.06
        }
        if (isMiddleMove) {
            theta += e.movementX * 0.01
            camera.rotation.y = theta;
            camera.position.set(10 * Math.sin(theta), 2, 20 * Math.cos(theta));        
        }
    }

    webgl.addEventListener('mousewheel', (evt) => {
        camera.position.z -= evt.wheelDelta * 0.02
    })
}