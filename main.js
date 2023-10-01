import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild( renderer.domElement )

const material = new THREE.MeshBasicMaterial({color: 0x333333})

const cone = new THREE.Mesh(new THREE.ConeGeometry(5,10),material)
const cube = new THREE.Mesh(new THREE.CylinderGeometry(5,5,10),material)
const pyramid = new THREE.Mesh(new THREE.TetrahedronGeometry(10),material)
const sphere = new THREE.Mesh(new THREE.SphereGeometry(10),material)

camera.position.set(0,0,20)
scene.add(cone,cube,pyramid,sphere)

for(let i = 0; i < scene.children.length;i++){
	const obj = scene.children[i]
	obj.position.set(i*20-20,0,0)
	const edges = new THREE.EdgesGeometry(obj.geometry)
	obj.add(new THREE.LineSegments(edges,new THREE.LineBasicMaterial({color:0xff0000})))
}

function animate(){

	for(const obj of scene.children){
		obj.rotation.x += 0.1
		obj.rotation.y += 0.1
		// obj.rotation.z += 0.1
	}

	renderer.render(scene,camera)
	requestAnimationFrame(animate)
}
animate()
