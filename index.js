import keyInput from './KeyInput.js'
import connect from './Connect.js'

// console.log("hi")
const ratio = window.innerWidth / window.innerHeight

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const light = new THREE.AmbientLight(0x404040)
const dLight = new THREE.DirectionalLight(0xffffff, 0.5)

light.add(dLight)
scene.add(light)

const loader = new THREE.TextureLoader()

const geometry = new THREE.BoxGeometry(50, 0.4, 50)
const material = new THREE.MeshPhongMaterial({ map: loader.load('resources/index.gif') })
const ground = new THREE.Mesh(geometry, material)

scene.add(ground)
camera.position.set(5, 15, 14)

// scene.add(box)

function animate () {
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  requestAnimationFrame(animate)
  if (keyInput.isPressed(38)) {
    camera.position.y += 0.05
    camera.position.x += 0.05
  }
  if (keyInput.isPressed(40)) {
    camera.position.y -= 0.05
    camera.position.x -= 0.05
  }
  camera.lookAt(ground.position)
  renderer.render(scene, camera)
}
animate()

let textures = []
for (let i = 1; i <= 20; i++) {
  textures.push('resources/' + i + '.png')
}
textures.forEach((t) => {
  const boxGeometry = new THREE.SphereGeometry(2, 32, 32)
  const boxMaterial = new THREE.MeshPhongMaterial({ map: loader.load(t) })
  const sphere = new THREE.Mesh(boxGeometry, boxMaterial)
  let x = Math.random() * 20
  let y = Math.random() * 20
  let z = Math.random() * 20
  sphere.position.set(x, y, z)
  scene.add(sphere)
})
connect.then((res) => {
  console.log('hi3')
  console.log('res: ' + res)

  let myTokenId = res.myTokenId
  console.log('myTokenId:' + myTokenId)
  console.log('supply:' + res.supply)

//   res.buildings.forEach((b, index) => {
//     if (index <= res.supply) {
//       const boxGeometry = new THREE.BoxGeometry(b.w, b.h, b.d)
//       const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
//       const box = new THREE.Mesh(boxGeometry, boxMaterial)
//       box.position.set(b.x, b.y, b.z)
//       scene.add(box)
//     console.log(b)
//     }
//   })
})

// renderer.render(scene,camera)
