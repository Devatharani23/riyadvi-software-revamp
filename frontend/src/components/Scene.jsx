import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

function Network() {
  const group = useRef();
  const points = [];
  for (let i=0;i<22;i++) {
    const a = (i/22)*Math.PI*2;
    const r = 1.45 + (i%3)*0.22;
    points.push([Math.cos(a)*r, Math.sin(a*1.7)*0.65, Math.sin(a)*r]);
  }
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta*0.16; });
  return <group ref={group}>
    <Sphere args={[1.05,48,48]}><meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.22} wireframe /></Sphere>
    {points.map((p,i)=><mesh key={i} position={p}><sphereGeometry args={[0.055,16,16]}/><meshStandardMaterial color="#f5e4a6" emissive="#6b5512" emissiveIntensity={1.4}/></mesh>)}
    {points.slice(0,11).map((p,i)=><Line key={"l"+i} points={[p,points[(i+4)%points.length]]} color="#8d752b" transparent opacity={0.55} lineWidth={1}/>)}
  </group>;
}

export default function Scene({ compact=false }) {
  return <div className={compact ? "scene compact" : "scene"}>
    <Canvas camera={{position:[0,0,4.8], fov:42}} dpr={[1,1.6]} gl={{antialias:true}}>
      <ambientLight intensity={0.65}/>
      <directionalLight position={[3,4,4]} intensity={2}/>
      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.35}><Network/></Float>
      <Environment preset="city"/>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false}/>
    </Canvas>
    <div className="scene-label"><span className="pulse"></span> DIGITAL ECOSYSTEM / LIVE</div>
  </div>;
}