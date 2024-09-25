import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

function PulsatingHotspot({ lat, lon, radius, label,onClick}) {
  const hotspotRef = useRef();
  const pulseRef = useRef();
  const textRef = useRef();
  const { camera } = useThree(); // Get the camera from the scene
  const [hovered, setHovered] = useState(false);

  // Adjust the offset to lift the hotspot above the surface dynamically
  const position = latLonToXYZ(lat, lon, radius, 0.15); // Offset for visibility above the surface

  // Keep the hotspots static in position but visible above the surface
  useFrame(() => {
    if (pulseRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.2; // Slight pulsing effect
      pulseRef.current.scale.set(scale, scale, scale);
    }

    if (hotspotRef.current) {
      hotspotRef.current.lookAt(camera.position); // Keep hotspots facing the camera
    }

    if (textRef.current) {
      textRef.current.lookAt(camera.position); // Ensure text faces the camera
      textRef.current.visible = hovered; // Show text only when hovered
    }
  });

  return (
    <>
      {/* Pulsating outer layer (Sphere for 3D pulsing effect) */}
      <mesh position={position} ref={pulseRef}>
        <sphereGeometry args={[0.03, 32, 32]} /> {/* Adjust the size of the pulsing sphere */}
        <meshBasicMaterial color="red" opacity={0.2} transparent={true} />
      </mesh>

      {/* Main Hotspot marker */}
      <mesh
        position={position}
        ref={hotspotRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick} 
        style={{ cursor: 'pointer' }}
      >
        <sphereGeometry args={[0.02, 32, 32]} /> {/* Smaller, spherical hotspot */}
        <meshBasicMaterial color="red" opacity={1} />
      </mesh>

      {/* Text label shown on hover */}
      <Text
        ref={textRef}
        position={[position[0], position[1] + 0.1, position[2]]} // Adjusted Y-position for better visibility
        fontSize={0.03}
        color="red"
        anchorX="center"
        anchorY="middle"
        visible={hovered}
      >
        {label}
      </Text>
    </>
  );
}

// Helper function to convert lat/lon to XYZ
function latLonToXYZ(lat, lon, radius, offset = 0.15) {
  const phi = (90 - lat) * (Math.PI / 180); // Latitude in radians
  const theta = (lon + 180) * (Math.PI / 180); // Longitude in radians

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);

  // Adjust the Y offset based on the latitude, ensuring negative latitudes are handled
  const y = radius * Math.cos(phi) + (lat < 0 ? -offset : offset);

  return [x, y, z];
}

export default PulsatingHotspot;
