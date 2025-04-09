
import * as THREE from 'three';

// Create an animated floor plan
export const createFloorplanVisualization = (container: HTMLDivElement) => {
  if (!container) return () => {};
  
  // Setup
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  // Scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-width / 200, width / 200, height / 200, -height / 200, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true 
  });
  
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  
  // Create a floor plan
  const floorPlan = new THREE.Group();
  scene.add(floorPlan);
  
  // Floor
  const floorGeometry = new THREE.PlaneGeometry(5, 5);
  const floorMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floorPlan.add(floor);
  
  // Walls - using line segments
  const createWall = (points: THREE.Vector3[]) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const wall = new THREE.Line(geometry, material);
    wall.position.y = 0.01; // Slightly above floor
    floorPlan.add(wall);
    return wall;
  };
  
  const walls = [];
  
  // Outer walls
  walls.push(createWall([
    new THREE.Vector3(-2, 0, -2),
    new THREE.Vector3(2, 0, -2),
    new THREE.Vector3(2, 0, 2),
    new THREE.Vector3(-2, 0, 2),
    new THREE.Vector3(-2, 0, -2)
  ]));
  
  // Inner walls
  walls.push(createWall([
    new THREE.Vector3(-2, 0, 0),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 2)
  ]));
  
  walls.push(createWall([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(2, 0, -1)
  ]));
  
  // Furniture
  const furnitureMaterial = new THREE.LineBasicMaterial({ 
    color: 0x666666,
    transparent: true,
    opacity: 0.7 
  });
  
  const furniture = [];
  
  // Sofa
  const sofaPoints = [];
  sofaPoints.push(
    new THREE.Vector3(-1.8, 0, 1.5),
    new THREE.Vector3(-0.8, 0, 1.5),
    new THREE.Vector3(-0.8, 0, 0.8),
    new THREE.Vector3(-1.8, 0, 0.8),
    new THREE.Vector3(-1.8, 0, 1.5)
  );
  
  const sofaGeometry = new THREE.BufferGeometry().setFromPoints(sofaPoints);
  const sofa = new THREE.Line(sofaGeometry, furnitureMaterial);
  sofa.position.y = 0.02;
  floorPlan.add(sofa);
  furniture.push(sofa);
  
  // Table
  const tablePoints = [];
  tablePoints.push(
    new THREE.Vector3(1, 0, 0.5),
    new THREE.Vector3(1.8, 0, 0.5),
    new THREE.Vector3(1.8, 0, 1.5),
    new THREE.Vector3(1, 0, 1.5),
    new THREE.Vector3(1, 0, 0.5)
  );
  
  const tableGeometry = new THREE.BufferGeometry().setFromPoints(tablePoints);
  const table = new THREE.Line(tableGeometry, furnitureMaterial);
  table.position.y = 0.02;
  floorPlan.add(table);
  furniture.push(table);
  
  // Add labels for rooms
  const createLabel = (text: string, x: number, y: number, z: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    
    const context = canvas.getContext('2d');
    if (!context) return null;
    
    context.fillStyle = 'rgba(255, 255, 255, 0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.font = 'Bold 24px Arial';
    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(x, y, z);
    sprite.scale.set(1, 0.5, 1);
    floorPlan.add(sprite);
    
    return sprite;
  };
  
  const labels = [];
  labels.push(createLabel('Living Room', 1.4, 0.5, 1));
  labels.push(createLabel('Kitchen', -1.3, 0.5, -1));
  labels.push(createLabel('Bedroom', -1, 0.5, 1.3));
  
  // Camera positioning
  camera.position.set(0, 5, 0);
  camera.lookAt(0, 0, 0);
  
  // Animation
  let targetRotationY = 0;
  let currentRotationY = 0;
  
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Smooth rotation
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;
    floorPlan.rotation.y = currentRotationY;
    
    renderer.render(scene, camera);
  };
  
  animate();
  
  // Add mouse interaction
  const handleMouseMove = (event: MouseEvent) => {
    const windowHalfX = window.innerWidth / 2;
    targetRotationY = (event.clientX - windowHalfX) * 0.001;
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  // Handle resize
  const handleResize = () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    
    camera.left = -newWidth / 200;
    camera.right = newWidth / 200;
    camera.top = newHeight / 200;
    camera.bottom = -newHeight / 200;
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
    floor.geometry.dispose();
    floor.material.dispose();
    
    walls.forEach(wall => {
      wall.geometry.dispose();
      wall.material.dispose();
    });
    
    furniture.forEach(item => {
      item.geometry.dispose();
      item.material.dispose();
    });
    
    labels.forEach(label => {
      if (label && label.material.map) {
        label.material.map.dispose();
        label.material.dispose();
      }
    });
    
    renderer.dispose();
  };
};
