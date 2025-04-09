
import * as THREE from 'three';

// Create a simple architectural wireframe model
export const createWireframeModel = (container) => {
  if (!container) return null;
  
  // Setup
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  // Scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true 
  });
  
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Add wireframe cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000000 })
  );
  scene.add(line);
  
  // Camera position
  camera.position.z = 5;
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    
    line.rotation.x += 0.005;
    line.rotation.y += 0.005;
    
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Handle resize
  const handleResize = () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    container.removeChild(renderer.domElement);
    scene.remove(line);
    geometry.dispose();
    edges.dispose();
    line.material.dispose();
  };
};

// Create architecture grid
export const createArchitectureGrid = (container) => {
  if (!container) return null;
  
  // Setup
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  // Scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true 
  });
  
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Create grid
  const gridSize = 10;
  const gridDivisions = 10;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
  gridHelper.material.opacity = 0.2;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);
  
  // Add minimal architectural element
  const geometry = new THREE.BoxGeometry(1, 2, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 1;
  scene.add(cube);
  
  // Camera position
  camera.position.set(4, 3, 4);
  camera.lookAt(0, 0, 0);
  
  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    
    gridHelper.rotation.y += 0.002;
    cube.rotation.y += 0.005;
    
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Handle resize
  const handleResize = () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    container.removeChild(renderer.domElement);
    scene.remove(gridHelper);
    scene.remove(cube);
    geometry.dispose();
    material.dispose();
  };
};

// Create floating particles
export const createParticleField = (container) => {
  if (!container) return null;
  
  // Setup
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  // Scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true 
  });
  
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Create particles
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 100;
  
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
  }
  
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x000000,
    size: 0.05
  });
  
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
  
  // Camera position
  camera.position.z = 5;
  
  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    
    particles.rotation.y += 0.002;
    
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Handle resize
  const handleResize = () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    container.removeChild(renderer.domElement);
    scene.remove(particles);
    particleGeometry.dispose();
    particleMaterial.dispose();
  };
};
