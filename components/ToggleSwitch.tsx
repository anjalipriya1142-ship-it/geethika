
import React from 'react';

interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  color: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, label, checked, onChange, color }) => {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="text-lg text-brand-text font-medium">
        {label}
      </label>
      <button
        id={id}
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-secondary focus:ring-brand-light ${
          checked ? color : 'bg-brand-accent'
        }`}
      >
        <span
          className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
            checked ? 'translate-x-8' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
