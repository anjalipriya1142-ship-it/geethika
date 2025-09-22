
import React from 'react';
import ToggleSwitch from './ToggleSwitch';
import { type LayerVisibility } from '../types';

interface ControlPanelProps {
  layerVisibility: LayerVisibility;
  setLayerVisibility: React.Dispatch<React.SetStateAction<LayerVisibility>>;
  isChemoportSelected: boolean;
  onClose: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ layerVisibility, setLayerVisibility, isChemoportSelected, onClose }) => {
  const handleToggle = (layer: keyof LayerVisibility) => {
    setLayerVisibility((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="bg-brand-secondary/80 backdrop-blur-md rounded-lg p-6 shadow-2xl h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Layer Controls</h2>
        <button onClick={onClose} className="md:hidden text-brand-light hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-5 flex-grow">
        <ToggleSwitch
          id="skin-toggle"
          label="Skin"
          checked={layerVisibility.skin}
          onChange={() => handleToggle('skin')}
          color="bg-yellow-400"
        />
        <ToggleSwitch
          id="muscles-toggle"
          label="Muscles"
          checked={layerVisibility.muscles}
          onChange={() => handleToggle('muscles')}
          color="bg-red-500"
        />
        <ToggleSwitch
          id="vascular-toggle"
          label="Vascular System"
          checked={layerVisibility.vascular}
          onChange={() => handleToggle('vascular')}
          color="bg-blue-500"
        />
        <ToggleSwitch
          id="nerves-toggle"
          label="Nervous System"
          checked={layerVisibility.nerves}
          onChange={() => handleToggle('nerves')}
          color="bg-yellow-300"
        />
      </div>
      <div className="mt-6 border-t border-brand-accent pt-4 transition-all duration-300">
        {isChemoportSelected ? (
          <div>
            <h3 className="text-lg font-semibold text-brand-blue mb-2 animate-pulse">Chemoport: Selected</h3>
            <div className="space-y-2 text-sm text-brand-light">
              <p><strong className="text-brand-text">Function:</strong> Provides long-term central venous access for administering chemotherapy, medications, or for blood draws.</p>
              <p><strong className="text-brand-text">Placement:</strong> Implanted subcutaneously (under the skin) in the upper chest, connected via a catheter to the subclavian vein.</p>
              <p><strong className="text-brand-text">Access Point:</strong> The central silicone septum is designed for repeated needle punctures for treatment administration.</p>
            </div>
          </div>
        ) : (
           <div>
            <h3 className="text-lg font-semibold text-white mb-2">Chemoport Details</h3>
            <p className="text-sm text-brand-light">
              A surgically implanted chemoport is connected to the subclavian vein. Click on the metallic disc in the model to see more details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
