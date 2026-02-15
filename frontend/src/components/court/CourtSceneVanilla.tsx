import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';

const cameraPositions: { [key: string]: { x: number; y: number; z: number; lookAt: THREE.Vector3 } } = {
  home: { x: 0.68, y: 1.11, z: 2.10, lookAt: new THREE.Vector3(0, 1, 0) },
  judge: { x: -2.54, y: 0.44, z: -0.47, lookAt: new THREE.Vector3(0, 1, 0) },
  defendant: { x: 1.36, y: 0.52, z: -0.73, lookAt: new THREE.Vector3(0, 1, 0) },
  counsel: { x: 1.24, y: 0.60, z: 0.75, lookAt: new THREE.Vector3(0, 1, 0) },
  witness: { x: -2.71, y: 0.5, z: 1.16, lookAt: new THREE.Vector3(0, 1, 0) },
  prosecutor: { x: 1.24, y: 0.60, z: 0.75, lookAt: new THREE.Vector3(0, 1, 0) },
  reporter: { x: -3.11, y: 0.54, z: -2.46, lookAt: new THREE.Vector3(0, 1, 0) },
  clerk: { x: -2.42, y: 0.58, z: -0.08, lookAt: new THREE.Vector3(0, 1, 0) },
  jury: { x: -0.08, y: 0.66, z: 2.42, lookAt: new THREE.Vector3(0, 1, 0) },
  spectator: { x: 3.40, y: 1.26, z: 0.01, lookAt: new THREE.Vector3(0, 1, 0) }
};

export const CourtSceneVanilla = forwardRef((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useImperativeHandle(ref, () => ({
    goTo: (place: string) => {
      const target = cameraPositions[place] || cameraPositions.home;
      if (!target) {
        console.warn(`Camera position for "${place}" not found. Defaulting to home.`);
        return;
      }

      if (cameraRef.current) {
        gsap.to(cameraRef.current.position, {
          x: target.x,
          y: target.y,
          z: target.z,
          duration: 1.5,
          onUpdate: () => {
            if (cameraRef.current) {
              cameraRef.current.lookAt(target.lookAt);
            }
          }
        });
      }
    }
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      width / height,
      0.1,
      1000
    );
    camera.position.set(2.29, 0.92, 1.57);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.update();
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Load Courtroom Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/courtroom.glb',
      (gltf) => {
        scene.add(gltf.scene);
        console.log('✅ Courtroom model loaded');
      },
      undefined,
      (error) => {
        console.error('❌ Error loading model:', error);
      }
    );

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="game-container" />;
});

CourtSceneVanilla.displayName = 'CourtSceneVanilla';