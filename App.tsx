
import React, { useState } from 'react';
import AnatomyViewer from './components/AnatomyViewer';
import ControlPanel from './components/ControlPanel';
import { type LayerVisibility } from './types';

const App: React.FC = () => {
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    skin: true,
    muscles: true,
    vascular: true,
    nerves: true,
  });

  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [isChemoportSelected, setIsChemoportSelected] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans">
      <AnatomyViewer
        layerVisibility={layerVisibility}
        isChemoportSelected={isChemoportSelected}
        setIsChemoportSelected={setIsChemoportSelected}
      />
      <header className="absolute top-0 left-0 w-full p-4 md:p-6 bg-gradient-to-b from-brand-primary/80 to-transparent">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-white tracking-wide">3D Anatomical Arm Viewer</h1>
            <p className="text-sm md:text-base text-brand-light">Medical training simulation with layer controls.</p>
          </div>
          <button
            onClick={() => setIsPanelVisible(!isPanelVisible)}
            className="md:hidden p-2 rounded-md bg-brand-secondary/50 hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-light"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`absolute top-0 right-0 h-full transform transition-transform duration-300 ease-in-out ${
          isPanelVisible ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 w-80 md:w-96 p-4 md:p-6`}
      >
        <ControlPanel
          layerVisibility={layerVisibility}
          setLayerVisibility={setLayerVisibility}
          isChemoportSelected={isChemoportSelected}
          onClose={() => setIsPanelVisible(false)}
        />
      </div>

      <footer className="absolute bottom-0 left-0 w-full p-4 text-center bg-gradient-to-t from-brand-primary/80 to-transparent">
          <p className="text-brand-light text-sm">Use your mouse to interact: Drag to rotate, Scroll to zoom, Right-click and drag to pan.</p>
      </footer>
    </div>
  );
};

export default App;
