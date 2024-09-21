import React, { useEffect } from 'react';
import 'aframe';
import 'aframe-particle-system-component';
import 'aframe-extras';

function PanoViewer({ imageUrl, onClose }) {
  useEffect(() => {
    // Set the panorama image as soon as the component is mounted
    const scene = document.querySelector('a-scene');
    const sky = document.querySelector('a-sky');
    if (sky) {
      sky.setAttribute('src', imageUrl);
    }
  }, [imageUrl]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <button
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 2 }}
        onClick={onClose}
      >
        Close
      </button>
      <a-scene embedded style={{ width: '100%', height: '100%' }}>
        <a-sky src={imageUrl} rotation="0 -130 0"></a-sky>
        <a-camera position="0 1.6 0">
          <a-cursor></a-cursor>
        </a-camera>
      </a-scene>
    </div>
  );
}

export default PanoViewer;
