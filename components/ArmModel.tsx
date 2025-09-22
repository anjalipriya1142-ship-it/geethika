
import React, { useMemo, useState } from 'react';
import * as THREE from 'three';
import { Tube } from '@react-three/drei';
import { type LayerVisibility } from '../types';

interface ArmModelProps {
  layerVisibility: LayerVisibility;
  isChemoportSelected: boolean;
  setIsChemoportSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nerve: React.FC<{ curve: THREE.CatmullRomCurve3 }> = ({ curve }) => {
    return (
        <Tube args={[curve, 64, 0.008, 8, false]}>
            <meshStandardMaterial color="#FFD166" emissive="#FFD166" emissiveIntensity={0.3} transparent opacity={0.9} />
        </Tube>
    );
};

const Artery: React.FC<{ curve: THREE.CatmullRomCurve3 }> = ({ curve }) => {
    return (
        <Tube args={[curve, 64, 0.015, 8, false]}>
            <meshStandardMaterial color="#FF495C" emissive="#FF495C" emissiveIntensity={0.2} transparent opacity={0.8} roughness={0.4} metalness={0.2} />
        </Tube>
    );
};

const Vein: React.FC<{ curve: THREE.CatmullRomCurve3 }> = ({ curve }) => {
    return (
        <Tube args={[curve, 64, 0.02, 8, false]}>
            <meshStandardMaterial color="#3A86FF" transparent opacity={0.6} roughness={0.5} metalness={0.1} />
        </Tube>
    );
};


const ArmModel: React.FC<ArmModelProps> = ({ layerVisibility, isChemoportSelected, setIsChemoportSelected }) => {
  const { skin, muscles, vascular, nerves } = layerVisibility;
  const [isHovered, setIsHovered] = useState(false);

  // Create memoized curves for performance
  const mainArteryCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.2, 0.05),
    new THREE.Vector3(0, 0, 0.05),
    new THREE.Vector3(0, -1.2, 0.05),
  ]), []);

  const subclavianVeinCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.1, 1.2, 0),
    new THREE.Vector3(-0.08, 0.5, 0),
    new THREE.Vector3(-0.1, 0, 0),
    new THREE.Vector3(-0.09, -1.2, 0),
  ]), []);

  const secondaryVeinCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.08, 0.5, 0),
    new THREE.Vector3(0.05, 0.2, -0.05),
    new THREE.Vector3(0.06, -0.8, -0.05),
  ]), []);

  const catheterCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.1, 0.8, 0.1), // Chemoport position
    new THREE.Vector3(0.0, 0.7, 0.0),
    new THREE.Vector3(-0.08, 0.6, 0.0) // Connects to subclavian
  ]), []);
  
  const mainNerveCurve = useMemo(() => new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.08, 1.2, -0.05),
      new THREE.Vector3(0.1, 0, -0.05),
      new THREE.Vector3(0.08, -1.2, -0.05),
  ]), []);

  const branchNerveCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.1, 0.1, -0.05),
    new THREE.Vector3(0.2, -0.2, -0.02),
    new THREE.Vector3(0.2, -0.9, -0.02),
  ]), []);
  
  React.useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto';
  }, [isHovered]);

  return (
    <group rotation={[0, 0, 0.2]}>
      {/* --- BONE (always visible for context) --- */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 2.5, 16]} />
        <meshStandardMaterial color="#E0E1DD" roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* --- MUSCLES --- */}
      {muscles && (
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 2.5, 32]} />
          <meshStandardMaterial color="#B22222" roughness={0.8} transparent opacity={0.6} />
        </mesh>
      )}

      {/* --- VASCULAR SYSTEM --- */}
      {vascular && (
        <group>
          {/* Arteries */}
          <Artery curve={mainArteryCurve} />
          {/* Veins */}
          <Vein curve={subclavianVeinCurve} />
          <Vein curve={secondaryVeinCurve} />

          {/* Chemoport and Catheter */}
          <mesh 
            position={[0.1, 0.8, 0.1]}
            onClick={(e) => {
              e.stopPropagation();
              setIsChemoportSelected(!isChemoportSelected);
            }}
            onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
            onPointerOut={() => setIsHovered(false)}
          >
              <cylinderGeometry args={[0.05, 0.05, 0.02, 24]} />
              <meshStandardMaterial 
                color="#778DA9" 
                metalness={0.8} 
                roughness={0.2}
                emissive={isChemoportSelected ? '#ADD8E6' : '#000000'}
                emissiveIntensity={isChemoportSelected ? 0.7 : 0}
                toneMapped={false}
              />
          </mesh>
          <Tube args={[catheterCurve, 32, 0.005, 8, false]}>
              <meshStandardMaterial color="#ADD8E6" roughness={0.3}/>
          </Tube>
        </group>
      )}

      {/* --- NERVOUS SYSTEM --- */}
      {nerves && (
        <group>
            <Nerve curve={mainNerveCurve} />
            <Nerve curve={branchNerveCurve} />
        </group>
      )}
      
      {/* --- SKIN --- */}
      {skin && (
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.17, 2.5, 32]} />
          <meshStandardMaterial color="#FFDBAC" transparent opacity={0.3} roughness={0.5} />
        </mesh>
      )}
    </group>
  );
};

export default ArmModel;
