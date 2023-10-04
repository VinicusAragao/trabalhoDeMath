import * as THREE from 'three'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';


class Coisa{
	constructor(canvas,geometry){
		this.defaultBackground = new THREE.Color('#acbe94')
		this.hoverBackground = new THREE.Color('#72855a')
		
		this.scene = new THREE.Scene
		this.scene.background = this.defaultBackground
		
		this.renderer = new THREE.WebGLRenderer({canvas,antialias:true})
		
		this.camera = new THREE.PerspectiveCamera(90,this.renderer.domElement.width/this.renderer.domElement.height, 0.1, 1000)	
		this.camera.position.set(0,0,10)

		this.mesh = new THREE.Mesh(geometry,Coisa.material)
		this.mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry),Coisa.lineMaterial))
		this.scene.add(this.mesh)

		this.control = new OrbitControls(this.camera,canvas)
		this.control.enableDamping = true
		this.control.autoRotate = true
		this.control.enablePan = false
		this.control.enableZoom = false
		this.control.target = this.mesh.position
		
		canvas.addEventListener('pointerenter',()=>{
			this.scene.background = this.hoverBackground
		})
		canvas.addEventListener('pointerleave',()=>{
			this.scene.background = this.defaultBackground
		})
		coisas.push(this)
	}
	static material = new THREE.MeshBasicMaterial({color: 0x190c7a})
	static lineMaterial = new THREE.LineBasicMaterial({color:0xffffff})
}

const coisas = []

// new Coisa(document.querySelector('.prism'))
new Coisa(document.querySelector('.pyramid'), new THREE.TetrahedronGeometry(7))
new Coisa(document.querySelector('.cylinder'), new THREE.CylinderGeometry(4,4,7))
new Coisa(document.querySelector('.cone'), new THREE.ConeGeometry(4,10))
new Coisa(document.querySelector('.sphere'), new THREE.SphereGeometry(6))

function animate(){
	for(const coisa of coisas){
		coisa.control.update()
		coisa.renderer.render(coisa.scene,coisa.camera)
	}
	requestAnimationFrame(animate)
}

function resize(){
	for(const coisa of coisas){
		const style = getComputedStyle(coisa.renderer.domElement)
		coisa.renderer.setSize(parseInt(style.width),parseInt(style.height))
	}
}

const buttons = document.querySelectorAll('button')
const inputs = document.querySelectorAll('input')
const resolutions = document.querySelectorAll('.resolution')
const correctAnswers = [
	192,
	213.33,
	120,
	256,
	100
]

for(let i = 0; i< buttons.length;i++){
	const button = buttons[i]
	const resolution = resolutions[i]
	const input = inputs[i]

	button.wasPressed = false
	button.addEventListener('pointerdown',() => {
		if(!button.wasPressed){
			resolution.style.transform = 'scale(1)'
			resolution.style.opacity = '1'		
			button.textContent = 'Ocultar Resposta'
			button.wasPressed = true
		}
		else if(button.wasPressed){
			resolution.style.transform = 'scale(0)'	
			resolution.style.opacity = '0'		
			button.textContent = 'Revelar Resposta'
			button.wasPressed = false
		}
	})
	input.correctAnswer = correctAnswers[i]
	input.addEventListener('change',() => {
		const answer = Number(input.value)
		if(answer === input.correctAnswer){
			input.classList.add('correct')
		}
		else{
			input.classList.remove('correct')
		}
	})

}



window.addEventListener('resize',resize)
resize()
animate()
