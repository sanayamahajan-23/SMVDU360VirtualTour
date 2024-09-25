import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import Hotspot from './components/Hotspot';  // Import the Hotspot component
import PanoViewer from './components/PanoramaViewer';  // Import the PanoViewer component
import './App.css';  // Import custom CSS for background and animations

// Main Globe Component
function Globe({ onHotspotClick }) {
  const texture = useTexture("/images/smvdumap.jpg");
  const radius = 2;  // Radius of the globe
  const globeRef = useRef();
  
  return (
    <>
      {/* Render the globe with the map texture */}
      <Sphere args={[radius, 64, 64]} scale={2} ref={globeRef}>
        <meshStandardMaterial map={texture} />

        {/* Add Hotspots to the globe, passing onHotspotClick for pano view */}
        <Hotspot lat={5.78} lon={-90.8} radius={radius} label="Sports Complex" onClick={() => onHotspotClick("/images/vaihnavi.jpeg")} />
        <Hotspot lat={22.61} lon={70.2} radius={radius} label="Shivalik B" onClick={() => onHotspotClick("/images/mypanorma.jpeg")} />
        <Hotspot lat={5.61} lon={70.2} radius={radius} label="Shivalik A" onClick={() => onHotspotClick("/images/pano-shivalik-a.jpg")} />
        <Hotspot lat={0.9} lon={74.2} radius={radius} label="Grocery" onClick={() => onHotspotClick("/images/pano-grocery.jpg")} />
        <Hotspot lat={-15.61} lon={110.2} radius={radius} label="Residential Area " />
        <Hotspot lat={-10.61} lon={94.2} radius={radius} label="Guesthouse " />
        <Hotspot lat={-29.61} lon={87.2} radius={radius} label="Vaishnavi Hostel" />
        <Hotspot lat={-23.61} lon={59.2} radius={radius} label="Entrance 1" />
        <Hotspot lat={28.61} lon={29.2} radius={radius} label="LT3 & 4" onClick={() => onHotspotClick("/images/pano-lt3-4.jpg")} />
        <Hotspot lat={28.61} lon={35.2} radius={radius} label="Block D" onClick={() => onHotspotClick("/images/pano-block-d.jpg")} />
        <Hotspot lat={20.61} lon={40.2} radius={radius} label="Block C" onClick={() => onHotspotClick("/images/pano-block-c.jpg")} />
        <Hotspot lat={14.61} lon={43.2} radius={radius} label="BC Junction" onClick={() => onHotspotClick("/images/pano-bc-junction.jpg")} />
        <Hotspot lat={9.61} lon={43.2} radius={radius} label="Block B" onClick={() => onHotspotClick("/images/pano-block-b.jpg")} />
        <Hotspot lat={0.0009} lon={38.2} radius={radius} label="Block A" onClick={() => onHotspotClick("/images/pano-block-a.jpg")} />
        <Hotspot lat={-0.0} lon={30.2} radius={radius} label="LT 1&2" onClick={() => onHotspotClick("/images/pano-lt1-2.jpg")} />
        <Hotspot lat={0.61} lon={25.2} radius={radius} label="Research Block" onClick={() => onHotspotClick("/images/pano-research-block.jpg")} />
        <Hotspot lat={-0.009} lon={14.2} radius={radius} label="Central Library" onClick={() => onHotspotClick("/images/pano-library.jpg")} />
        <Hotspot lat={9.61} lon={30.2} radius={radius} label="School of Philosophy and Literature" onClick={() => onHotspotClick("/images/pano-school-philosophy.jpg")} />
        <Hotspot lat={18.61} lon={30.2} radius={radius} label="School of Business Management" onClick={() => onHotspotClick("/images/pano-school-business.jpg")} />
        <Hotspot lat={25.61} lon={22.2} radius={radius} label="School of Computer Science" onClick={() => onHotspotClick("/images/pano-school-cs.jpg")} />
        <Hotspot lat={25.61} lon={10.2} radius={radius} label="Administration Block" onClick={() => onHotspotClick("/images/pano-admin-block.jpg")} />
        <Hotspot lat={33.61} lon={0.2} radius={radius} label="Matrika Auditorium" onClick={() => onHotspotClick("/images/pano-matrika.jpg")} />
      </Sphere>
    </>
  );
}

// Main Application
function App() {
  const [selectedPanorama, setSelectedPanorama] = useState(null);

  // Handle when a hotspot is clicked
  const handleHotspotClick = (panoUrl) => {
    setSelectedPanorama(panoUrl);  // Show the pano view for the clicked hotspot
  };

  const handleBackToGlobe = () => {
    setSelectedPanorama(null);  // Go back to globe view
  };

  return (
    <div className="sky-background">
      <img src="/images/cloud1.png" className="cloud" alt="cloud" />
      <img src="/images/cloud1.png" className="cloud cloud-second" alt="cloud" />

      {/* Conditional rendering based on the selected panorama */}
      {selectedPanorama ? (
        <PanoViewer imageUrl={selectedPanorama} onClose={handleBackToGlobe} />
      ) : (
        <Canvas camera={{ 
          position: [0, 0, 5], 
          near: 0.1,  // Set the near clipping plane
          far: 1000   // Set the far clipping plane
        }}  style={{ width: "100vw", height: "100vh" }}>
          {/* Basic lighting for the scene */}
          <ambientLight intensity={5.5} /> 
          <directionalLight position={[5, 10, 5]} intensity={2.5} />
          <pointLight position={[-15, -10, 10]} intensity={3.5} />

          {/* Render the Globe with Hotspots */}
          <Globe onHotspotClick={handleHotspotClick} />

          {/* Controls to rotate and zoom around the globe */}
          <OrbitControls enableZoom={true} enableRotate={true} minDistance={6} maxDistance={15} />
        </Canvas>
      )}
    </div>
  );
}

export default App;
