import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import Hotspot from './components/Hotspot';  // Import the Hotspot component

// Main Globe Component
function Globe() {
  const texture = useTexture("/images/smvdumap.jpg");
  const radius = 2;  // Radius of the globe
  const globeRef = useRef();

  // Rotate the globe continuously
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005; // Rotate the globe
    }
  });

  return (
    <>
      {/* Render the globe with the map texture */}
      <Sphere args={[radius, 64, 64]} scale={2} ref={globeRef}>
        <meshStandardMaterial map={texture} />

        {/* Add Hotspots to the globe */}
        <Hotspot lat={32.78} lon={-96.8} radius={radius} label="Division of Research" />
        <Hotspot lat={28.61} lon={77.2} radius={radius} label="Another Location" />
      </Sphere>
    </>
  );
}

// Main Application
function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} style={{ width: "100vw", height: "100vh" }}>
      {/* Basic lighting for the scene */}
      <ambientLight intensity={2.0} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, 5]} intensity={1.5} />

      {/* Render the Globe with Hotspots */}
      <Globe />

      {/* Controls to rotate and zoom around the globe */}
      <OrbitControls enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}

export default App;
