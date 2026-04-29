// import React, { useState, useEffect, useRef } from "react";
// import {
//   Scale,
//   Gavel,
//   Users,
//   BookOpen,
//   ArrowLeft,
//   ChevronRight,
//   ChevronLeft,
//   Award,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Monitor,
//   Smartphone,
// } from "lucide-react";
// import { Card } from "../components/common/Card";
// import { Button } from "../components/common/Button";
// import { CourtScene } from "../components/court/CourtScene";
// import { useMediaQuery } from "../hooks/useMediaQuery";

// interface Scenario {
//   _id: string;
//   title: string;
//   article: string;
//   description: string;
//   roleplay: {
//     speaker: string;
//     line: string;
//   }[];
//   verdictOptions: string[];
//   correctVerdict: string;
//   explanation?: string;
// }

// interface CourtSimulationPageProps {
//   onNavigate: (page: string) => void;
// }

// const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// export const CourtSimulationPage: React.FC<CourtSimulationPageProps> = ({
//   onNavigate,
// }) => {
//   const [scenarios, setScenarios] = useState<Scenario[]>([]);
//   const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
//     null
//   );
//   const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
//   const [gameState, setGameState] = useState<
//     "selection" | "roleplay" | "verdict" | "conclusion"
//   >("selection");
//   const [selectedVerdict, setSelectedVerdict] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const sceneRef = useRef<any>(null);

//   useEffect(() => {
//     fetchScenarios();
//   }, []);

//   const fetchScenarios = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/court/scenarios`,{
//         credentials: 'include',
//       });
//       if (!response.ok) throw new Error("Failed to fetch scenarios");
//       const data = await response.json();
//       setScenarios(data.success ? data.data : []);
//     } catch (err: any) {
//       console.error("Error fetching scenarios:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startScenario = (scenario: Scenario) => {
//     setSelectedScenario(scenario);
//     setCurrentDialogueIndex(0);
//     setGameState("roleplay");
//     setSelectedVerdict(null);
//   };

//   const nextDialogue = () => {
//     if (
//       selectedScenario &&
//       currentDialogueIndex < selectedScenario.roleplay.length - 1
//     ) {
//       setCurrentDialogueIndex((prev) => prev + 1);
//     }
//   };

//   const previousDialogue = () => {
//     if (currentDialogueIndex > 0) {
//       setCurrentDialogueIndex((prev) => prev - 1);
//     }
//   };

//   const goToVerdict = () => {
//     setGameState("verdict");
//   };

//   const submitVerdict = (verdict: string) => {
//     setSelectedVerdict(verdict);
//     setGameState("conclusion");
//   };

//   const resetGame = () => {
//     setSelectedScenario(null);
//     setCurrentDialogueIndex(0);
//     setGameState("selection");
//     setSelectedVerdict(null);
//   };

//   const getSpeakerIcon = (speaker: string) => {
//     const icons: { [key: string]: React.ReactNode } = {
//       judge: <Gavel className="w-4 h-4" />,
//       defendant: <Users className="w-4 h-4" />,
//       counsel: <BookOpen className="w-4 h-4" />,
//       witness: <Users className="w-4 h-4" />,
//       prosecutor: <Scale className="w-4 h-4" />,
//     };
//     return icons[speaker.toLowerCase()] || <Users className="w-4 h-4" />;
//   };

//   const getSpeakerColor = (speaker: string) => {
//     const colors: { [key: string]: string } = {
//       judge: "from-red-500 to-orange-500",
//       defendant: "from-blue-500 to-cyan-500",
//       counsel: "from-purple-500 to-pink-500",
//       witness: "from-green-500 to-emerald-500",
//       prosecutor: "from-yellow-500 to-orange-500",
//     };
//     return colors[speaker.toLowerCase()] || "from-slate-500 to-slate-600";
//   };

//   if (isMobile) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center px-4">
//         <Card className="max-w-md text-center">
//           <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
//             <Monitor className="w-10 h-10 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-white mb-4">
//             Desktop Only Experience
//           </h2>
//           <p className="text-slate-400 mb-6">
//             The Virtual Courtroom Simulation requires a larger screen for the
//             best experience. Please access this feature on a desktop or laptop
//             computer.
//           </p>
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <Smartphone className="w-12 h-12 text-red-400" />
//             <XCircle className="w-8 h-8 text-red-400" />
//           </div>
//           <Button
//             onClick={() => onNavigate("games")}
//             icon={<ArrowLeft className="w-5 h-5" />}
//           >
//             Back to Games
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-screen flex flex-col bg-slate-900">
//       {/* Compact Header */}
//       <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-sm border-b border-slate-700 shadow-xl z-20">
//         <div className="max-w-7xl mx-auto px-4 py-2">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() =>
//                 gameState === "selection" ? onNavigate("games") : resetGame()
//               }
//               className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors text-sm"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span>
//                 {gameState === "selection"
//                   ? "Back to Games"
//                   : "Exit Simulation"}
//               </span>
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
//                 <Scale className="w-4 h-4 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-base font-bold text-white">
//                   Virtual Courtroom
//                 </h1>
//                 <p className="text-[10px] text-slate-400">
//                   Constitutional Law Simulation
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 3D Scene Container - Takes majority of space */}
//       <div className="flex-1 relative overflow-hidden min-h-0">
//         <CourtScene
//           ref={sceneRef}
//           currentSpeaker={
//             selectedScenario && gameState === "roleplay"
//               ? selectedScenario.roleplay[currentDialogueIndex]?.speaker
//               : "home"
//           }
//         />

//         {/* INSIDE SCENE: Scenario Selection */}
//         {gameState === "selection" && (
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg z-10">
//             <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6">
//               <div className="text-center mb-5">
//                 <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
//                   <Scale className="w-7 h-7 text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold text-white mb-1">
//                   Select a Scenario
//                 </h2>
//                 <p className="text-slate-400 text-xs">
//                   Choose a constitutional case to begin
//                 </p>
//               </div>

//               {loading ? (
//                 <div className="text-center py-6">
//                   <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
//                   <p className="text-slate-400 text-xs">Loading scenarios...</p>
//                 </div>
//               ) : error ? (
//                 <div className="text-center py-6">
//                   <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
//                   <p className="text-red-400 mb-3 text-xs">{error}</p>
//                   <button
//                     onClick={fetchScenarios}
//                     className="px-4 py-2 bg-orange-500 rounded-lg text-white text-xs font-semibold hover:bg-orange-600"
//                   >
//                     Retry
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
//                   {scenarios.map((scenario) => (
//                     <div
//                       key={scenario._id}
//                       onClick={() => startScenario(scenario)}
//                       className="cursor-pointer bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-orange-500 rounded-lg p-3 transition-all"
//                     >
//                       <div className="flex items-start gap-2">
//                         <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                           <Scale className="w-4 h-4 text-white" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2 mb-0.5">
//                             <h3 className="text-sm font-bold text-white truncate">
//                               {scenario.title}
//                             </h3>
//                             <span className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 text-[9px] font-semibold whitespace-nowrap">
//                               {scenario.article}
//                             </span>
//                           </div>
//                           <p className="text-slate-400 text-[10px] line-clamp-1">
//                             {scenario.description}
//                           </p>
//                         </div>
//                         <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* INSIDE SCENE: Dialog Bubble */}
//         {gameState === "roleplay" && selectedScenario && (
//           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl z-10">
//             <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-xl shadow-2xl p-4">
//               <div className="flex items-start gap-3">
//                 <div
//                   className={`w-10 h-10 bg-gradient-to-br ${getSpeakerColor(
//                     selectedScenario.roleplay[currentDialogueIndex].speaker
//                   )} rounded-lg flex items-center justify-center flex-shrink-0`}
//                 >
//                   {getSpeakerIcon(
//                     selectedScenario.roleplay[currentDialogueIndex].speaker
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-bold text-white capitalize text-sm mb-1">
//                     {selectedScenario.roleplay[currentDialogueIndex].speaker}
//                   </h4>
//                   <p className="text-slate-200 text-sm leading-relaxed">
//                     "{selectedScenario.roleplay[currentDialogueIndex].line}"
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* INSIDE SCENE: Verdict Selection */}
//         {gameState === "verdict" && selectedScenario && (
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl z-10">
//             <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6">
//               <div className="text-center mb-5">
//                 <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
//                   <Gavel className="w-7 h-7 text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold text-white mb-1">
//                   Your Verdict
//                 </h2>
//                 <p className="text-slate-400 text-xs">
//                   As the judge, what is your decision?
//                 </p>
//               </div>

//               <div className="space-y-2 max-h-60 overflow-y-auto">
//                 {selectedScenario.verdictOptions.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => submitVerdict(option)}
//                     className="w-full p-3 bg-slate-700/50 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 border border-slate-600 hover:border-orange-500 rounded-lg text-left transition-all group"
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className="text-white text-xs font-medium group-hover:text-orange-400">
//                         {option}
//                       </span>
//                       <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400" />
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* INSIDE SCENE: Conclusion */}
//         {gameState === "conclusion" && selectedScenario && selectedVerdict && (
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-xl z-10">
//             <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6 max-h-[70vh] overflow-y-auto">
//               <div className="text-center">
//                 {selectedVerdict === selectedScenario.correctVerdict ? (
//                   <>
//                     <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
//                       <CheckCircle className="w-7 h-7 text-white" />
//                     </div>
//                     <h2 className="text-2xl font-bold text-green-400 mb-2">
//                       Correct Verdict!
//                     </h2>
//                     <p className="text-sm text-slate-300 mb-4">
//                       Your judgment aligns with the correct legal interpretation
//                       of {selectedScenario.article}.
//                     </p>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
//                       <XCircle className="w-7 h-7 text-white" />
//                     </div>
//                     <h2 className="text-2xl font-bold text-red-400 mb-2">
//                       Incorrect Verdict
//                     </h2>
//                     <p className="text-sm text-slate-300 mb-2">
//                       The correct verdict was:
//                     </p>
//                     <div className="inline-block px-3 py-1.5 bg-green-500/20 border border-green-500 rounded-lg mb-4">
//                       <p className="text-green-400 font-bold text-xs">
//                         "{selectedScenario.correctVerdict}"
//                       </p>
//                     </div>
//                   </>
//                 )}

//                 {selectedScenario.explanation && (
//                   <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4 text-left">
//                     <div className="flex items-start gap-2">
//                       <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <h4 className="font-bold text-white mb-1 text-xs">
//                           Legal Explanation
//                         </h4>
//                         <p className="text-slate-300 text-[10px] leading-relaxed">
//                           {selectedScenario.explanation}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex gap-2 justify-center">
//                   <button
//                     onClick={resetGame}
//                     className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 rounded-lg text-white text-xs font-semibold hover:bg-slate-600"
//                   >
//                     <ArrowLeft className="w-3 h-3" />
//                     Another Case
//                   </button>
//                   <button
//                     onClick={() => onNavigate("learn")}
//                     className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 rounded-lg text-white text-xs font-semibold hover:bg-orange-600"
//                   >
//                     <BookOpen className="w-3 h-3" />
//                     Learn More
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* OUTSIDE SCENE: Controls Only (Case Info + Navigation) */}
//       {gameState === "roleplay" && selectedScenario && (
//         <div className="bg-slate-800/95 backdrop-blur-sm border-t border-slate-700 shadow-xl">
//           <div className="max-w-7xl mx-auto px-4 py-2.5">
//             {/* Case Info + Progress */}
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center gap-2.5">
//                 <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
//                   <Scale className="w-3.5 h-3.5 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-white text-xs">
//                     {selectedScenario.title}
//                   </h3>
//                   <p className="text-[9px] text-slate-400">
//                     {selectedScenario.article}
//                   </p>
//                 </div>
//               </div>
//               <div className="px-2 py-1 bg-slate-700 rounded-md text-slate-300 text-[10px] font-semibold">
//                 {currentDialogueIndex + 1} / {selectedScenario.roleplay.length}
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="mb-2.5">
//               <div className="w-full bg-slate-700 rounded-full h-1">
//                 <div
//                   className="bg-gradient-to-r from-orange-500 to-red-500 h-1 rounded-full transition-all duration-300"
//                   style={{
//                     width: `${
//                       ((currentDialogueIndex + 1) /
//                         selectedScenario.roleplay.length) *
//                       100
//                     }%`,
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Navigation Buttons - Centered and Compact */}
//             <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto">
//               <button
//                 onClick={previousDialogue}
//                 disabled={currentDialogueIndex === 0}
//                 className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
//                   currentDialogueIndex === 0
//                     ? "bg-slate-700 text-slate-500 cursor-not-allowed"
//                     : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
//                 }`}
//               >
//                 <ChevronLeft className="w-3 h-3" />
//                 Back
//               </button>

//               {currentDialogueIndex === selectedScenario.roleplay.length - 1 ? (
//                 <button
//                   onClick={goToVerdict}
//                   className="flex items-center justify-center gap-1 px-6 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white text-[11px] font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
//                 >
//                   <Gavel className="w-3 h-3" />
//                   Deliver Verdict
//                 </button>
//               ) : (
//                 <button
//                   onClick={nextDialogue}
//                   className="flex items-center justify-center gap-1 px-6 py-1.5 bg-orange-500 rounded-lg text-white text-[11px] font-semibold hover:bg-orange-600 transition-all"
//                 >
//                   Next
//                   <ChevronRight className="w-3 h-3" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };









// // frontend/src/pages/CourtSimulationPage.tsx

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Scale,
//   Gavel,
//   Users,
//   BookOpen,
//   ArrowLeft,
//   ChevronRight,
//   ChevronLeft,
//   Award,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Monitor,
//   Smartphone,
//   Volume2,
//   VolumeX
// } from "lucide-react";
// import { Card } from "../components/common/Card";
// import { Button } from "../components/common/Button";
// import { CourtScene } from "../components/court/CourtScene";
// import { useMediaQuery } from "../hooks/useMediaQuery";

// interface Scenario {
//   _id: string;
//   title: string;
//   article: string;
//   description: string;
//   roleplay: {
//     speaker: string;
//     line: string;
//   }[];
//   verdictOptions: string[];
//   correctVerdict: string;
//   explanation?: string;
// }

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";


// export const CourtSimulationPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [scenarios, setScenarios] = useState<Scenario[]>([]);
//   const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
//   const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
//   const [gameState, setGameState] = useState<
//     "selection" | "description" | "roleplay" | "verdict" | "conclusion"
//   >("selection");

//   const [selectedVerdict, setSelectedVerdict] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const sceneRef = useRef<any>(null);

//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       containerRef.current?.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   const minimizeScreen = () => {
//     document.exitFullscreen();
//     setIsFullscreen(false);
//   };


//   // Text-to-Speech State
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

//   const speakText = (text: string) => {
//     if (!window.speechSynthesis) return;

//     // Stop previous speech
//     window.speechSynthesis.cancel();

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.rate = 1;      // speed
//     utterance.pitch = 1;     // tone
//     utterance.volume = 1;    // volume

//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);

//     utteranceRef.current = utterance;
//     window.speechSynthesis.speak(utterance);
//   };

//   const stopSpeech = () => {
//     window.speechSynthesis.cancel();
//     setIsSpeaking(false);
//   };

//   useEffect(() => {
//     if (gameState === "roleplay" && selectedScenario) {
//       const line =
//         selectedScenario.roleplay[currentDialogueIndex]?.line;

//       if (line) speakText(line);
//     }
//   }, [currentDialogueIndex, gameState]);


//   useEffect(() => {
//     fetchScenarios();
//   }, []);


//   const fetchScenarios = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/court/scenarios`, {
//         credentials: 'include',
//       });
//       if (!response.ok) throw new Error("Failed to fetch scenarios");
//       const data = await response.json();
//       setScenarios(data.success ? data.data : []);
//     } catch (err: any) {
//       console.error("Error fetching scenarios:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startScenario = (scenario: Scenario) => {
//     setSelectedScenario(scenario);
//     setCurrentDialogueIndex(0);
//     setGameState("description");
//     setSelectedVerdict(null);
//   };


//   const nextDialogue = () => {
//     if (
//       selectedScenario &&
//       currentDialogueIndex < selectedScenario.roleplay.length - 1
//     ) {
//       setCurrentDialogueIndex((prev) => prev + 1);
//     }
//   };

//   const previousDialogue = () => {
//     if (currentDialogueIndex > 0) {
//       setCurrentDialogueIndex((prev) => prev - 1);
//     }
//   };

//   const goToVerdict = () => {
//     setGameState("verdict");
//   };

//   const submitVerdict = (verdict: string) => {
//     setSelectedVerdict(verdict);
//     setGameState("conclusion");
//   };

//   const resetGame = () => {
//     setSelectedScenario(null);
//     setCurrentDialogueIndex(0);
//     setGameState("selection");
//     setSelectedVerdict(null);
//   };

//   const getSpeakerIcon = (speaker: string) => {
//     const icons: { [key: string]: React.ReactNode } = {
//       judge: <Gavel className="w-4 h-4" />,
//       defendant: <Users className="w-4 h-4" />,
//       counsel: <BookOpen className="w-4 h-4" />,
//       witness: <Users className="w-4 h-4" />,
//       prosecutor: <Scale className="w-4 h-4" />,
//     };
//     return icons[speaker.toLowerCase()] || <Users className="w-4 h-4" />;
//   };

//   const getSpeakerColor = (speaker: string) => {
//     const colors: { [key: string]: string } = {
//       judge: "from-red-500 to-orange-500",
//       defendant: "from-blue-500 to-cyan-500",
//       counsel: "from-purple-500 to-pink-500",
//       witness: "from-green-500 to-emerald-500",
//       prosecutor: "from-yellow-500 to-orange-500",
//     };
//     return colors[speaker.toLowerCase()] || "from-slate-500 to-slate-600";
//   };

//   if (isMobile) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center px-4">
//         <Card className="max-w-md text-center">
//           <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
//             <Monitor className="w-10 h-10 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-white mb-4">
//             Desktop Only Experience
//           </h2>
//           <p className="text-slate-400 mb-6">
//             The Virtual Courtroom Simulation requires a larger screen for the
//             best experience. Please access this feature on a desktop or laptop
//             computer.
//           </p>
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <Smartphone className="w-12 h-12 text-red-400" />
//             <XCircle className="w-8 h-8 text-red-400" />
//           </div>
//           <Button
//             onClick={() => navigate('/games')}
//             icon={<ArrowLeft className="w-5 h-5" />}
//           >
//             Back to Games
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-screen flex flex-col bg-slate-900">
//       {/* Compact Header */}
//       <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-sm border-b border-slate-700 shadow-xl z-20">
//         <div className="max-w-7xl mx-auto px-4 py-2">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() =>
//                 gameState === "selection" ? navigate('/games') : resetGame()
//               }
//               className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors text-sm"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span>
//                 {gameState === "selection"
//                   ? "Back to Games"
//                   : "Exit Simulation"}
//               </span>
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
//                 <Scale className="w-4 h-4 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-base font-bold text-white">
//                   Virtual Courtroom
//                 </h1>
//                 <p className="text-[10px] text-slate-400">
//                   Constitutional Law Simulation
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 3D Scene Container - Takes majority of space */}
//       <div
//         ref={containerRef}
//         className="flex-1 relative overflow-hidden min-h-0"
//       >
//         {/* Fullscreen / Minimize Controls */}
//         <div className="absolute top-3 right-3 z-20 flex gap-2">
//           <button
//             onClick={toggleFullscreen}
//             className="p-2 bg-slate-800/80 border border-slate-600 rounded-lg hover:bg-slate-700"
//           >
//             {isFullscreen ? (
//               <Monitor className="w-4 h-4 text-red-400" />
//             ) : (
//               <Monitor className="w-4 h-4 text-green-400" />
//             )}
//           </button>

//           {isFullscreen && (
//             <button
//               onClick={minimizeScreen}
//               className="p-2 bg-slate-800/80 border border-slate-600 rounded-lg hover:bg-slate-700"
//             >
//               <XCircle className="w-4 h-4 text-yellow-400" />
//             </button>
//           )}
//         </div>

//         <CourtScene
//           ref={sceneRef}
//           currentSpeaker={
//             selectedScenario && gameState === "roleplay"
//               ? selectedScenario.roleplay[currentDialogueIndex]?.speaker
//               : "home"
//           }
//         />

//         {/* INSIDE SCENE: Scenario Selection */}
//         {gameState === "selection" && (
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg z-10">
//             <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6">
//               <div className="text-center mb-5">
//                 <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
//                   <Scale className="w-7 h-7 text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold text-white mb-1">
//                   Select a Scenario
//                 </h2>
//                 <p className="text-slate-400 text-xs">
//                   Choose a constitutional case to begin
//                 </p>
//               </div>

//               {loading ? (
//                 <div className="text-center py-6">
//                   <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
//                   <p className="text-slate-400 text-xs">Loading scenarios...</p>
//                 </div>
//               ) : error ? (
//                 <div className="text-center py-6">
//                   <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
//                   <p className="text-red-400 mb-3 text-xs">{error}</p>
//                   <button
//                     onClick={fetchScenarios}
//                     className="px-4 py-2 bg-orange-500 rounded-lg text-white text-xs font-semibold hover:bg-orange-600"
//                   >
//                     Retry
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
//                   {scenarios.map((scenario) => (
//                     <div
//                       key={scenario._id}
//                       onClick={() => startScenario(scenario)}
//                       className="cursor-pointer bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-orange-500 rounded-lg p-3 transition-all"
//                     >
//                       <div className="flex items-start gap-2">
//                         <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                           <Scale className="w-4 h-4 text-white" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2 mb-0.5">
//                             <h3 className="text-sm font-bold text-white truncate">
//                               {scenario.title}
//                             </h3>
//                             <span className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 text-[9px] font-semibold whitespace-nowrap">
//                               {scenario.article}
//                             </span>
//                           </div>
//                           <p className="text-slate-400 text-[10px] line-clamp-1">
//                             {scenario.description}
//                           </p>
//                         </div>
//                         <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* INSIDE SCENE: Description Screen */}
//         {gameState === "description" && selectedScenario && (
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl z-10">
//             <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6">
//               <div className="text-center mb-4">
//                 <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
//                   <BookOpen className="w-7 h-7 text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold text-white mb-2">
//                   Case Background
//                 </h2>
//                 <p className="text-slate-300 text-sm leading-relaxed">
//                   {selectedScenario.description}
//                 </p>
//               </div>

//               <div className="flex justify-center mt-4">
//                 <button
//                   onClick={() => setGameState("roleplay")}
//                   className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
//                 >
//                   Enter Courtroom
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}


//         {/* INSIDE SCENE: Dialog Bubble */}
//         {gameState === "roleplay" && selectedScenario && (
//           <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl z-10">
//             <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-xl shadow-2xl p-4">
//               <div className="flex items-start gap-3">
//                 <div
//                   className={`w-10 h-10 bg-gradient-to-br ${getSpeakerColor(
//                     selectedScenario.roleplay[currentDialogueIndex].speaker
//                   )} rounded-lg flex items-center justify-center flex-shrink-0`}
//                 >
//                   {getSpeakerIcon(
//                     selectedScenario.roleplay[currentDialogueIndex].speaker
//                   )}
//                 </div>
//                 <div className="flex-1 flex justify-between items-start">
//                   <div>
//                     <h4 className="font-bold text-white capitalize text-sm mb-1">
//                       {selectedScenario.roleplay[currentDialogueIndex].speaker}
//                     </h4>
//                     <p className="text-slate-200 text-sm leading-relaxed">
//                       "{selectedScenario.roleplay[currentDialogueIndex].line}"
//                     </p>
//                   </div>

//                   <button
//                     onClick={() =>
//                       isSpeaking
//                         ? stopSpeech()
//                         : speakText(
//                           selectedScenario.roleplay[currentDialogueIndex].line
//                         )
//                     }
//                     className="ml-3 p-2 bg-slate-700 rounded-lg hover:bg-slate-600"
//                   >
//                     {isSpeaking ? (
//                       <VolumeX className="w-4 h-4 text-red-400" />
//                     ) : (
//                       <Volume2 className="w-4 h-4 text-green-400" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* INSIDE SCENE: Verdict Selection */}
//         {gameState === "verdict" && selectedScenario && (
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl z-10">
//             <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6">
//               <div className="text-center mb-5">
//                 <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
//                   <Gavel className="w-7 h-7 text-white" />
//                 </div>
//                 <h2 className="text-xl font-bold text-white mb-1">
//                   Your Verdict
//                 </h2>
//                 <p className="text-slate-400 text-xs">
//                   As the judge, what is your decision?
//                 </p>
//               </div>

//               <div className="space-y-2 max-h-60 overflow-y-auto">
//                 {selectedScenario.verdictOptions.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => submitVerdict(option)}
//                     className="w-full p-3 bg-slate-700/50 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 border border-slate-600 hover:border-orange-500 rounded-lg text-left transition-all group"
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className="text-white text-xs font-medium group-hover:text-orange-400">
//                         {option}
//                       </span>
//                       <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400" />
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* INSIDE SCENE: Conclusion */}
//         {gameState === "conclusion" && selectedScenario && selectedVerdict && (
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-xl z-10">
//             <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6 max-h-[70vh] overflow-y-auto">
//               <div className="text-center">
//                 {selectedVerdict === selectedScenario.correctVerdict ? (
//                   <>
//                     <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
//                       <CheckCircle className="w-7 h-7 text-white" />
//                     </div>
//                     <h2 className="text-2xl font-bold text-green-400 mb-2">
//                       Correct Verdict!
//                     </h2>
//                     <p className="text-sm text-slate-300 mb-4">
//                       Your judgment aligns with the correct legal interpretation
//                       of {selectedScenario.article}.
//                     </p>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
//                       <XCircle className="w-7 h-7 text-white" />
//                     </div>
//                     <h2 className="text-2xl font-bold text-red-400 mb-2">
//                       Incorrect Verdict
//                     </h2>
//                     <p className="text-sm text-slate-300 mb-2">
//                       The correct verdict was:
//                     </p>
//                     <div className="inline-block px-3 py-1.5 bg-green-500/20 border border-green-500 rounded-lg mb-4">
//                       <p className="text-green-400 font-bold text-xs">
//                         "{selectedScenario.correctVerdict}"
//                       </p>
//                     </div>
//                   </>
//                 )}

//                 {selectedScenario.explanation && (
//                   <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4 text-left">
//                     <div className="flex items-start gap-2">
//                       <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <h4 className="font-bold text-white mb-1 text-xs">
//                           Legal Explanation
//                         </h4>
//                         <p className="text-slate-300 text-[10px] leading-relaxed">
//                           {selectedScenario.explanation}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex gap-2 justify-center">
//                   <button
//                     onClick={resetGame}
//                     className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 rounded-lg text-white text-xs font-semibold hover:bg-slate-600"
//                   >
//                     <ArrowLeft className="w-3 h-3" />
//                     Another Case
//                   </button>
//                   <button
//                     onClick={() => navigate('/learn')}
//                     className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 rounded-lg text-white text-xs font-semibold hover:bg-orange-600"
//                   >
//                     <BookOpen className="w-3 h-3" />
//                     Learn More
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         {gameState === "roleplay" && selectedScenario && (
//           <div className="absolute bottom-0 left-0 w-full z-30 bg-slate-800/90 backdrop-blur-md border-t border-slate-700">
//             <div className="max-w-7xl mx-auto px-4 py-2.5">
//               {/* Case Info + Progress */}
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-2.5">
//                   <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
//                     <Scale className="w-3.5 h-3.5 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-white text-xs">
//                       {selectedScenario.title}
//                     </h3>
//                     <p className="text-[9px] text-slate-400">
//                       {selectedScenario.article}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="px-2 py-1 bg-slate-700 rounded-md text-slate-300 text-[10px] font-semibold">
//                   {currentDialogueIndex + 1} / {selectedScenario.roleplay.length}
//                 </div>
//               </div>

//               {/* Progress Bar */}
//               <div className="mb-2.5">
//                 <div className="w-full bg-slate-700 rounded-full h-1">
//                   <div
//                     className="bg-gradient-to-r from-orange-500 to-red-500 h-1 rounded-full transition-all duration-300"
//                     style={{
//                       width: `${((currentDialogueIndex + 1) /
//                         selectedScenario.roleplay.length) *
//                         100
//                         }%`,
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Navigation Buttons - Centered and Compact */}
//               <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto">
//                 <button
//                   onClick={previousDialogue}
//                   disabled={currentDialogueIndex === 0}
//                   className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${currentDialogueIndex === 0
//                     ? "bg-slate-700 text-slate-500 cursor-not-allowed"
//                     : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
//                     }`}
//                 >
//                   <ChevronLeft className="w-3 h-3" />
//                   Back
//                 </button>

//                 {currentDialogueIndex === selectedScenario.roleplay.length - 1 ? (
//                   <button
//                     onClick={goToVerdict}
//                     className="flex items-center justify-center gap-1 px-6 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white text-[11px] font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
//                   >
//                     <Gavel className="w-3 h-3" />
//                     Deliver Verdict
//                   </button>
//                 ) : (
//                   <button
//                     onClick={nextDialogue}
//                     className="flex items-center justify-center gap-1 px-6 py-1.5 bg-orange-500 rounded-lg text-white text-[11px] font-semibold hover:bg-orange-600 transition-all"
//                   >
//                     Next
//                     <ChevronRight className="w-3 h-3" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* OUTSIDE SCENE: Controls Only (Case Info + Navigation) */}

//     </div>
//   );
// };

// frontend/src/pages/CourtSimulationPage.tsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Scale,
  Gavel,
  Users,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  CheckCircle,
  XCircle,
  Monitor,
  Smartphone,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { CourtScene } from "../components/court/CourtScene";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface Scenario {
  _id: string;
  title: string;
  article: string;
  description: string;
  roleplay: {
    speaker: string;
    line: string;
  }[];
  verdictOptions: string[];
  correctVerdict: string;
  explanation?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const CourtSimulationPage: React.FC = () => {
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [gameState, setGameState] = useState<
    "selection" | "description" | "roleplay" | "verdict" | "conclusion"
  >("selection");
  const [selectedVerdict, setSelectedVerdict] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<any>(null);

  // ── Fullscreen ────────────────────────────────────────────────────────────

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Keep isFullscreen in sync even when the user presses Escape natively
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // ── Text-to-Speech ────────────────────────────────────────────────────────

  // Voices load asynchronously in most browsers. This helper waits until
  // the list is populated (or times out after 2 s) before resolving.
  const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
        return;
      }
      const onVoicesChanged = () => {
        resolve(window.speechSynthesis.getVoices());
        window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
      };
      window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
      // Fallback: resolve after 2 s even if event never fires
      setTimeout(() => {
        resolve(window.speechSynthesis.getVoices());
        window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
      }, 2000);
    });
  };

  // Detect script/language from text content
  const detectLang = (text: string): string => {
    if (/[\u0900-\u097F]/.test(text)) return "hi-IN";   // Devanagari → Hindi
    if (/[\u0A80-\u0AFF]/.test(text)) return "gu-IN";   // Gujarati script
    if (/[\u0C00-\u0C7F]/.test(text)) return "te-IN";   // Telugu
    if (/[\u0B80-\u0BFF]/.test(text)) return "ta-IN";   // Tamil
    if (/[\u0D00-\u0D7F]/.test(text)) return "ml-IN";   // Malayalam
    if (/[\u0C80-\u0CFF]/.test(text)) return "kn-IN";   // Kannada
    if (/[\u0980-\u09FF]/.test(text)) return "bn-IN";   // Bengali
    return "en-IN";
  };

  // Pick the best available voice for the target lang, with fallbacks:
  // 1. Exact match (e.g. "hi-IN")
  // 2. Same language, any region (e.g. any "hi-*")
  // 3. Any "en-IN" voice
  // 4. Browser default (return null → browser picks)
  const pickVoice = (
    voices: SpeechSynthesisVoice[],
    lang: string
  ): SpeechSynthesisVoice | null => {
    const langPrefix = lang.split("-")[0].toLowerCase(); // e.g. "hi"

    const exact = voices.find(
      (v) => v.lang.toLowerCase() === lang.toLowerCase()
    );
    if (exact) return exact;

    const sameLanguage = voices.find(
      (v) => v.lang.toLowerCase().startsWith(langPrefix + "-")
    );
    if (sameLanguage) return sameLanguage;

    // For non-English scripts, if no native voice found, log a warning and
    // fall back to en-IN so something is spoken rather than silence.
    if (langPrefix !== "en") {
      console.warn(
        `No TTS voice found for "${lang}". Available voices:`,
        voices.map((v) => `${v.name} (${v.lang})`)
      );
    }

    const enIn = voices.find((v) => v.lang.toLowerCase() === "en-in");
    if (enIn) return enIn;

    const enAny = voices.find((v) =>
      v.lang.toLowerCase().startsWith("en-")
    );
    return enAny ?? null;
  };

  const speakText = async (text: string) => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    if (!text?.trim()) return;

    const lang = detectLang(text);
    const voices = await getVoices();
    const voice = pickVoice(voices, lang);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voice?.lang ?? lang;
    if (voice) utterance.voice = voice;
    utterance.rate = 0.88;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error("TTS error:", e.error);
      setIsSpeaking(false);
    };

    // Chrome bug: speech sometimes silently fails if called immediately after
    // cancel(). A short delay ensures the previous utterance is fully cleared.
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  };

  const toggleSpeech = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      speakText(text);
    }
  };

  // Cancel speech when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Auto-speak each new line during roleplay
  useEffect(() => {
    if (gameState === "roleplay" && selectedScenario) {
      const line = selectedScenario.roleplay[currentDialogueIndex]?.line;
      if (line) void speakText(line);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDialogueIndex, gameState]);

  // ── Data fetching ─────────────────────────────────────────────────────────

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/court/scenarios`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch scenarios");
      const data = await response.json();
      setScenarios(data.success ? data.data : []);
    } catch (err: any) {
      console.error("Error fetching scenarios:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Game flow ─────────────────────────────────────────────────────────────

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentDialogueIndex(0);
    setGameState("description");
    setSelectedVerdict(null);
  };

  const nextDialogue = () => {
    if (
      selectedScenario &&
      currentDialogueIndex < selectedScenario.roleplay.length - 1
    ) {
      setCurrentDialogueIndex((prev) => prev + 1);
    }
  };

  const previousDialogue = () => {
    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex((prev) => prev - 1);
    }
  };

  const goToVerdict = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setGameState("verdict");
  };

  const submitVerdict = (verdict: string) => {
    setSelectedVerdict(verdict);
    setGameState("conclusion");
  };

  const resetGame = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSelectedScenario(null);
    setCurrentDialogueIndex(0);
    setGameState("selection");
    setSelectedVerdict(null);
  };

  // ── Speaker helpers ───────────────────────────────────────────────────────

  const getSpeakerIcon = (speaker: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      judge: <Gavel className="w-4 h-4" />,
      defendant: <Users className="w-4 h-4" />,
      counsel: <BookOpen className="w-4 h-4" />,
      witness: <Users className="w-4 h-4" />,
      prosecutor: <Scale className="w-4 h-4" />,
    };
    return icons[speaker.toLowerCase()] || <Users className="w-4 h-4" />;
  };

  const getSpeakerColor = (speaker: string) => {
    const colors: { [key: string]: string } = {
      judge: "from-red-500 to-orange-500",
      defendant: "from-blue-500 to-cyan-500",
      counsel: "from-purple-500 to-pink-500",
      witness: "from-green-500 to-emerald-500",
      prosecutor: "from-yellow-500 to-orange-500",
    };
    return colors[speaker.toLowerCase()] || "from-slate-500 to-slate-600";
  };

  // ── Mobile gate ───────────────────────────────────────────────────────────

  if (isMobile) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Monitor className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Desktop Only Experience
          </h2>
          <p className="text-slate-400 mb-6">
            The Virtual Courtroom Simulation requires a larger screen for the
            best experience. Please access this feature on a desktop or laptop
            computer.
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Smartphone className="w-12 h-12 text-red-400" />
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
          <Button
            onClick={() => navigate("/games")}
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Back to Games
          </Button>
        </Card>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────

  return (
    <div className="w-full h-screen flex flex-col bg-slate-900">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-sm border-b border-slate-700 shadow-xl z-20">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() =>
                gameState === "selection" ? navigate("/games") : resetGame()
              }
              className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {gameState === "selection" ? "Back to Games" : "Exit Simulation"}
              </span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white">
                  Virtual Courtroom
                </h1>
                <p className="text-[10px] text-slate-400">
                  Constitutional Law Simulation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Scene Container */}
      <div ref={containerRef} className="flex-1 relative overflow-hidden min-h-0">
        {/* Fullscreen toggle */}
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-slate-800/80 border border-slate-600 rounded-lg hover:bg-slate-700"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <Monitor
              className={`w-4 h-4 ${isFullscreen ? "text-red-400" : "text-green-400"}`}
            />
          </button>
        </div>

        <CourtScene
          ref={sceneRef}
          currentSpeaker={
            selectedScenario && gameState === "roleplay"
              ? selectedScenario.roleplay[currentDialogueIndex]?.speaker
              : "home"
          }
        />

        {/* ── Scenario Selection ─────────────────────────────────────────── */}
        {gameState === "selection" && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg z-10">
            <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6">
              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Scale className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Select a Scenario
                </h2>
                <p className="text-slate-400 text-xs">
                  Choose a constitutional case to begin
                </p>
              </div>

              {loading ? (
                <div className="text-center py-6">
                  <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-slate-400 text-xs">Loading scenarios...</p>
                </div>
              ) : error ? (
                <div className="text-center py-6">
                  <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-2" />
                  <p className="text-red-400 mb-3 text-xs">{error}</p>
                  <button
                    onClick={fetchScenarios}
                    className="px-4 py-2 bg-orange-500 rounded-lg text-white text-xs font-semibold hover:bg-orange-600"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {scenarios.map((scenario) => (
                    <div
                      key={scenario._id}
                      onClick={() => startScenario(scenario)}
                      className="cursor-pointer bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-orange-500 rounded-lg p-3 transition-all"
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Scale className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-sm font-bold text-white truncate">
                              {scenario.title}
                            </h3>
                            <span className="px-1.5 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 text-[9px] font-semibold whitespace-nowrap">
                              {scenario.article}
                            </span>
                          </div>
                          <p className="text-slate-400 text-[10px] line-clamp-1">
                            {scenario.description}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Case Description ───────────────────────────────────────────── */}
        {gameState === "description" && selectedScenario && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl z-10">
            <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Case Background
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedScenario.description}
                </p>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setGameState("roleplay")}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
                >
                  Enter Courtroom
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Dialogue Bubble ────────────────────────────────────────────── */}
        {gameState === "roleplay" && selectedScenario && (
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl z-10">
            <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-xl shadow-2xl p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${getSpeakerColor(
                    selectedScenario.roleplay[currentDialogueIndex].speaker
                  )} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  {getSpeakerIcon(
                    selectedScenario.roleplay[currentDialogueIndex].speaker
                  )}
                </div>
                <div className="flex-1 flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white capitalize text-sm mb-1">
                      {selectedScenario.roleplay[currentDialogueIndex].speaker}
                    </h4>
                    <p className="text-slate-200 text-sm leading-relaxed">
                      "{selectedScenario.roleplay[currentDialogueIndex].line}"
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      toggleSpeech(
                        selectedScenario.roleplay[currentDialogueIndex].line
                      )
                    }
                    className="ml-3 p-2 bg-slate-700 rounded-lg hover:bg-slate-600"
                    title={isSpeaking ? "Stop narration" : "Play narration"}
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4 text-red-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-green-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Verdict Selection ──────────────────────────────────────────── */}
        {gameState === "verdict" && selectedScenario && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl z-10">
            <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6">
              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Gavel className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Your Verdict
                </h2>
                <p className="text-slate-400 text-xs">
                  As the judge, what is your decision?
                </p>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedScenario.verdictOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => submitVerdict(option)}
                    className="w-full p-3 bg-slate-700/50 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 border border-slate-600 hover:border-orange-500 rounded-lg text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs font-medium group-hover:text-orange-400">
                        {option}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Conclusion ─────────────────────────────────────────────────── */}
        {gameState === "conclusion" && selectedScenario && selectedVerdict && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-xl z-10">
            <div className="bg-slate-800/95 backdrop-blur-md border border-orange-500/30 rounded-2xl shadow-2xl p-6 max-h-[70vh] overflow-y-auto">
              <div className="text-center">
                {selectedVerdict === selectedScenario.correctVerdict ? (
                  <>
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-green-400 mb-2">
                      Correct Verdict!
                    </h2>
                    <p className="text-sm text-slate-300 mb-4">
                      Your judgment aligns with the correct legal interpretation
                      of {selectedScenario.article}.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <XCircle className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-red-400 mb-2">
                      Incorrect Verdict
                    </h2>
                    <p className="text-sm text-slate-300 mb-2">
                      The correct verdict was:
                    </p>
                    <div className="inline-block px-3 py-1.5 bg-green-500/20 border border-green-500 rounded-lg mb-4">
                      <p className="text-green-400 font-bold text-xs">
                        "{selectedScenario.correctVerdict}"
                      </p>
                    </div>
                  </>
                )}

                {selectedScenario.explanation && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4 text-left">
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white mb-1 text-xs">
                          Legal Explanation
                        </h4>
                        <p className="text-slate-300 text-[10px] leading-relaxed">
                          {selectedScenario.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 justify-center">
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 rounded-lg text-white text-xs font-semibold hover:bg-slate-600"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Another Case
                  </button>
                  <button
                    onClick={() => navigate("/learn")}
                    className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 rounded-lg text-white text-xs font-semibold hover:bg-orange-600"
                  >
                    <BookOpen className="w-3 h-3" />
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Roleplay Bottom Controls ───────────────────────────────────── */}
        {gameState === "roleplay" && selectedScenario && (
          <div className="absolute bottom-0 left-0 w-full z-30 bg-slate-800/90 backdrop-blur-md border-t border-slate-700">
            <div className="max-w-7xl mx-auto px-4 py-2.5">
              {/* Case info + progress counter */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Scale className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xs">
                      {selectedScenario.title}
                    </h3>
                    <p className="text-[9px] text-slate-400">
                      {selectedScenario.article}
                    </p>
                  </div>
                </div>
                <div className="px-2 py-1 bg-slate-700 rounded-md text-slate-300 text-[10px] font-semibold">
                  {currentDialogueIndex + 1} / {selectedScenario.roleplay.length}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-2.5">
                <div className="w-full bg-slate-700 rounded-full h-1">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-1 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentDialogueIndex + 1) /
                          selectedScenario.roleplay.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto">
                <button
                  onClick={previousDialogue}
                  disabled={currentDialogueIndex === 0}
                  className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    currentDialogueIndex === 0
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                  }`}
                >
                  <ChevronLeft className="w-3 h-3" />
                  Back
                </button>

                {currentDialogueIndex ===
                selectedScenario.roleplay.length - 1 ? (
                  <button
                    onClick={goToVerdict}
                    className="flex items-center justify-center gap-1 px-6 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white text-[11px] font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
                  >
                    <Gavel className="w-3 h-3" />
                    Deliver Verdict
                  </button>
                ) : (
                  <button
                    onClick={nextDialogue}
                    className="flex items-center justify-center gap-1 px-6 py-1.5 bg-orange-500 rounded-lg text-white text-[11px] font-semibold hover:bg-orange-600 transition-all"
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};























// ------------------------------------------------------------------------------
// Sekhar model





// import React, { useState, useEffect, useRef } from 'react';
// import { ArrowLeft, Scale } from 'lucide-react';
// import { CourtSceneVanilla } from '../components/court/CourtSceneVanilla';
// import '../components/court/CourtSimulation.css';

// interface Scenario {
//   _id: string;
//   title: string;
//   article: string;
//   description: string;
//   roleplay: {
//     speaker: string;
//     line: string;
//   }[];
//   verdictOptions: string[];
//   correctVerdict: string;
//   explanation?: string;
// }

// interface CourtSimulationPageProps {
//   onNavigate: (page: string) => void;
// }

// export const CourtSimulationPage: React.FC<CourtSimulationPageProps> = ({ onNavigate }) => {
//   const [allScenarios, setAllScenarios] = useState<Scenario[]>([]);
//   const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
//   const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
//   const [selectedScenarioId, setSelectedScenarioId] = useState('');
//   const [showDialogBox, setShowDialogBox] = useState(false);
//   const [showVerdictBox, setShowVerdictBox] = useState(false);
//   const [showConclusionBox, setShowConclusionBox] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const sceneRef = useRef<any>(null);

//   useEffect(() => {
//     fetchScenarios();
//   }, []);

//   const fetchScenarios = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5001/api/court/scenarios');
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
//       setAllScenarios(data.success ? data.data : []);
//       setError(null);
//     } catch (err: any) {
//       console.error('Failed to fetch scenarios:', err);
//       setError('Error loading scenarios');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStartScenario = () => {
//     if (!selectedScenarioId) {
//       alert('Please select a scenario first!');
//       return;
//     }

//     const scenario = allScenarios.find(s => s._id === selectedScenarioId);
//     if (!scenario) return;

//     setCurrentScenario(scenario);
//     setCurrentDialogueIndex(0);
//     setShowDialogBox(true);

//     if (sceneRef.current) {
//       sceneRef.current.goTo('home');
//     }
//   };

//   const handleNext = () => {
//     if (currentScenario && currentDialogueIndex < currentScenario.roleplay.length - 1) {
//       setCurrentDialogueIndex(prev => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     if (currentDialogueIndex > 0) {
//       setCurrentDialogueIndex(prev => prev - 1);
//     }
//   };

//   const handleGoToVerdict = () => {
//     setShowDialogBox(false);
//     setShowVerdictBox(true);
//     if (sceneRef.current) {
//       sceneRef.current.goTo('judge');
//     }
//   };

//   const handleCheckVerdict = (selectedVerdict: string) => {
//     setShowVerdictBox(false);
//     setShowConclusionBox(true);

//     if (currentScenario) {
//       setIsCorrect(selectedVerdict === currentScenario.correctVerdict);
//     }
//   };

//   const handlePlayAgain = () => {
//     setShowConclusionBox(false);
//     setShowDialogBox(false);
//     setShowVerdictBox(false);
//     setCurrentScenario(null);
//     setSelectedScenarioId('');
//     setCurrentDialogueIndex(0);

//     if (sceneRef.current) {
//       sceneRef.current.goTo('home');
//     }
//   };

//   // Update camera position when dialogue changes
//   useEffect(() => {
//     if (currentScenario && showDialogBox && sceneRef.current) {
//       const speaker = currentScenario.roleplay[currentDialogueIndex]?.speaker;
//       if (speaker) {
//         sceneRef.current.goTo(speaker.toLowerCase());
//       }
//     }
//   }, [currentDialogueIndex, currentScenario, showDialogBox]);

//   return (
//     <div className="court-simulation-page">
//       {/* Compact Header */}
//       <div className="court-compact-header">
//         <button className="compact-back-btn" onClick={() => onNavigate('games')}>
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to Games</span>
//         </button>
//         <div className="compact-title">
//           <div className="compact-icon">
//             <Scale className="w-5 h-5" />
//           </div>
//           <div>
//             <h1>Virtual Courtroom</h1>
//             <p>Constitutional Law Simulation</p>
//           </div>
//         </div>
//       </div>

//       {/* Scene Container */}
//       <div className="full-scene-container">
//         <CourtSceneVanilla ref={sceneRef} />

//         {/* Scenario Selector - Center Overlay */}
//         {!currentScenario && (
//           <div className="center-overlay">
//             <div className="selector-card">
//               <div className="selector-icon">
//                 <Scale className="w-8 h-8 text-white" />
//               </div>
//               <h2>Select a Scenario</h2>
//               <p>Choose a constitutional case to begin</p>

//               <select
//                 value={selectedScenarioId}
//                 onChange={(e) => setSelectedScenarioId(e.target.value)}
//                 className="selector-dropdown"
//               >
//                 <option value="">
//                   {loading ? 'Loading...' : error ? error : '-- Choose a Scenario --'}
//                 </option>
//                 {allScenarios.map(scenario => (
//                   <option key={scenario._id} value={scenario._id}>
//                     {scenario.title} ({scenario.article})
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={handleStartScenario}
//                 disabled={!selectedScenarioId}
//                 className="selector-start-btn"
//               >
//                 Start Simulation
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Dialog Content ONLY - Inside Scene */}
//         {showDialogBox && currentScenario && (
//           <div className="scene-dialog-bubble">
//             <div className="dialog-bubble-content">
//               <span className="bubble-speaker">
//                 {currentScenario.roleplay[currentDialogueIndex].speaker.toUpperCase()}:
//               </span>{' '}
//               "{currentScenario.roleplay[currentDialogueIndex].line}"
//             </div>
//           </div>
//         )}

//         {/* Verdict Options - Inside Scene */}
//         {showVerdictBox && currentScenario && (
//           <div className="scene-verdict-overlay">
//             <div className="verdict-center-box">
//               <div className="verdict-box-header">
//                 <div className="verdict-box-icon">
//                   <Scale className="w-8 h-8 text-white" />
//                 </div>
//                 <h2>Your Verdict</h2>
//                 <p>As the judge, what is your decision?</p>
//               </div>

//               <div className="verdict-box-options">
//                 {currentScenario.verdictOptions.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleCheckVerdict(option)}
//                     className="verdict-box-option"
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Conclusion - Center Overlay */}
//         {showConclusionBox && currentScenario && (
//           <div className="center-overlay">
//             <div className="conclusion-card">
//               <div className={`conclusion-inline-icon ${isCorrect ? 'correct' : 'incorrect'}`}>
//                 {isCorrect ? (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 ) : (
//                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 )}
//               </div>

//               <h2 className={isCorrect ? 'correct-heading' : 'incorrect-heading'}>
//                 {isCorrect ? 'Correct Verdict!' : 'Incorrect Verdict'}
//               </h2>

//               <p className="conclusion-inline-text">
//                 {isCorrect
//                   ? 'Your judgment aligns with the correct legal interpretation.'
//                   : `The correct verdict was: "${currentScenario.correctVerdict}".`
//                 }
//               </p>

//               {currentScenario.explanation && (
//                 <div className="conclusion-explanation">
//                   <h4>Legal Explanation</h4>
//                   <p>{currentScenario.explanation}</p>
//                 </div>
//               )}

//               <button onClick={handlePlayAgain} className="conclusion-play-again">
//                 Play Another Scenario
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Controls Section - OUTSIDE Scene, Below */}
//       {(showDialogBox || showVerdictBox) && currentScenario && (
//         <div className="external-controls">
//           <div className="controls-container">
//             {/* Case Info */}
//             <div className="case-info-section">
//               <div className="case-info-icon">
//                 <Scale className="w-5 h-5 text-white" />
//               </div>
//               <div className="case-info-text">
//                 <h3>{currentScenario.title}</h3>
//                 <span>{currentScenario.article}</span>
//               </div>
//               {showDialogBox && (
//                 <div className="case-progress-badge">
//                   {currentDialogueIndex + 1} / {currentScenario.roleplay.length}
//                 </div>
//               )}
//             </div>

//             {/* Progress Bar - Only for Dialog */}
//             {showDialogBox && (
//               <div className="external-progress-bar">
//                 <div
//                   className="external-progress-fill"
//                   style={{ width: `${((currentDialogueIndex + 1) / currentScenario.roleplay.length) * 100}%` }}
//                 />
//               </div>
//             )}

//             {/* Navigation Buttons - Only for Dialog */}
//             {showDialogBox && (
//               <div className="external-nav-buttons">
//                 <button
//                   onClick={handleBack}
//                   disabled={currentDialogueIndex === 0}
//                   className="external-btn back"
//                 >
//                   ← Back
//                 </button>

//                 {currentDialogueIndex === currentScenario.roleplay.length - 1 ? (
//                   <button onClick={handleGoToVerdict} className="external-btn verdict">
//                     Deliver Your Verdict
//                   </button>
//                 ) : (
//                   <button onClick={handleNext} className="external-btn next">
//                     Next →
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* Verdict Info Text */}
//             {showVerdictBox && (
//               <div className="verdict-external-info">
//                 <p>Select your verdict from the options shown in the courtroom above</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
