import * as THREE from 'three';


const scene = new THREE.Scene();


// const bg = new THREE.TextureLoader().load('./images/bg.707b1e7c.jpg')
// scene.background = bg;

const cover = new THREE.BoxGeometry(0.1,2.5,2.5);
// const cover = new THREE.PlaneGeometry(6 * 10, 6 * 10)
const material = new THREE.MeshStandardMaterial({
     color: 'white',
    // color: 0xffffff,
    // roughness: 0.7,
    // metalness: 1
});
cover.translate(0.01,0,1.25)


const mesh = new THREE.Mesh(cover, material);
mesh.rotation.y = THREE.MathUtils.degToRad(90);
scene.add(mesh);

// const light = new THREE.PointLight(0xffffff, 100, 1000)
// light.position.set(0, 10, 10);
// scene.add(light);

var ambLight = new THREE.AmbientLight(0xffffff);
    ambLight.name = 'ambLight';
    ambLight.intensity = 0.72;
    scene.add(ambLight);

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.name = 'dirLight';
    dirLight.intensity = 0.28;
    dirLight.position.set(0, 5, 0.56);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.name = 'spotLight';
    spotLight.intensity = 0.12;
    spotLight.position.set(0, 0, 25);

    scene.add(spotLight);
    scene.add(dirLight);

const camera = new THREE.PerspectiveCamera(36,window.innerWidth/window.innerHeight, 0.01, 15);
camera.position.z = 8;
scene.add(camera);

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);


// Animation parameters
const targetRotationY = THREE.MathUtils.degToRad(180); // Target Y rotation (in this case, 180 degrees)
const rotationSpeed = 0.05; // Rotation speed in radians per frame
let currentRotationY = 0;


function animate() {
    // Update rotation
    mesh.rotation.y -= rotationSpeed;
    currentRotationY += rotationSpeed;

    // Keep one edge fixed
    const axis = new THREE.Vector3(0, 1, 0); // Rotate around Y axis
    const point = new THREE.Vector3(0, 0, 0); // Fixed point

    mesh.position.sub(point); // Translate to the rotation axis origin
    mesh.position.applyAxisAngle(axis, rotationSpeed); // Apply rotation
    mesh.position.add(point); // Translate back to the original position

    // Render scene
    renderer.render(scene, camera);

    if (currentRotationY >= targetRotationY) {
        console.log('helo')
        d(); // Make the mesh invisible
        return; // Stop the animation
    }

    // Request the next frame
    requestAnimationFrame(animate);
}

function d() {
    console.log('hello')
    mesh.visible = false
}

// Start the animation
animate();
// mesh.visible = false
makeCover();

function makeCover() {
    const bookCover = new THREE.PlaneGeometry(2.5, 2.5);
    const bookMaterial = new THREE.MeshStandardMaterial({
        color: 'red',
    })
    const bookCoverMesh = new THREE.Mesh(bookCover, bookMaterial);

    scene.add(bookCoverMesh);

    bookCoverMesh.position.set(-1.25,0,0);

    const backCover = new THREE.PlaneGeometry(2.5,2.5);
    const backMaterial = new THREE.MeshStandardMaterial({
        color: 'red',
    })
    const back = new THREE.Mesh(backCover, backMaterial);

    scene.add(back);

    back.position.set(1.25,0,0);

    animateBook(bookCoverMesh, back)
}

function animateBook(bookCoverMesh, back){
    
}


