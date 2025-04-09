
import * as THREE from 'three';
import gsap from 'gsap';

// Create architectural wireframe scene with advanced rendering
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

// Create advanced architecture grid for hero section
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
  const createBuildingBlock = (width, height, depth, x, y, z) => {
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
  
  const handleMouseMove = (event) => {
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

// Create floating particles field with connections
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  
  // Create particles
  const particleCount = 150;
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0x000000,
    size: 0.05,
    sizeAttenuation: true
  });
  
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Array(particleCount);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    // Position
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
    
    // Velocity
    velocities[i] = {
      x: (Math.random() - 0.5) * 0.01,
      y: (Math.random() - 0.5) * 0.01,
      z: (Math.random() - 0.5) * 0.01
    };
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);
  
  // Create connections between nearby particles
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.2
  });
  
  const lineSegments = new THREE.Group();
  scene.add(lineSegments);
  
  // Camera position
  camera.position.z = 5;
  
  // Mouse interaction for parallax effect
  let mouseX = 0;
  let mouseY = 0;
  
  const handleMouseMove = (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    
    const positions = particlesGeometry.attributes.position.array;
    
    // Update particles
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Update position based on velocity
      positions[i3] += velocities[i].x;
      positions[i3 + 1] += velocities[i].y;
      positions[i3 + 2] += velocities[i].z;
      
      // Boundary check - wrap around edges
      if (Math.abs(positions[i3]) > 5) velocities[i].x *= -1;
      if (Math.abs(positions[i3 + 1]) > 5) velocities[i].y *= -1;
      if (Math.abs(positions[i3 + 2]) > 5) velocities[i].z *= -1;
    }
    
    particlesGeometry.attributes.position.needsUpdate = true;
    
    // Update connections
    scene.remove(lineSegments);
    const newLineSegments = new THREE.Group();
    
    // Check distances between particles and create lines for those that are close
    const connectionDistance = 1.5; 
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const p1 = {
        x: positions[i3],
        y: positions[i3 + 1],
        z: positions[i3 + 2]
      };
      
      for (let j = i + 1; j < particleCount; j++) {
        const j3 = j * 3;
        const p2 = {
          x: positions[j3],
          y: positions[j3 + 1],
          z: positions[j3 + 2]
        };
        
        const distance = Math.sqrt(
          Math.pow(p1.x - p2.x, 2) + 
          Math.pow(p1.y - p2.y, 2) + 
          Math.pow(p1.z - p2.z, 2)
        );
        
        if (distance < connectionDistance) {
          // Calculate opacity based on distance
          const lineOpacity = 1 - (distance / connectionDistance);
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(p1.x, p1.y, p1.z),
            new THREE.Vector3(p2.x, p2.y, p2.z)
          ]);
          
          const individualLineMaterial = new THREE.LineBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: lineOpacity * 0.2
          });
          
          const line = new THREE.Line(lineGeometry, individualLineMaterial);
          newLineSegments.add(line);
        }
      }
    }
    
    scene.add(newLineSegments);
    lineSegments.copy(newLineSegments);
    
    // Camera movement based on mouse position
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
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
    
    scene.remove(particles);
    scene.remove(lineSegments);
    
    particlesGeometry.dispose();
    particlesMaterial.dispose();
    
    // Dispose all line geometries and materials in lineSegments
    lineSegments.traverse((child) => {
      if (child instanceof THREE.Line) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
    
    renderer.dispose();
  };
};

// Create an animated floor plan
export const createFloorplanVisualization = (container) => {
  if (!container) return null;
  
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
  const createWall = (points) => {
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
  const createLabel = (text, x, y, z) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    
    const context = canvas.getContext('2d');
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
  const handleMouseMove = (event) => {
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
      label.material.map.dispose();
      label.material.dispose();
    });
    
    renderer.dispose();
  };
};
