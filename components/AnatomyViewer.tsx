
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import ArmModel from './ArmModel';
import { type LayerVisibility } from '../types';

interface AnatomyViewerProps {
  layerVisibility: LayerVisibility;
  isChemoportSelected: boolean;
  setIsChemoportSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnatomyViewer: React.FC<AnatomyViewerProps> = ({ layerVisibility, isChemoportSelected, setIsChemoportSelected }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 45, position: [0, 0, 3] }}
      style={{ background: 'linear-gradient(180deg, #0D1B2A 0%, #1B263B 100%)' }}
    >
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.5}>
           <ArmModel
             layerVisibility={layerVisibility}
             isChemoportSelected={isChemoportSelected}
             setIsChemoportSelected={setIsChemoportSelected}
           />
        </Stage>
      </Suspense>
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} minDistance={1} maxDistance={5} />
    </Canvas>
  );
};

export default AnatomyViewer;
