// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Colors for the Rubik's Cube faces
const colors = [
    0xffffff, // white
    0xff0000, // red
    0x0000ff, // blue
    0x00ff00, // green
    0xffff00, // yellow
    0xffa500  // orange
];

// Function to randomly assign a color to a face
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to create a smaller cube with random colored faces
function createCube(x, y, z) {
    const materials = [
        new THREE.MeshBasicMaterial({ color: getRandomColor() }), // right face
        new THREE.MeshBasicMaterial({ color: getRandomColor() }), // left face
        new THREE.MeshBasicMaterial({ color: getRandomColor() }), // top face
        new THREE.MeshBasicMaterial({ color: getRandomColor() }), // bottom face
        new THREE.MeshBasicMaterial({ color: getRandomColor() }), // front face
        new THREE.MeshBasicMaterial({ color: getRandomColor() }), // back face
    ];

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(x, y, z);

    return cube;
}

// Create the 3x3x3 Rubik's Cube
const rubiksCube = new THREE.Group();

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const smallCube = createCube(x, y, z);
            rubiksCube.add(smallCube);
        }
    }
}

scene.add(rubiksCube);
camera.position.z = 5;

// Rotation variables
let rotateSpeed = 0.01;
let rotateX = 0;
let rotateY = 0;

// Mouse event listeners
document.addEventListener('mousemove', (event) => {
    rotateX = (event.clientY / window.innerHeight) - 0.5;
    rotateY = (event.clientX / window.innerWidth) - 0.5;
});

// Animate the cube
function animate() {
    requestAnimationFrame(animate);

    // Slow rotation
    rubiksCube.rotation.x += rotateSpeed + rotateX * 0.05;
    rubiksCube.rotation.y += rotateSpeed + rotateY * 0.05;

    renderer.render(scene, camera);
}

animate();
