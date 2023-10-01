import * as THREE from 'three'

const scenes = []
// scenes.push(new THREE.Scene)
scenes.push(new THREE.Scene)
scenes.push(new THREE.Scene)
scenes.push(new THREE.Scene)
scenes.push(new THREE.Scene)
for(const scene of scenes){
	scene.background = new THREE.Color('#acbe94')
}

const renderes = []
// renderes.push(new THREE.WebGLRenderer({canvas: document.querySelector('.prism')}))
renderes.push(new THREE.WebGLRenderer({canvas: document.querySelector('.pyramid'),antialias:true}))
renderes.push(new THREE.WebGLRenderer({canvas: document.querySelector('.cylinder'),antialias:true}))
renderes.push(new THREE.WebGLRenderer({canvas: document.querySelector('.cone'),antialias:true}))
renderes.push(new THREE.WebGLRenderer({canvas: document.querySelector('.sphere'),antialias:true}))
resize()

const material = new THREE.MeshBasicMaterial({color: 0x132222})
const lineMaterial = new THREE.LineBasicMaterial({color:0xffffff})

const meshs = []
// meshs.push(prismMesh)
meshs.push(new THREE.Mesh(new THREE.TetrahedronGeometry(7),material))
meshs.push(new THREE.Mesh(new THREE.CylinderGeometry(4,4,7),material))
meshs.push(new THREE.Mesh(new THREE.ConeGeometry(5,5),material))
meshs.push(new THREE.Mesh(new THREE.SphereGeometry(6),material))
for(const mesh of meshs){
	mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry),lineMaterial))
}

const camera = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.set(0,0,10)
for(let i = 0; i < scenes.length;i++){
	scenes[i].add(meshs[i])
}

function animate(){
	for(let i = 0; i < scenes.length;i++){
		scenes[i].children[0].rotation.x += 0.005
		scenes[i].children[0].rotation.y += 0.01
		renderes[i].render(scenes[i],camera)
	}
	requestAnimationFrame(animate)
}
animate()



function resize(){
	for(const renderer of renderes){
		const style = getComputedStyle(renderer.domElement)
		renderer.setSize(parseInt(style.width),parseInt(style.height))
	}
}
window.addEventListener('resize',resize)
