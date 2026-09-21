// frontend/src/components/court/CourtScene.tsx

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

interface CourtSceneProps {
  currentSpeaker: string;
}

export interface CourtSceneHandle {
  goTo: (position: string) => void;
}

type CourtPosition =
  | "home"
  | "judge"
  | "defendant"
  | "counsel"
  | "witness"
  | "prosecutor"
  | "reporter"
  | "clerk"
  | "jury"
  | "spectator";

interface CameraPosition {
  x: number;
  y: number;
  z: number;
  lookAt: THREE.Vector3;
}

const MODEL_URL = "/model/courtroom_compress.glb";
const CACHE_NAME = "court-simulation-model-v1";

const CAMERA_POSITIONS: Record<CourtPosition, CameraPosition> = {
  home: { x: 0.71, y: 2.27, z: 6.91, lookAt: new THREE.Vector3(0, 1, 0) },
  judge: { x: 0.43, y: 2.64, z: -3.98, lookAt: new THREE.Vector3(0, 1, 0) },
  defendant: { x: 3.56, y: 1.75, z: 2.34, lookAt: new THREE.Vector3(0, 1, 0) },
  counsel: { x: -3, y: 1.85, z: 3, lookAt: new THREE.Vector3(0, 1, 0) },
  witness: { x: 0.84, y: 2.04, z: 3.77, lookAt: new THREE.Vector3(0, 1, 0) },
  prosecutor: { x: 1.24, y: 0.6, z: 0.75, lookAt: new THREE.Vector3(0, 1, 0) },
  reporter: { x: -3.11, y: 0.54, z: -2.46, lookAt: new THREE.Vector3(0, 1, 0) },
  clerk: { x: -2.42, y: 0.58, z: -0.08, lookAt: new THREE.Vector3(0, 1, 0) },
  jury: { x: -5.27, y: 1.47, z: -2.17, lookAt: new THREE.Vector3(0, 1, 0) },
  spectator: { x: 2.77, y: 1.51, z: 6.16, lookAt: new THREE.Vector3(0, 1, 0) },
};

const CAMERA_TARGET = new THREE.Vector3(0, 1, 0);

const normalizePosition = (position: string): CourtPosition => {
  const normalized = position.trim().toLowerCase();
  return normalized in CAMERA_POSITIONS
    ? (normalized as CourtPosition)
    : "home";
};

async function getCachedModel(): Promise<ArrayBuffer> {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(MODEL_URL);

  if (cachedResponse) {
    return cachedResponse.arrayBuffer();
  }

  const response = await fetch(MODEL_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${MODEL_URL}: ${response.status} ${response.statusText}`,
    );
  }

  await cache.put(MODEL_URL, response.clone());

  return response.arrayBuffer();
}

function disposeMaterial(material: THREE.Material) {
  const materialWithTextures = material as THREE.Material & {
    [key: string]: THREE.Texture | undefined;
  };

  const textureProperties = [
    "map",
    "lightMap",
    "bumpMap",
    "normalMap",
    "specularMap",
    "emissiveMap",
    "roughnessMap",
    "metalnessMap",
    "alphaMap",
    "aoMap",
    "displacementMap",
    "clearcoatMap",
    "clearcoatNormalMap",
    "clearcoatRoughnessMap",
    "transmissionMap",
    "thicknessMap",
  ];

  textureProperties.forEach((property) => {
    materialWithTextures[property]?.dispose();
  });

  material.dispose();
}

function disposeObject3D(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    child.geometry.dispose();

    if (Array.isArray(child.material)) {
      child.material.forEach(disposeMaterial);
    } else {
      disposeMaterial(child.material);
    }
  });
}

function prepareCourtroomModel(model: THREE.Object3D) {
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);
  model.scale.set(1, 1, 1);

  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;

    object.castShadow = true;
    object.receiveShadow = true;

    if (Array.isArray(object.material)) {
      object.material.forEach((material) => {
        material.needsUpdate = true;
      });
    } else {
      object.material.needsUpdate = true;
    }
  });
}

function moveCamera(camera: THREE.PerspectiveCamera, position: CourtPosition) {
  const target = CAMERA_POSITIONS[position];

  gsap.killTweensOf(camera.position);

  gsap.to(camera.position, {
    x: target.x,
    y: target.y,
    z: target.z,
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: () => {
      camera.lookAt(target.lookAt);
    },
  });
}

function setupLighting(scene: THREE.Scene) {
  const ambientLight = new THREE.AmbientLight(0xfff4e6, 0.9);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xfff4e6, 1.5);
  mainLight.position.set(8, 12, 8);
  mainLight.castShadow = true;
  mainLight.shadow.camera.left = -20;
  mainLight.shadow.camera.right = 20;
  mainLight.shadow.camera.top = 20;
  mainLight.shadow.camera.bottom = -20;
  mainLight.shadow.mapSize.set(4096, 4096);
  mainLight.shadow.bias = -0.0001;
  scene.add(mainLight);

  const ceilingLights = [
    { position: [0, 9, -3] as const, intensity: 2 },
    { position: [-6, 9, 0] as const, intensity: 1.8 },
    { position: [6, 9, 0] as const, intensity: 1.8 },
    { position: [0, 9, 5] as const, intensity: 1.8 },
  ];

  ceilingLights.forEach(({ position, intensity }) => {
    const light = new THREE.PointLight(0xffd699, intensity, 25);
    light.position.set(position[0], position[1], position[2]);
    light.castShadow = true;
    light.shadow.mapSize.set(1024, 1024);
    scene.add(light);
  });

  const judgeSpot = new THREE.SpotLight(0xffd699, 2.5, 20, Math.PI / 5, 0.4);
  judgeSpot.position.set(0, 10, -6);
  judgeSpot.target.position.set(0, 1.8, -6);
  judgeSpot.castShadow = true;
  scene.add(judgeSpot);
  scene.add(judgeSpot.target);

  const hemisphereLight = new THREE.HemisphereLight(0xfff4e6, 0x4a3428, 0.8);
  hemisphereLight.position.set(0, 25, 0);
  scene.add(hemisphereLight);
}

export const CourtScene = forwardRef<CourtSceneHandle, CourtSceneProps>(
  ({ currentSpeaker }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const courtroomRef = useRef<THREE.Object3D | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        goTo: (position: string) => {
          const camera = cameraRef.current;

          if (!camera) return;

          moveCamera(camera, normalizePosition(position));
        },
      }),
      [],
    );

    useEffect(() => {
      const container = containerRef.current;

      if (!container) return;

      let disposed = false;
      let animationFrameId = 0;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x3d3428);
      scene.fog = new THREE.Fog(0x3d3428, 20, 60);

      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const homePosition = CAMERA_POSITIONS.home;

      camera.position.set(homePosition.x, homePosition.y, homePosition.z);
      camera.lookAt(CAMERA_TARGET);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.8;
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.copy(CAMERA_TARGET);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 4;
      controls.maxDistance = 25;
      controls.minPolarAngle = Math.PI / 6;
      controls.maxPolarAngle = Math.PI / 2.1;
      controls.update();

      setupLighting(scene);

      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(MeshoptDecoder);

      getCachedModel()
        .then((arrayBuffer) => {
          if (disposed) return;

          loader.parse(
            arrayBuffer,
            "",
            (gltf) => {
              if (disposed) {
                disposeObject3D(gltf.scene);
                return;
              }

              const courtroom = gltf.scene;

              prepareCourtroomModel(courtroom);

              courtroomRef.current = courtroom;

              scene.add(courtroom);

              console.log("Courtroom GLB added to scene");
            },
            (error) => {
              if (!disposed) {
                console.error("Failed to parse courtroom.glb:", error);
              }
            },
          );
        })
        .catch((error) => {
          if (!disposed) {
            console.error("Failed to load courtroom.glb:", error);
          }
        });

      const animate = () => {
        if (disposed) return;

        animationFrameId = requestAnimationFrame(animate);

        controls.update();

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;

        if (!newWidth || !newHeight) return;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      return () => {
        disposed = true;

        cancelAnimationFrame(animationFrameId);

        resizeObserver.disconnect();

        gsap.killTweensOf(camera.position);

        controls.dispose();

        if (courtroomRef.current) {
          disposeObject3D(courtroomRef.current);
          scene.remove(courtroomRef.current);
          courtroomRef.current = null;
        }

        renderer.dispose();

        const gl = renderer.getContext();
        const loseContext = gl.getExtension("WEBGL_lose_context");

        loseContext?.loseContext();

        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }

        cameraRef.current = null;
      };
    }, []);

    useEffect(() => {
      if (!currentSpeaker) return;

      const camera = cameraRef.current;

      if (!camera) return;

      moveCamera(camera, normalizePosition(currentSpeaker));
    }, [currentSpeaker]);

    return <div ref={containerRef} className="w-full h-full" />;
  },
);

CourtScene.displayName = "CourtScene";
