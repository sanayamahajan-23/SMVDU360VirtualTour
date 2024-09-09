import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import * as THREE from 'three';

function Globe() {
  const texture = useTexture("/images/smvdumap.jpg");

  // Set wrapping for better texture alignment on the sphere
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return (
    <Sphere args={[2, 64, 64]} scale={1.5} position={[0, 0, 0]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} style={{ width: "100vw", height: "100vh" }}>
      <ambientLight intensity={2.0}/>

      {/* Strong directional light */}
      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      {/* Add a point light to illuminate from the front */}
      <pointLight position={[-5, -5, 5]} intensity={1.5} />
      
      <Globe />
      
      {/* Orbit controls to allow zoom and rotate */}
      <OrbitControls enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}

export default App;
