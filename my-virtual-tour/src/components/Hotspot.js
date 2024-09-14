import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CircleGeometry, TextureLoader } from 'three';
import { Text } from '@react-three/drei';

// Helper function to convert lat/lon to 3D position
function latLonToXYZ(lat, lon, radius, offset = 0.3) {  // Increased the offset from 0.02 to 0.1
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi) + offset;  // Increased offset to ensure visibility above the globe surface

  return [x, y, z];
}

function Hotspot({ lat, lon, radius, label }) {
  const hotspotRef = useRef();
  const position = latLonToXYZ(lat, lon, radius);
  const { camera } = useThree();

  useFrame(() => {
    if (hotspotRef.current) {
      // Ensure the marker always faces the camera
      hotspotRef.current.lookAt(camera.position);
    }
  });

  // Load the marker texture (adjust path as needed)
  const texture = new TextureLoader().load('/images/hotspot.png');  // Ensure hotspot.png is a circular icon

  return (
    <>
      <mesh position={position} ref={hotspotRef}>
        {/* Use CircleGeometry for a circular pin */}
        <circleGeometry args={[0.05, 10]} />  {/* Adjust size for the marker */}
        <meshBasicMaterial 
          map={texture} 
          transparent={true}
          depthTest={true}
          depthWrite={false}  // Prevent z-fighting
        />
      </mesh>

      {/* Add label text near the marker */}
      <Text
        position={[position[0], position[1] - 0.2, position[2]]}  
        fontSize={0.1}
        color="rgb(255,0,0)"  
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </>
  );
}

export default Hotspot;
