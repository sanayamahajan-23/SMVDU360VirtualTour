import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';
import { Text } from '@react-three/drei';

// Helper function to convert lat/lon to 3D position
function latLonToXYZ(lat, lon, radius, offset = 0.05) {  
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi) + offset;

  return [x, y, z];
}

function Hotspot({ lat, lon, radius, label ,onClick}) {
  const hotspotRef = useRef();
  const textRef = useRef();
  const position = latLonToXYZ(lat, lon, radius);
  const { camera } = useThree();

  useFrame(() => {
    if (hotspotRef.current && textRef.current) {
      // Ensure the hotspot marker always faces the camera
      hotspotRef.current.lookAt(camera.position);

      // Get the vector pointing from the camera to the text position
      const cameraToText = new Vector3().subVectors(camera.position, textRef.current.position);

      // Flatten the vector on the Y-axis to avoid flipping
      cameraToText.y = 0;  // Lock the vertical axis rotation
      const flatLookAtPosition = new Vector3().addVectors(textRef.current.position, cameraToText);

      // Ensure text only rotates horizontally (XZ plane)
      textRef.current.lookAt(flatLookAtPosition);
    }
  });

  const texture = new TextureLoader().load('/images/hotspot.png');

  return (
    <>
      <mesh position={position} ref={hotspotRef} onClick={onClick} style={{ cursor: 'pointer' }}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial map={texture} transparent={true} />
      </mesh>

      <Text
        ref={textRef}
        position={[position[0], position[1] + 0.12, position[2]]}
        fontSize={0.03}
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