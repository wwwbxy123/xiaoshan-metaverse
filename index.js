import keyInput from './KeyInput.js'
import connect from './Connect.js'
import texture from './Textures.js'

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

const geometry = new THREE.BoxGeometry(80, 0.4, 80)
const material = new THREE.MeshPhongMaterial({ map: loader.load('resources/map.jpg') })
const ground = new THREE.Mesh(geometry, material)

scene.add(ground)
camera.position.set(5, 15, 14)

// scene.add(box)

function animate1 () {
  requestAnimationFrame(animate1)
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
animate1()

// let textures = []
// for (let i = 1; i <= 20; i++) {
//   textures.push('resources/' + i + '.png')
// }
// textures.forEach((t) => {
//   const boxGeometry = new THREE.SphereGeometry(2, 32, 32)
//   const boxMaterial = new THREE.MeshPhongMaterial({ map: loader.load('https://gateway.pinata.cloud/ipfs/QmXTAWNyvC3eSXVeGP7eZbfLXN2h8cKMMwVKKXtuSan2pp/1.png') })
//   const sphere = new THREE.Mesh(boxGeometry, boxMaterial)
//   let x = Math.random() * 20
//   let y = Math.random() * 20
//   let z = Math.random() * 20
//   sphere.position.set(x, y, z)
//   scene.add(sphere)
// })

connect.then((res) => {
  console.log('hi3')
  console.log('res: ' + res)

  let myTokenId = res.myTokenId
  console.log('myTokenId:' + myTokenId)
  console.log('supply:' + res.supply)

  let baseUrl = 'https://gateway.pinata.cloud/ipfs/QmXTAWNyvC3eSXVeGP7eZbfLXN2h8cKMMwVKKXtuSan2pp/'

  let time = 0
  res.myTokenId.forEach((b, index) => {
    console.log(b)
    let url = baseUrl + b + '.png'
    console.log('url: ' + url)
    setTimeout(function () {
      // if (index <= res.supply) {
      const geometry = new THREE.SphereGeometry(2, 32, 32)
      const material = new THREE.MeshPhongMaterial({ map: loader.load(url) })
      const sphere = new THREE.Mesh(geometry, material)
      let x = Math.random() * 30 - 15
      let y = Math.random() * 20
      let z = Math.random() * 30 - 15
      sphere.position.set(x, y, z)
      scene.add(sphere)
      
      let speed = (Math.random() - 0.5) * 0.04
      function animate () {
        sphere.rotation.x += speed
        sphere.rotation.y += speed
        requestAnimationFrame(animate)

        camera.lookAt(ground.position)
        renderer.render(scene, camera)
      }
      animate()
    }, time)
    time += 10
  // }
  })
})

function sleep (ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// texture.then((uris) => {
//   let textures = uris.uris
//   console.log(textures)
//   textures.forEach((uri) => {
//     console.log('uri:' + uri)
//   })
// })

// renderer.render(scene,camera)
