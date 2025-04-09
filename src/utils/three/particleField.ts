
import * as THREE from 'three';

// Create floating particles field with connections
export const createParticleField = (container: HTMLDivElement) => {
  if (!container) return () => {};
  
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
  const velocities: Array<{x: number, y: number, z: number}> = [];
  
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
  
  const handleMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    
    const positions = particlesGeometry.attributes.position.array as Float32Array;
    
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
