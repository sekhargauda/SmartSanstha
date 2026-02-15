import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';

interface CourtSceneProps {
  currentSpeaker: string;
}

const cameraPositions: { [key: string]: { x: number; y: number; z: number } } = {
  home: { x: 0, y: 3.5, z: 12 },
  judge: { x: 0, y: 2.2, z: -5 },
  defendant: { x: 4, y: 1.8, z: 3 },
  counsel: { x: -4, y: 1.8, z: 3 },
  witness: { x: -5, y: 1.8, z: -1 },
  prosecutor: { x: 4, y: 1.8, z: 0 },
};

export const CourtScene = forwardRef<any, CourtSceneProps>(({ currentSpeaker }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useImperativeHandle(ref, () => ({
    goTo: (position: string) => {
      const target = cameraPositions[position] || cameraPositions.home;
      if (cameraRef.current) {
        gsap.to(cameraRef.current.position, {
          x: target.x,
          y: target.y,
          z: target.z,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (cameraRef.current) {
              cameraRef.current.lookAt(0, 1.5, 0);
            }
          }
        });
      }
    }
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3d3428);
    scene.fog = new THREE.Fog(0x3d3428, 20, 60);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.5, 12);
    cameraRef.current = camera;

    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;
    // renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.5, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 25;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minPolarAngle = Math.PI / 6;
    controls.update();
    controlsRef.current = controls;

    // Professional Lighting System
    setupLighting(scene);

    // Create realistic Indian courtroom
    createRealisticIndianCourtroom(scene);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update camera when speaker changes
  useEffect(() => {
    if (currentSpeaker && cameraRef.current) {
      const target = cameraPositions[currentSpeaker.toLowerCase()] || cameraPositions.home;
      gsap.to(cameraRef.current.position, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (cameraRef.current) {
            cameraRef.current.lookAt(0, 1.5, 0);
          }
        }
      });
    }
  }, [currentSpeaker]);

  return <div ref={containerRef} className="w-full h-full" />;
});

// Enhanced Lighting Setup
function setupLighting(scene: THREE.Scene) {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xfff4e6, 0.9);
  scene.add(ambientLight);

  // Main directional light (sunlight from window)
  const mainLight = new THREE.DirectionalLight(0xfff4e6, 1.5);
  mainLight.position.set(8, 12, 8);
  mainLight.castShadow = true;
  mainLight.shadow.camera.left = -20;
  mainLight.shadow.camera.right = 20;
  mainLight.shadow.camera.top = 20;
  mainLight.shadow.camera.bottom = -20;
  mainLight.shadow.mapSize.width = 4096;
  mainLight.shadow.mapSize.height = 4096;
  mainLight.shadow.bias = -0.0001;
  scene.add(mainLight);

  // Ceiling lights (warm courtroom lighting)
  const ceilingLights = [
    { pos: [0, 9, -3], intensity: 2 },
    { pos: [-6, 9, 0], intensity: 1.8 },
    { pos: [6, 9, 0], intensity: 1.8 },
    { pos: [0, 9, 5], intensity: 1.8 }
  ];

  ceilingLights.forEach(light => {
    const pointLight = new THREE.PointLight(0xffd699, light.intensity, 25);
    pointLight.position.set(light.pos[0], light.pos[1], light.pos[2]);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    scene.add(pointLight);
  });

  // Spotlight on judge
  const judgeSpot = new THREE.SpotLight(0xffd699, 2.5, 20, Math.PI / 5, 0.4);
  judgeSpot.position.set(0, 10, -6);
  judgeSpot.target.position.set(0, 1.8, -6);
  judgeSpot.castShadow = true;
  scene.add(judgeSpot);
  scene.add(judgeSpot.target);

  // Hemisphere light for natural indoor look
  const hemisphereLight = new THREE.HemisphereLight(0xfff4e6, 0x4a3428, 0.8);
  hemisphereLight.position.set(0, 25, 0);
  scene.add(hemisphereLight);
}

// Create Realistic Indian Courtroom
function createRealisticIndianCourtroom(scene: THREE.Scene) {
  // Wooden floor with texture
  const floorGeometry = new THREE.PlaneGeometry(30, 25);
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x3d2817,
    roughness: 0.85,
    metalness: 0.05,
    map: createWoodTexture()
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Ceiling with panels
  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 25),
    new THREE.MeshStandardMaterial({ 
      color: 0xf5e6d3, 
      roughness: 0.9,
      side: THREE.DoubleSide
    })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 10;
  ceiling.receiveShadow = true;
  scene.add(ceiling);

  // Walls
  createWalls(scene);

  // Wall decorations (Constitution emblem & Ambedkar photo)
  createWallDecorations(scene);

  // Judge's complete setup
  const judgeArea = createDetailedJudgeArea();
  judgeArea.position.set(0, 0, -8);
  scene.add(judgeArea);

  // Defendant and lawyer areas
  const defendantArea = createLawyerStation('defendant');
  defendantArea.position.set(5, 0, 4);
  scene.add(defendantArea);

  const counselArea = createLawyerStation('counsel');
  counselArea.position.set(-5, 0, 4);
  scene.add(counselArea);

  const prosecutorArea = createLawyerStation('prosecutor');
  prosecutorArea.position.set(5, 0, 1);
  scene.add(prosecutorArea);

  // Witness stand
  const witnessStand = createDetailedWitnessStand();
  witnessStand.position.set(-6.5, 0, -2);
  scene.add(witnessStand);

  // Jury box
  const juryBox = createDetailedJuryBox();
  juryBox.position.set(8.5, 0, -4);
  scene.add(juryBox);

  // Gallery seating
  createGallerySeating(scene);

  // Room details
  createRoomDetails(scene);

  console.log('✅ Realistic Indian courtroom created');
}

// Create walls with wood paneling
function createWalls(scene: THREE.Scene) {
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x6b5244,
    roughness: 0.8,
    metalness: 0.02
  });

  // Back wall
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(30, 10, 0.4),
    wallMaterial
  );
  backWall.position.set(0, 5, -12.5);
  backWall.receiveShadow = true;
  scene.add(backWall);

  // Side walls
  const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 10, 25),
    wallMaterial
  );
  leftWall.position.set(-15, 5, 0);
  leftWall.receiveShadow = true;
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 10, 25),
    wallMaterial
  );
  rightWall.position.set(15, 5, 0);
  rightWall.receiveShadow = true;
  scene.add(rightWall);

  // Wood paneling on walls
  for (let i = -14; i <= 14; i += 2) {
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 8, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x4a3428, roughness: 0.7 })
    );
    panel.position.set(i, 4, -12.4);
    panel.castShadow = true;
    scene.add(panel);
  }
}

// Wall decorations - Constitution Emblem & Ambedkar Photo
function createWallDecorations(scene: THREE.Scene) {
  // Indian National Emblem (Ashoka Chakra) - center above judge
  const emblemGroup = new THREE.Group();
  
  // Gold circular base
  const emblemBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 0.15, 32),
    new THREE.MeshStandardMaterial({ 
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xffd700,
      emissiveIntensity: 0.3
    })
  );
  emblemBase.rotation.x = Math.PI / 2;
  emblemGroup.add(emblemBase);

  // Ashoka Chakra (wheel)
  const chakraGeometry = new THREE.TorusGeometry(0.5, 0.08, 16, 24);
  const chakra = new THREE.Mesh(
    chakraGeometry,
    new THREE.MeshStandardMaterial({ 
      color: 0x000080,
      metalness: 0.8,
      roughness: 0.2
    })
  );
  chakra.rotation.x = Math.PI / 2;
  emblemGroup.add(chakra);

  // Spokes
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const spoke = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.04, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x000080 })
    );
    spoke.position.x = Math.cos(angle) * 0.25;
    spoke.position.z = Math.sin(angle) * 0.25;
    spoke.rotation.y = angle;
    emblemGroup.add(spoke);
  }

  emblemGroup.position.set(0, 7.5, -12.2);
  scene.add(emblemGroup);

  // Dr. B.R. Ambedkar Photo Frame (left of emblem)
  const ambedkarFrame = createPhotoFrame(0x8b4513, 'Ambedkar');
  ambedkarFrame.position.set(-4, 6.5, -12.2);
  scene.add(ambedkarFrame);

  // Constitution of India text frame (right of emblem)
  const constitutionFrame = createPhotoFrame(0x8b4513, 'Constitution');
  constitutionFrame.position.set(4, 6.5, -12.2);
  scene.add(constitutionFrame);

  // "Satyamev Jayate" text below emblem
  createTextBanner(scene, 'सत्यमेव जयते', 0, 6, -12.1);
}

function createPhotoFrame(color: number, type: string) {
  const group = new THREE.Group();

  // Frame
  const frameBorder = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 2.4, 0.1),
    new THREE.MeshStandardMaterial({ color: color, roughness: 0.6 })
  );
  group.add(frameBorder);

  // Photo/painting
  const photo = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2.1, 0.05),
    new THREE.MeshStandardMaterial({ 
      color: type === 'Ambedkar' ? 0x2c1810 : 0xfdf5e6,
      roughness: 0.8
    })
  );
  photo.position.z = 0.05;
  group.add(photo);

  // Nameplate
  const nameplate = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.3, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8 })
  );
  nameplate.position.set(0, -1.35, 0.05);
  group.add(nameplate);

  return group;
}

function createTextBanner(scene: THREE.Scene, text: string, x: number, y: number, z: number) {
  const banner = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.5, 0.1),
    new THREE.MeshStandardMaterial({ 
      color: 0xffd700,
      metalness: 0.7,
      roughness: 0.3
    })
  );
  banner.position.set(x, y, z);
  scene.add(banner);
}

// Detailed Judge Area
function createDetailedJudgeArea() {
  const group = new THREE.Group();

  // Elevated platform (3 steps)
  for (let i = 0; i < 3; i++) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.3, 3 - i * 0.5),
      new THREE.MeshStandardMaterial({ color: 0x4a3428, roughness: 0.7 })
    );
    step.position.set(0, 0.15 + i * 0.3, -0.25 * i);
    step.castShadow = true;
    group.add(step);
  }

  // Judge's desk (tall and imposing)
  const deskMain = new THREE.Mesh(
    new THREE.BoxGeometry(7, 1.8, 2.5),
    new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.5 })
  );
  deskMain.position.set(0, 1.95, 0);
  deskMain.castShadow = true;
  group.add(deskMain);

  // Desk details
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(7.2, 0.15, 2.7),
    new THREE.MeshStandardMaterial({ color: 0x2c1810, roughness: 0.4 })
  );
  deskTop.position.set(0, 2.93, 0);
  group.add(deskTop);

  // Judge's chair
  const chair = createDetailedChair(0x8b0000, 1.2);
  chair.position.set(0, 1.2, -0.5);
  group.add(chair);

  // Judge figure
  const judge = createRealisticPerson(0x000000, true); // Black robe
  judge.position.set(0, 3.1, 0);
  group.add(judge);

  // Gavel and block
  const gavelSet = createGavel();
  gavelSet.position.set(1.5, 3.05, 1);
  group.add(gavelSet);

  // Law books on desk
  const bookPositions = [
    [-2.5, 3.05, 0.8],
    [-2, 3.05, 0.8],
    [-1.5, 3.2, 0.8]
  ];
  bookPositions.forEach((pos, i) => {
    const book = createBook(0x8b0000 + i * 0x001100);
    book.position.set(pos[0], pos[1], pos[2]);
    group.add(book);
  });

  // Papers and files
  for (let i = 0; i < 3; i++) {
    const paper = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.02, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
    );
    paper.position.set(0.5 + i * 0.5, 3.05, 0.3);
    paper.rotation.y = Math.random() * 0.2;
    group.add(paper);
  }

  // Pen stand
  const penStand = createPenStand();
  penStand.position.set(2.5, 3.05, 0.5);
  group.add(penStand);

  // Nameplate
  const nameplate = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.4, 0.15),
    new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 })
  );
  nameplate.position.set(0, 3.1, 1.2);
  group.add(nameplate);

  // Indian flag (small)
  const flag = createIndianFlag();
  flag.position.set(-3, 3.3, 0.8);
  group.add(flag);

  return group;
}

// Lawyer/Defendant Station
function createLawyerStation(type: string) {
  const group = new THREE.Group();

  // Desk
  const desk = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.2, 2),
    new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.6 })
  );
  desk.position.y = 1.2;
  desk.castShadow = true;
  group.add(desk);

  // Legs
  const legGeometry = new THREE.BoxGeometry(0.15, 1.2, 0.15);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.7 });
  
  [[-1.1, -0.85], [1.1, -0.85], [-1.1, 0.85], [1.1, 0.85]].forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos[0], 0.6, pos[1]);
    leg.castShadow = true;
    group.add(leg);
  });

  // Chair
  const chair = createDetailedChair(0x4a3428, 0.8);
  chair.position.set(0, 0.5, -0.7);
  group.add(chair);

  // Person sitting
  const person = createRealisticPerson(
    type === 'defendant' ? 0x2c5aa0 : 
    type === 'counsel' ? 0x000000 : 
    0x1a1a1a,
    type === 'counsel' || type === 'prosecutor'
  );
  person.position.set(0, 1.5, 0);
  group.add(person);

  // Law books
  for (let i = 0; i < 4; i++) {
    const book = createBook(0x8b0000 + i * 0x002200);
    book.position.set(-0.8 + i * 0.5, 1.35, 0.6);
    book.rotation.y = (Math.random() - 0.5) * 0.4;
    group.add(book);
  }

  // Laptop/papers
  const laptop = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.03, 0.4),
    new THREE.MeshStandardMaterial({ color: 0x2c2c2c, metalness: 0.7, roughness: 0.3 })
  );
  laptop.position.set(0.6, 1.35, 0);
  laptop.rotation.y = -0.3;
  group.add(laptop);

  // Glass of water
  const glass = createWaterGlass();
  glass.position.set(-0.8, 1.35, -0.5);
  group.add(glass);

  // Briefcase beside desk
  const briefcase = createBriefcase();
  briefcase.position.set(-1.5, 0.2, 0);
  group.add(briefcase);

  return group;
}

// Detailed Witness Stand
function createDetailedWitnessStand() {
  const group = new THREE.Group();

  // Base platform
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 0.3, 1.8),
    new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.6 })
  );
  base.position.y = 0.15;
  base.castShadow = true;
  group.add(base);

  // Box enclosure
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 2, 1.5),
    new THREE.MeshStandardMaterial({ color: 0x4a3428, roughness: 0.7 })
  );
  box.position.y = 1.3;
  box.castShadow = true;
  group.add(box);

  // Railing/ledge
  const railing = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.15, 1.7),
    new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.5 })
  );
  railing.position.y = 2.3;
  group.add(railing);

  // Witness figure
  const witness = createRealisticPerson(0x4a5568, false);
  witness.position.set(0, 2.5, 0);
  group.add(witness);

  // Microphone
  const mic = createMicrophone();
  mic.position.set(0.4, 2.4, 0.4);
  group.add(mic);

  // Bible/Gita for oath
  const holyBook = createBook(0x8b0000);
  holyBook.scale.set(1.2, 1.2, 1.2);
  holyBook.position.set(-0.3, 2.4, 0.5);
  group.add(holyBook);

  return group;
}

// Detailed Jury Box
function createDetailedJuryBox() {
  const group = new THREE.Group();

  // Main structure
  const structure = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 1.5, 5),
    new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.7 })
  );
  structure.position.y = 0.75;
  structure.castShadow = true;
  group.add(structure);

  // Railing
  const railing = new THREE.Mesh(
    new THREE.BoxGeometry(2.7, 0.15, 5.2),
    new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.6 })
  );
  railing.position.y = 1.5;
  group.add(railing);

  // Jury members (2 rows of 3)
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const juror = createRealisticPerson(
        [0x2c5aa0, 0x4a5568, 0x6d4c41][col],
        false
      );
      juror.scale.set(0.9, 0.9, 0.9);
      juror.position.set(
        0.5 - row * 1,
        1.8,
        -1.6 + col * 1.6
      );
      group.add(juror);
    }
  }

  return group;
}

// Gallery Seating
function createGallerySeating(scene: THREE.Scene) {
  for (let row = 0; row < 5; row++) {
    // Bench
    const bench = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.7, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.7 })
    );
    bench.position.set(0, 0.35, 7 + row * 2);
    bench.castShadow = true;
    scene.add(bench);

    // Backrest
    const backrest = new THREE.Mesh(
      new THREE.BoxGeometry(12, 1.5, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x6d4c41, roughness: 0.7 })
    );
    backrest.position.set(0, 1.1, 6.4 + row * 2);
    backrest.castShadow = true;
    scene.add(backrest);

    // Spectators (fewer in back rows)
    const numSpectators = Math.max(2, 5 - row);
    for (let i = 0; i < numSpectators; i++) {
      const spectator = createRealisticPerson(
        [0x2c3e50, 0x34495e, 0x7f8c8d, 0x95a5a6][i % 4],
        false
      );
      spectator.scale.set(0.8, 0.8, 0.8);
      spectator.position.set(
        -5 + (i * 10 / numSpectators),
        0.95,
        7 + row * 2
      );
      scene.add(spectator);
    }
  }
}

// Room Details
function createRoomDetails(scene: THREE.Scene) {
  // Windows on left wall
  for (let i = 0; i < 3; i++) {
    const window = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 3, 2),
      new THREE.MeshStandardMaterial({ 
        color: 0x87ceeb,
        transparent: true,
        opacity: 0.6,
        metalness: 0.8,
        roughness: 0.2
      })
    );
    window.position.set(-14.9, 5, -6 + i * 6);
    scene.add(window);

    // Window frame
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 3.2, 2.2),
      new THREE.MeshStandardMaterial({ color: 0x3e2723 })
    );
    frame.position.set(-14.85, 5, -6 + i * 6);
    scene.add(frame);
  }

  // Ceiling lights (visible fixtures)
  const lightPositions = [[0, -3], [-6, 0], [6, 0], [0, 5]];
  lightPositions.forEach(pos => {
    const fixture = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.5, 0.3, 16),
      new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        emissive: 0xffd699,
        emissiveIntensity: 0.5
      })
    );
    fixture.position.set(pos[0], 9.85, pos[1]);
    scene.add(fixture);
  });

  // Pillars with capitals
  const pillarPositions = [
    [-12, -10], [12, -10],
    [-12, 10], [12, 10]
  ];
  
  pillarPositions.forEach(pos => {
    // Pillar
    const pillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 10, 16),
      new THREE.MeshStandardMaterial({ 
        color: 0xa0826d,
        roughness: 0.6
      })
    );
    pillar.position.set(pos[0], 5, pos[1]);
    pillar.castShadow = true;
    scene.add(pillar);

    // Base
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.7, 0.5, 16),
      new THREE.MeshStandardMaterial({ color: 0x8b7355 })
    );
    base.position.set(pos[0], 0.25, pos[1]);
    scene.add(base);

    // Capital
    const capital = new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.5, 0.6, 16),
      new THREE.MeshStandardMaterial({ color: 0x8b7355 })
    );
    capital.position.set(pos[0], 10.3, pos[1]);
    scene.add(capital);
  });

  // Clock on back wall
  const clock = createClock();
  clock.position.set(7, 7, -12.2);
  scene.add(clock);
}

// Helper Functions for Objects

function createRealisticPerson(bodyColor: number, hasRobe: boolean) {
  const group = new THREE.Group();

  // Torso
  const torso = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.9, 0.35),
    new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.7 })
  );
  torso.position.y = 0.45;
  torso.castShadow = true;
  group.add(torso);

  if (hasRobe) {
    // Robe overlay
    const robe = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 1.1, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.8 })
    );
    robe.position.y = 0.4;
    group.add(robe);

    // White collar
    const collar = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.15, 0.3),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    collar.position.y = 0.85;
    group.add(collar);
  }

  // Neck
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.15, 8),
    new THREE.MeshStandardMaterial({ color: 0xfdbcb4, roughness: 0.6 })
  );
  neck.position.y = 0.98;
  group.add(neck);

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xfdbcb4, roughness: 0.6 })
  );
  head.position.y = 1.25;
  head.castShadow = true;
  group.add(head);

  // Hair
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.26, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 })
  );
  hair.position.y = 1.4;
  group.add(hair);

  // Arms
  [-0.35, 0.35].forEach(x => {
    const arm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.7, 8),
      new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.7 })
    );
    arm.position.set(x, 0.3, 0);
    arm.rotation.z = x > 0 ? -0.3 : 0.3;
    group.add(arm);

    // Hands
    const hand = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xfdbcb4, roughness: 0.6 })
    );
    hand.position.set(x * 1.3, -0.05, 0);
    group.add(hand);
  });

  return group;
}

function createDetailedChair(color: number, scale: number) {
  const group = new THREE.Group();
  
  // Seat
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.1, 0.6),
    new THREE.MeshStandardMaterial({ color, roughness: 0.7 })
  );
  seat.castShadow = true;
  group.add(seat);

  // Backrest
  const backrest = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.8, 0.1),
    new THREE.MeshStandardMaterial({ color, roughness: 0.7 })
  );
  backrest.position.set(0, 0.45, -0.25);
  backrest.castShadow = true;
  group.add(backrest);

  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 8);
  const legMaterial = new THREE.MeshStandardMaterial({ color, roughness: 0.7 });
  
  [[-0.25, -0.25], [0.25, -0.25], [-0.25, 0.25], [0.25, 0.25]].forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(pos[0], -0.3, pos[1]);
    leg.castShadow = true;
    group.add(leg);
  });

  // Armrests
  [-0.35, 0.35].forEach(x => {
    const armrest = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 0.4),
      new THREE.MeshStandardMaterial({ color, roughness: 0.7 })
    );
    armrest.position.set(x, 0.2, 0);
    group.add(armrest);
  });

  group.scale.set(scale, scale, scale);
  return group;
}

function createBook(color: number) {
  const group = new THREE.Group();
  
  // Cover
  const cover = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.5, 0.05),
    new THREE.MeshStandardMaterial({ color, roughness: 0.8 })
  );
  cover.castShadow = true;
  group.add(cover);

  // Pages
  const pages = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.47, 0.04),
    new THREE.MeshStandardMaterial({ color: 0xfdf5e6, roughness: 0.9 })
  );
  pages.position.z = 0.005;
  group.add(pages);

  // Spine
  const spine = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.5, 0.05),
    new THREE.MeshStandardMaterial({ color: color - 0x111111, roughness: 0.7 })
  );
  spine.position.x = -0.2;
  group.add(spine);

  group.rotation.x = Math.PI / 2;
  return group;
}

function createGavel() {
  const group = new THREE.Group();

  // Handle
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.4, 8),
    new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.4 })
  );
  handle.rotation.z = Math.PI / 2;
  handle.position.x = 0.15;
  group.add(handle);

  // Head
  const head = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.15, 8),
    new THREE.MeshStandardMaterial({ color: 0x654321, roughness: 0.3 })
  );
  head.rotation.z = Math.PI / 2;
  head.position.x = 0.35;
  group.add(head);

  // Block
  const block = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16),
    new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.4 })
  );
  block.position.set(-0.15, -0.04, 0);
  group.add(block);

  return group;
}

function createPenStand() {
  const group = new THREE.Group();

  // Stand
  const stand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.15, 8),
    new THREE.MeshStandardMaterial({ color: 0x4a3428, roughness: 0.6 })
  );
  group.add(stand);

  // Pens
  for (let i = 0; i < 3; i++) {
    const pen = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 0.2, 6),
      new THREE.MeshStandardMaterial({ 
        color: [0x0000ff, 0x000000, 0xff0000][i],
        roughness: 0.5
      })
    );
    pen.position.set(
      (i - 1) * 0.03,
      0.15,
      0
    );
    group.add(pen);
  }

  return group;
}

function createIndianFlag() {
  const group = new THREE.Group();

  // Pole
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.8, 8),
    new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.8 })
  );
  pole.position.y = 0.4;
  group.add(pole);

  // Flag (tricolor)
  const flagHeight = 0.3;
  const flagWidth = 0.4;
  
  // Saffron
  const saffron = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, flagHeight / 3, flagWidth),
    new THREE.MeshStandardMaterial({ color: 0xff9933 })
  );
  saffron.position.set(0, 0.7, 0);
  group.add(saffron);

  // White with Ashoka Chakra
  const white = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, flagHeight / 3, flagWidth),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  white.position.set(0, 0.6, 0);
  group.add(white);

  // Chakra
  const chakra = new THREE.Mesh(
    new THREE.TorusGeometry(0.04, 0.008, 8, 16),
    new THREE.MeshStandardMaterial({ color: 0x000080 })
  );
  chakra.position.set(0.02, 0.6, 0);
  chakra.rotation.y = Math.PI / 2;
  group.add(chakra);

  // Green
  const green = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, flagHeight / 3, flagWidth),
    new THREE.MeshStandardMaterial({ color: 0x138808 })
  );
  green.position.set(0, 0.5, 0);
  group.add(green);

  return group;
}

function createWaterGlass() {
  const group = new THREE.Group();

  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.05, 0.15, 16),
    new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      roughness: 0.1,
      metalness: 0.1
    })
  );
  glass.position.y = 0.075;
  group.add(glass);

  // Water
  const water = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.048, 0.12, 16),
    new THREE.MeshStandardMaterial({ 
      color: 0x87ceeb,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1
    })
  );
  water.position.y = 0.06;
  group.add(water);

  return group;
}

function createBriefcase() {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.4, 0.15),
    new THREE.MeshStandardMaterial({ color: 0x654321, roughness: 0.5 })
  );
  body.castShadow = true;
  group.add(body);

  // Handle
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.1, 0.02, 8, 16, Math.PI),
    new THREE.MeshStandardMaterial({ color: 0x8b4513 })
  );
  handle.position.y = 0.25;
  handle.rotation.x = Math.PI / 2;
  group.add(handle);

  // Locks
  [-0.15, 0.15].forEach(x => {
    const lock = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.03, 0.02),
      new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9 })
    );
    lock.position.set(x, 0, 0.08);
    group.add(lock);
  });

  return group;
}

function createMicrophone() {
  const group = new THREE.Group();

  // Stand
  const stand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, 0.3, 8),
    new THREE.MeshStandardMaterial({ color: 0x2c2c2c, metalness: 0.8 })
  );
  stand.position.y = 0.15;
  group.add(stand);

  // Mic head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7 })
  );
  head.position.y = 0.32;
  group.add(head);

  return group;
}

function createClock() {
  const group = new THREE.Group();

  // Frame
  const frame = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.6, 0.1, 32),
    new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.6 })
  );
  frame.rotation.x = Math.PI / 2;
  group.add(frame);

  // Face
  const face = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 0.05, 32),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
  );
  face.rotation.x = Math.PI / 2;
  face.position.z = 0.05;
  group.add(face);

  // Hour hand
  const hourHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.25, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x000000 })
  );
  hourHand.position.set(0, 0.12, 0.08);
  hourHand.rotation.z = Math.PI / 4;
  group.add(hourHand);

  // Minute hand
  const minuteHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, 0.35, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x000000 })
  );
  minuteHand.position.set(0, 0.17, 0.08);
  minuteHand.rotation.z = Math.PI / 6;
  group.add(minuteHand);

  return group;
}

function createWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Wood grain effect
    ctx.fillStyle = '#3d2817';
    ctx.fillRect(0, 0, 512, 512);
    
    ctx.strokeStyle = '#2c1810';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 25);
      ctx.lineTo(512, i * 25 + Math.random() * 10);
      ctx.stroke();
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

CourtScene.displayName = 'CourtScene';