
import * as THREE from 'three';

// Create advanced architecture grid for hero section
export const createArchitectureGrid = (container: HTMLDivElement) => {
  if (!container) return () => {};
  
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  
  // Create larger grid with perspective
  const gridSize = 20;
  const gridDivisions = 20;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x000000, 0x222222);
  gridHelper.material.opacity = 0.15;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);
  
  // Add architectural elements
  const buildingElements = [];
  
  // Function to create a building block
  const createBuildingBlock = (width: number, height: number, depth: number, x: number, y: number, z: number) => {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 })
    );
    line.position.set(x, y, z);
    scene.add(line);
    buildingElements.push(line);
    return line;
  };
  
  // Create various building structures
  const mainTower = createBuildingBlock(2, 5, 2, 0, 2.5, 0);
  
  const wing1 = createBuildingBlock(4, 1.5, 1.5, 3, 0.75, 0);
  const wing2 = createBuildingBlock(1.5, 1.5, 4, 0, 0.75, 3);
  const wing3 = createBuildingBlock(1, 2, 1, -2, 1, -2);
  
  // Add floating planes to represent floors/spaces
  const planeGeometry = new THREE.PlaneGeometry(8, 8);
  const planeMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x000000, 
    transparent: true, 
    opacity: 0.05,
    side: THREE.DoubleSide
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -0.01;
  scene.add(plane);
  buildingElements.push(plane);
  
  // Camera position
  camera.position.set(8, 6, 8);
  camera.lookAt(0, 0, 0);
  
  // Mouse interaction for parallax effect
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  
  const handleMouseMove = (event: MouseEvent) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    targetRotationY = (event.clientX - windowHalfX) * 0.0005;
    targetRotationX = (event.clientY - windowHalfY) * 0.0003;
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Smooth rotation
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;
    
    // Apply rotation to scene
    scene.rotation.y = currentRotationY;
    scene.rotation.x = currentRotationX;
    
    // Subtle continuous rotation
    gridHelper.rotation.y += 0.001;
    
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
    window.removeEventListener('mousemove', handleMouseMove);
    
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    
    // Clean up all elements
    buildingElements.forEach(element => {
      scene.remove(element);
      if (element.geometry) element.geometry.dispose();
      if (element.material) {
        if (Array.isArray(element.material)) {
          element.material.forEach(material => material.dispose());
        } else {
          element.material.dispose();
        }
      }
    });
    
    scene.remove(gridHelper);
    renderer.dispose();
  };
};
