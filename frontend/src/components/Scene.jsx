import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  OrbitControls,
  Sphere,
  Line,
} from "@react-three/drei";
import * as THREE from "three";

function Network({ mobile = false }) {
  const group = useRef();
  const points = [];

  const pointCount = mobile ? 12 : 22;

  for (let i = 0; i < pointCount; i++) {
    const a = (i / pointCount) * Math.PI * 2;
    const r = 1.45 + (i % 3) * 0.22;

    points.push([
      Math.cos(a) * r,
      Math.sin(a * 1.7) * 0.65,
      Math.sin(a) * r,
    ]);
  }

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * (mobile ? 0.06 : 0.12);

    if (!mobile) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pointer.y * 0.18,
        0.05
      );

      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        pointer.x * 0.12,
        0.05
      );
    }
  });

  return (
    <group ref={group}>
      <Sphere
        args={[
          1.05,
          mobile ? 24 : 48,
          mobile ? 24 : 48,
        ]}
      >
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.8}
          roughness={0.22}
          wireframe
          transparent
          opacity={0.65}
        />
      </Sphere>

      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry
            args={[
              0.055,
              mobile ? 8 : 16,
              mobile ? 8 : 16,
            ]}
          />

          <meshStandardMaterial
            color="#f5e4a6"
            emissive="#6b5512"
            emissiveIntensity={1.4}
          />
        </mesh>
      ))}

      {points.slice(0, mobile ? 6 : 11).map((p, i) => (
        <Line
          key={`line-${i}`}
          points={[p, points[(i + 4) % points.length]]}
          color="#8d752b"
          transparent
          opacity={0.55}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

export default function Scene({ compact = false }) {
  const mobile =
    typeof window !== "undefined" &&
    window.innerWidth <= 768;

  return (
    <div className={compact ? "scene compact" : "scene"}>
      <Canvas
        camera={{
          position: [0, 0, 4.8],
          fov: 42,
        }}
        dpr={mobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: !mobile,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.65} />

        <directionalLight
          position={[3, 4, 4]}
          intensity={mobile ? 1.3 : 2}
        />

        <Float
          speed={mobile ? 0.7 : 1.2}
          rotationIntensity={mobile ? 0.1 : 0.18}
          floatIntensity={mobile ? 0.2 : 0.35}
        >
          <Network mobile={mobile} />
        </Float>

        <Environment preset="city" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>

      <div className="scene-label">
        <span className="pulse"></span>
        DIGITAL ECOSYSTEM / LIVE
      </div>
    </div>
  );
}