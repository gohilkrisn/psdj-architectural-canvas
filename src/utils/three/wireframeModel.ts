
import * as THREE from 'three';

// Create architectural wireframe scene with advanced rendering
export const createWireframeModel = (container: HTMLDivElement) => {
  if (!container) return () => {};
  
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  
  // Add wireframe building structure
  const createWireframeBuildingStructure = () => {
    // Main structure - a collection of cuboids of different sizes
    const structures = [];
    
    // Floor plan base
    const baseGeometry = new THREE.BoxGeometry(3, 0.1, 3);
    const baseMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.5;
    scene.add(base);
    structures.push(base);
    
    // Tower structures
    const towerGeometry = new THREE.BoxGeometry(0.8, 2, 0.8);
    const towerMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      wireframe: true 
    });
    
    // Tower 1
    const tower1 = new THREE.Mesh(towerGeometry, towerMaterial);
    tower1.position.set(0.8, 0.5, 0.8);
    scene.add(tower1);
    structures.push(tower1);
    
    // Tower 2
    const tower2 = new THREE.Mesh(towerGeometry, towerMaterial);
    tower2.position.set(-0.8, 0.5, 0.8);
    scene.add(tower2);
    structures.push(tower2);
    
    // Tower 3
    const tower3 = new THREE.Mesh(towerGeometry, towerMaterial);
    tower3.position.set(0.8, 0.5, -0.8);
    scene.add(tower3);
    structures.push(tower3);
    
    // Tower 4
    const tower4 = new THREE.Mesh(towerGeometry, towerMaterial);
    tower4.position.set(-0.8, 0.5, -0.8);
    scene.add(tower4);
    structures.push(tower4);
    
    // Connecting beams
    const beamGeometry = new THREE.BoxGeometry(1.6, 0.05, 0.05);
    const beamMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      wireframe: true 
    });
    
    // Beam 1-2
    const beam12 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam12.position.set(0, 1, 0.8);
    scene.add(beam12);
    structures.push(beam12);
    
    // Beam 3-4
    const beam34 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam34.position.set(0, 1, -0.8);
    scene.add(beam34);
    structures.push(beam34);
    
    // Beam 1-3
    const beam13 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam13.rotation.y = Math.PI / 2;
    beam13.position.set(0.8, 1, 0);
    scene.add(beam13);
    structures.push(beam13);
    
    // Beam 2-4
    const beam24 = new THREE.Mesh(beamGeometry, beamMaterial);
    beam24.rotation.y = Math.PI / 2;
    beam24.position.set(-0.8, 1, 0);
    scene.add(beam24);
    structures.push(beam24);
    
    // Grid lines
    const gridHelper = new THREE.GridHelper(4, 10);
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);
    
    return { structures, gridHelper };
  };
  
  const { structures, gridHelper } = createWireframeBuildingStructure();
  
  // Camera position
  camera.position.set(4, 3, 4);
  camera.lookAt(0, 0, 0);
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Rotate all structures slightly
    structures.forEach(structure => {
      structure.rotation.y += 0.003;
    });
    
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
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    
    // Dispose geometries and materials
    structures.forEach(structure => {
      scene.remove(structure);
      structure.geometry.dispose();
      structure.material.dispose();
    });
    
    scene.remove(gridHelper);
    renderer.dispose();
  };
};
