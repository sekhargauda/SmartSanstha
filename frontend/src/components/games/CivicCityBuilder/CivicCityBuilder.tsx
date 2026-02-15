// // frontend/src/components/games/CivicCityBuilder/CivicCityBuilder.tsx

// import React, { useState, useEffect, useRef, CSSProperties } from "react";
// import { userStatsAPI } from "../../../services/api";

// // --- TYPES & EXPANDED GAME DATA ---
// interface CivicCityBuilderProps {
//   onNavigate: (page: string) => void;
// }

// interface Duty {
//   id: string;
//   text: string;
//   icon: string;
// }

// interface Problem {
//   id: number;
//   description: string;
//   solved: boolean;
//   correctDutyId: string;
//   position: { top: string; left: string };
//   icon: string;
//   justSolved: boolean;
// }

// const duties: Duty[] = [
//   { id: "duty_1", text: "Safeguard public property", icon: "🛡️" },
//   { id: "duty_2", text: "Value our rich heritage", icon: "🎨" },
//   { id: "duty_3", text: "Protect the natural environment", icon: "🌳" },
//   { id: "duty_4", text: "Promote harmony", icon: "🤝" },
//   { id: "duty_5", text: "Develop the scientific temper", icon: "🔬" },
//   { id: "duty_6", text: "Strive for excellence", icon: "⭐" },
// ];

// const initialProblems: Problem[] = [
//   {
//     id: 1,
//     description: "Historic temple walls are being vandalized.",
//     solved: false,
//     correctDutyId: "duty_2",
//     position: { top: "35%", left: "15%" },
//     icon: "🏛️",
//     justSolved: false,
//   },
//   {
//     id: 2,
//     description: "The local park is covered in litter.",
//     solved: false,
//     correctDutyId: "duty_3",
//     position: { top: "75%", left: "25%" },
//     icon: "🗑️",
//     justSolved: false,
//   },
//   {
//     id: 3,
//     description: "A public bus stop has been damaged.",
//     solved: false,
//     correctDutyId: "duty_1",
//     position: { top: "50%", left: "88%" },
//     icon: "🚌",
//     justSolved: false,
//   },
//   {
//     id: 4,
//     description: "Tension is rising between two community groups.",
//     solved: false,
//     correctDutyId: "duty_4",
//     position: { top: "85%", left: "50%" },
//     icon: "🗣️",
//     justSolved: false,
//   },
//   {
//     id: 5,
//     description: "The local school building is in disrepair.",
//     solved: false,
//     correctDutyId: "duty_6",
//     position: { top: "40%", left: "40%" },
//     icon: "🏫",
//     justSolved: false,
//   },
//   {
//     id: 6,
//     description: "A nearby river is being polluted by waste.",
//     solved: false,
//     correctDutyId: "duty_3",
//     position: { top: "88%", left: "80%" },
//     icon: "🏞️",
//     justSolved: false,
//   },
//   {
//     id: 7,
//     description: "Misinformation is spreading on a community notice board.",
//     solved: false,
//     correctDutyId: "duty_5",
//     position: { top: "60%", left: "5%" },
//     icon: "📰",
//     justSolved: false,
//   },
//   {
//     id: 8,
//     description: "A public library's books are being damaged.",
//     solved: false,
//     correctDutyId: "duty_1",
//     position: { top: "20%", left: "60%" },
//     icon: "📚",
//     justSolved: false,
//   },
//   {
//     id: 9,
//     description: "A traditional folk art performance is being forgotten.",
//     solved: false,
//     correctDutyId: "duty_2",
//     position: { top: "70%", left: "90%" },
//     icon: "🎭",
//     justSolved: false,
//   },
//   {
//     id: 10,
//     description: "A neighborhood is divided due to prejudice.",
//     solved: false,
//     correctDutyId: "duty_4",
//     position: { top: "25%", left: "75%" },
//     icon: "🏘️",
//     justSolved: false,
//   },
// ];

// // --- Keyframes & Style Component ---
// const KeyframesStyle = () => (
//   <style>{`
//     @keyframes pulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(239, 68, 68, 0.6); } 50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(239, 68, 68, 1); } }
//     @keyframes sparkle { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
//     @keyframes score-popup { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-50px); opacity: 0; } }
//     @keyframes wobble { 0%, 100% { transform: translateX(-50%) translateY(-50%); } 15% { transform: translateX(-55%) translateY(-50%); } 30% { transform: translateX(-45%) translateY(-50%); } 45% { transform: translateX(-55%) translateY(-50%); } 60% { transform: translateX(-45%) translateY(-50%); } 75% { transform: translateX(-52%) translateY(-50%); } }
//   `}</style>
// );

// // --- UI Components ---
// const HappinessMeter: React.FC<{ score: number }> = ({ score }) => {
//   const happinessColor =
//     score < 30 ? "#ef4444" : score < 70 ? "#f97316" : "#22c55e";

//   return (
//     <div style={styles.meterContainer}>
//       <div style={styles.meterTextTop}>{score}%</div>
//       <div style={styles.meterBar}>
//         <div
//           style={{
//             ...styles.meterFill,
//             height: `${score}%`,
//             backgroundColor: happinessColor,
//           }}
//         ></div>
//       </div>
//       <div style={styles.meterLabel}>
//         <span>🏙️</span>
//         <span>Happiness</span>
//       </div>
//     </div>
//   );
// };

// const HowToPlay = () => (
//   <div style={styles.howToPlayContainer}>
//     <div style={styles.howToPlayStep}>
//       <div style={styles.stepNumber}>1</div>
//       <div>
//         <h4 style={styles.stepTitle}>Observe the City</h4>
//         <p style={styles.stepText}>
//           Find problems indicated by pulsing red alerts. Hover over an icon to
//           see what's wrong.
//         </p>
//       </div>
//     </div>
//     <div style={styles.howToPlayStep}>
//       <div style={styles.stepNumber}>2</div>
//       <div>
//         <h4 style={styles.stepTitle}>Select a Duty</h4>
//         <p style={styles.stepText}>
//           Choose a Fundamental Duty from your toolkit at the bottom by clicking
//           and dragging it.
//         </p>
//       </div>
//     </div>
//     <div style={styles.howToPlayStep}>
//       <div style={styles.stepNumber}>3</div>
//       <div>
//         <h4 style={styles.stepTitle}>Solve the Problem</h4>
//         <p style={styles.stepText}>
//           Drop the correct Duty onto the problem to fix it and increase your
//           city's happiness!
//         </p>
//       </div>
//     </div>
//   </div>
// );

// // --- MAIN GAME COMPONENT ---
// const CivicCityBuilder: React.FC<CivicCityBuilderProps> = ({ onNavigate }) => {
//   const [problems, setProblems] = useState<Problem[]>(initialProblems);
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);
//   const [hoveredProblemId, setHoveredProblemId] = useState<number | null>(null);
//   const [wrongDropId, setWrongDropId] = useState<number | null>(null);
//   const [hoveredToolId, setHoveredToolId] = useState<string | null>(null);

//   const allProblemsSolved = score >= 100;

//   // ✅ Track only ONCE per game session
//   const [sessionId] = useState(() => crypto.randomUUID());
//   const [startTime] = useState(() => Date.now());

//   const trackedRef = useRef(false);

//   const finishGame = async () => {
//     if (trackedRef.current) return;
//     trackedRef.current = true;

//     const timeTaken = Math.floor((Date.now() - startTime) / 1000);
//     const solvedProblems = problems.filter((p) => p.solved).length;

//     try {
//       await userStatsAPI.trackGameEnd({
//         sessionId,
//         gameId: "civic_city_builder",
//         gameName: "Civic City Builder",
//         timeTaken,
//         isWin: solvedProblems >= 10,
//         meta: {
//           solvedProblems,
//           score,
//         },
//       });
//     } catch (err) {
//       console.error("trackGameEnd error:", err);
//     }
//   };

//   // ✅ Only call finishGame when player wins
//   useEffect(() => {
//     if (allProblemsSolved) {
//       finishGame();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [allProblemsSolved]);

//   const handleDragStart = (
//     e: React.DragEvent<HTMLDivElement>,
//     dutyId: string
//   ) => {
//     e.dataTransfer.setData("dutyId", dutyId);
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>, problem: Problem) => {
//     e.preventDefault();
//     if (problem.solved) return;

//     const dutyId = e.dataTransfer.getData("dutyId");

//     if (dutyId === problem.correctDutyId) {
//       setProblems((prev) =>
//         prev.map((p) => (p.id === problem.id ? { ...p, justSolved: true } : p))
//       );

//       setTimeout(() => {
//         setProblems((prev) =>
//           prev.map((p) =>
//             p.id === problem.id ? { ...p, solved: true, justSolved: false } : p
//           )
//         );
//         setScore((prev) => prev + 10);
//       }, 500);

//       showFeedback("Problem Solved!", "success");
//     } else {
//       showFeedback("Wrong Duty! Try another.", "error");
//       setWrongDropId(problem.id);
//       setTimeout(() => setWrongDropId(null), 500);
//     }
//   };

//   const showFeedback = (message: string, type: "success" | "error") => {
//     setFeedback({ message, type });
//     setTimeout(() => setFeedback(null), 2500);
//   };

//   const resetGame = () => {
//     // ✅ reset state
//     setProblems(
//       initialProblems.map((p) => ({ ...p, solved: false, justSolved: false }))
//     );
//     setScore(0);

//     // ✅ reset tracker (new sessionId will be generated ONLY if component remounts)
//     // If you want new sessionId even on "Play Again", use navigate/reload strategy.
//     trackedRef.current = false;
//   };

//   return (
//     <div style={styles.gameContainer}>
//       <KeyframesStyle />

//       {/* Back Button */}
//       <div style={styles.backButtonContainer}>
//         <button
//           onClick={() => onNavigate("games")}
//           style={styles.backButton}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.color = "#f97316";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.color = "#9ca3af";
//           }}
//         >
//           ← Back to Games
//         </button>
//       </div>

//       {feedback && (
//         <div
//           style={{
//             ...styles.feedbackMessage,
//             ...(feedback.type === "success"
//               ? styles.feedbackSuccess
//               : styles.feedbackError),
//           }}
//         >
//           {feedback.message}
//         </div>
//       )}

//       <div style={styles.gameHeader}>
//         <h2 style={styles.h2}>
//           Civic City <span style={styles.span}>Builder</span>
//         </h2>
//       </div>

//       <HowToPlay />

//       <div style={styles.gameBoard}>
//         <div style={styles.cityAreaContainer} onDragOver={handleDragOver}>
//           <div
//             style={{
//               ...styles.cityBackground,
//               filter: `grayscale(${100 - score}%) brightness(${
//                 0.7 + score * 0.003
//               }) contrast(${0.9 + score * 0.001})`,
//             }}
//           ></div>
//           <div
//             style={{
//               ...styles.crackedOverlay,
//               opacity: (100 - score) / 100,
//             }}
//           ></div>

//           {allProblemsSolved ? (
//             <div style={styles.winMessage}>
//               <h3 style={styles.h3}>Congratulations! Your city is thriving!</h3>
//               <p style={styles.winMessageText}>
//                 This shows how applying our civic duties improves society.
//               </p>
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "1rem",
//                   justifyContent: "center",
//                 }}
//               >
//                 <button style={styles.button} onClick={resetGame}>
//                   Play Again
//                 </button>
//                 <button
//                   style={{ ...styles.button, backgroundColor: "#374151" }}
//                   onClick={() => onNavigate("games")}
//                 >
//                   Back to Games
//                 </button>
//               </div>
//             </div>
//           ) : (
//             problems.map((problem) => (
//               <div
//                 key={problem.id}
//                 style={{
//                   ...styles.problemWrapper,
//                   top: problem.position.top,
//                   left: problem.position.left,
//                   opacity: problem.solved ? 0 : 1,
//                   animation:
//                     wrongDropId === problem.id ? "wobble 0.5s" : "none",
//                 }}
//                 onDrop={(e) => handleDrop(e, problem)}
//                 onMouseEnter={() => setHoveredProblemId(problem.id)}
//                 onMouseLeave={() => setHoveredProblemId(null)}
//               >
//                 {!problem.solved && !problem.justSolved && (
//                   <div style={styles.problemIcon}>{problem.icon}</div>
//                 )}
//                 {problem.justSolved && <div style={styles.sparkleEffect}>✨</div>}
//                 <div
//                   style={{
//                     ...styles.problemTooltip,
//                     opacity: hoveredProblemId === problem.id ? 1 : 0,
//                     visibility:
//                       hoveredProblemId === problem.id ? "visible" : "hidden",
//                   }}
//                 >
//                   {problem.description}
//                 </div>
//                 {problem.justSolved && <div style={styles.scorePopup}>+10</div>}
//               </div>
//             ))
//           )}
//         </div>

//         <HappinessMeter score={score} />
//       </div>

//       {!allProblemsSolved && (
//         <div style={styles.toolsArea}>
//           {duties.map((duty) => (
//             <div
//               key={duty.id}
//               style={{
//                 ...styles.dutyTool,
//                 ...(hoveredToolId === duty.id ? styles.dutyToolHover : {}),
//               }}
//               draggable
//               onDragStart={(e) => handleDragStart(e, duty.id)}
//               onMouseEnter={() => setHoveredToolId(duty.id)}
//               onMouseLeave={() => setHoveredToolId(null)}
//             >
//               <span style={styles.dutyToolIcon}>{duty.icon}</span>
//               <span style={styles.dutyToolText}>{duty.text}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// // --- STYLES ---
// const styles: { [key: string]: CSSProperties } = {
//   gameContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: '2rem 1rem',
//     backgroundColor: '#111827',
//     color: '#e5e7eb',
//     fontFamily: 'sans-serif',
//     width: '100%',
//     minHeight: '100vh',
//     boxSizing: 'border-box'
//   },

//   // Back Button Styles
//   backButtonContainer: {
//     width: '100%',
//     maxWidth: '1200px',
//     marginBottom: '1rem',
//     display: 'flex',
//     justifyContent: 'flex-start'
//   },

//   backButton: {
//     background: 'transparent',
//     border: 'none',
//     color: '#9ca3af',
//     fontSize: '1rem',
//     fontWeight: '500',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     padding: '0.5rem 1rem',
//     transition: 'color 0.2s',
//     fontFamily: 'inherit'
//   },

//   gameHeader: { marginBottom: '1rem', textAlign: 'center' },
//   h2: { fontSize: '3rem', fontWeight: 'bold', color: 'white', margin: 0 },
//   span: { color: '#f97316' },
//   howToPlayContainer: {
//     width: '90%',
//     maxWidth: '1200px',
//     backgroundColor: 'rgba(31, 41, 55, 0.6)',
//     backdropFilter: 'blur(5px)',
//     borderRadius: '12px',
//     marginBottom: '1.5rem',
//     padding: '1.5rem',
//     border: '1px solid #374151',
//     display: 'flex',
//     justifyContent: 'space-around',
//     gap: '1rem',
//     flexWrap: 'wrap'
//   },
//   howToPlayStep: { display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '250px' },
//   stepNumber: { flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#374151', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' },
//   stepTitle: { margin: 0, color: 'white', fontWeight: 'bold' },
//   stepText: { margin: 0, color: '#9ca3af', fontSize: '0.9rem' },
//   gameBoard: {
//     position: 'relative',
//     width: '90%',
//     maxWidth: '1200px',
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   cityAreaContainer: {
//     width: '100%',
//     maxWidth: '1100px',
//     height: '550px',
//     position: 'relative',
//     borderRadius: '15px',
//     overflow: 'visible',
//   },
//   cityBackground: {
//     width: '100%', height: '100%',
//     backgroundImage: `url('/city-background.jpg')`,
//     backgroundSize: 'cover', backgroundPosition: 'center',
//     borderRadius: '15px', border: '1px solid #4b5563',
//     transition: 'filter 0.8s ease-in-out',
//     position: 'absolute', top: 0, left: 0,
//   },
//   crackedOverlay: {
//     position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
//     backgroundImage: `url('/cracked-overlay.png')`,
//     backgroundSize: 'cover', backgroundPosition: 'center',
//     pointerEvents: 'none', transition: 'opacity 0.8s ease-in-out',
//     borderRadius: '15px',
//   },
//   meterContainer: {
//     position: 'absolute',
//     right: '-100px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     width: '80px',
//     height: '450px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: 'rgba(31, 41, 55, 0.6)',
//     backdropFilter: 'blur(10px)',
//     padding: '1rem 0.5rem',
//     borderRadius: '12px',
//     border: '1px solid #374151',
//     boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
//   },
//   meterBar: {
//     flexGrow: 1,
//     width: '25px',
//     backgroundColor: '#111827',
//     borderRadius: '10px',
//     overflow: 'hidden',
//     display: 'flex',
//     flexDirection: 'column-reverse',
//     border: '1px solid #374151',
//   },
//   meterFill: { width: '100%', transition: 'height 0.5s ease-out, background-color 0.5s ease' },
//   meterTextTop: { color: 'white', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.75rem' },
//   meterLabel: {
//     color: '#9ca3af',
//     fontWeight: 'bold',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '0.25rem',
//     marginTop: '0.75rem',
//     fontSize: '0.8rem'
//   },
//   problemWrapper: {
//     position: 'absolute',
//     cursor: 'pointer',
//     width: '65px',
//     height: '65px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: '50%',
//     background: 'rgba(239, 68, 68, 0.25)',
//     border: '2px solid rgba(239, 68, 68, 0.8)',
//     backdropFilter: 'blur(3px)',
//     transition: 'opacity 0.5s ease, transform 0.3s ease',
//     animation: 'pulse 2.5s infinite ease-in-out',
//     transform: 'translate(-50%, -50%)',
//   },
//   problemIcon: {
//     fontSize: '2rem', zIndex: 1,
//     filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.6))'
//   },
//   sparkleEffect: { position: 'absolute', fontSize: '2.5rem', zIndex: 2, color: '#fde047', animation: 'sparkle 0.5s ease-out forwards' },
//   scorePopup: { position: 'absolute', fontSize: '1.2rem', zIndex: 3, color: '#22c55e', fontWeight: 'bold', animation: 'score-popup 1s ease-out forwards' },
//   problemTooltip: {
//     position: 'absolute',
//     zIndex: 10,
//     bottom: '130%',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     visibility: 'hidden',
//     opacity: 0,
//     width: '160px',
//     backgroundColor: '#111827',
//     color: '#fff',
//     textAlign: 'center',
//     borderRadius: '8px',
//     padding: '10px',
//     fontSize: '0.9rem',
//     border: '1px solid #374151',
//     transition: 'opacity 0.2s, visibility 0.2s',
//     boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
//   },
//   toolsArea: { display: 'flex', justifyContent: 'center', gap: '1.5rem', width: '90%', maxWidth: '1100px', marginTop: '1.5rem', flexWrap: 'wrap' },
//   dutyTool: {
//     background: 'linear-gradient(145deg, #4b5563, #2b3441)',
//     color: '#e5e7eb',
//     borderRadius: '15px',
//     cursor: 'grab',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     border: '1px solid #5a6573',
//     boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 5px 10px rgba(0,0,0,0.4)',
//     transition: 'all 0.2s ease-out',
//     width: '140px',
//     height: '90px',
//     textAlign: 'center',
//     padding: '0.5rem',
//   },
//   dutyToolHover: {
//     transform: 'translateY(-5px)',
//     boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 8px 15px rgba(0,0,0,0.5), 0 0 10px rgba(249, 115, 22, 0.5)',
//   },
//   dutyToolIcon: { fontSize: '2.2rem', lineHeight: 1 },
//   dutyToolText: { fontSize: '0.75rem', marginTop: '0.5rem', lineHeight: '1.2' },
//   winMessage: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     textAlign: 'center',
//     padding: '2rem 3rem',
//     backgroundColor: 'rgba(17, 24, 39, 0.8)',
//     backdropFilter: 'blur(10px)',
//     borderRadius: '15px',
//     border: '1px solid #4b5563',
//   },
//   winMessageText: { color: '#d1d5db', fontSize: '1.1rem' },
//   h3: { fontSize: '2.5rem', color: '#34d399', margin: '0 0 1rem 0' },
//   button: {
//     marginTop: '1.5rem',
//     padding: '1rem 2rem',
//     border: 'none',
//     backgroundColor: '#f97316',
//     color: 'white',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '1.2rem',
//     fontWeight: 'bold',
//     transition: 'transform 0.2s'
//   },
//   feedbackMessage: {
//     position: 'fixed',
//     top: '20px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     padding: '10px 20px',
//     borderRadius: '8px',
//     color: 'white',
//     zIndex: 100,
//     fontWeight: 'bold',
//     transition: 'opacity 0.5s ease-in-out',
//     boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
//   },
//   feedbackSuccess: { backgroundColor: '#10b981' },
//   feedbackError: { backgroundColor: '#ef4444' },
// };

// export default CivicCityBuilder;










// frontend/src/components/games/CivicCityBuilder/CivicCityBuilder.tsx

import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { userStatsAPI } from "../../../services/api";

// --- TYPES & EXPANDED GAME DATA ---

interface Duty {
  id: string;
  text: string;
  icon: string;
}

interface Problem {
  id: number;
  description: string;
  solved: boolean;
  correctDutyId: string;
  position: { top: string; left: string };
  icon: string;
  justSolved: boolean;
}

const duties: Duty[] = [
  { id: "duty_1", text: "Safeguard public property", icon: "🛡️" },
  { id: "duty_2", text: "Value our rich heritage", icon: "🎨" },
  { id: "duty_3", text: "Protect the natural environment", icon: "🌳" },
  { id: "duty_4", text: "Promote harmony", icon: "🤝" },
  { id: "duty_5", text: "Develop the scientific temper", icon: "🔬" },
  { id: "duty_6", text: "Strive for excellence", icon: "⭐" },
];

const initialProblems: Problem[] = [
  {
    id: 1,
    description: "Historic temple walls are being vandalized.",
    solved: false,
    correctDutyId: "duty_2",
    position: { top: "35%", left: "15%" },
    icon: "🏛️",
    justSolved: false,
  },
  {
    id: 2,
    description: "The local park is covered in litter.",
    solved: false,
    correctDutyId: "duty_3",
    position: { top: "75%", left: "25%" },
    icon: "🗑️",
    justSolved: false,
  },
  {
    id: 3,
    description: "A public bus stop has been damaged.",
    solved: false,
    correctDutyId: "duty_1",
    position: { top: "50%", left: "88%" },
    icon: "🚌",
    justSolved: false,
  },
  {
    id: 4,
    description: "Tension is rising between two community groups.",
    solved: false,
    correctDutyId: "duty_4",
    position: { top: "85%", left: "50%" },
    icon: "🗣️",
    justSolved: false,
  },
  {
    id: 5,
    description: "The local school building is in disrepair.",
    solved: false,
    correctDutyId: "duty_6",
    position: { top: "40%", left: "40%" },
    icon: "🏫",
    justSolved: false,
  },
  {
    id: 6,
    description: "A nearby river is being polluted by waste.",
    solved: false,
    correctDutyId: "duty_3",
    position: { top: "88%", left: "80%" },
    icon: "🏞️",
    justSolved: false,
  },
  {
    id: 7,
    description: "Misinformation is spreading on a community notice board.",
    solved: false,
    correctDutyId: "duty_5",
    position: { top: "60%", left: "5%" },
    icon: "📰",
    justSolved: false,
  },
  {
    id: 8,
    description: "A public library's books are being damaged.",
    solved: false,
    correctDutyId: "duty_1",
    position: { top: "20%", left: "60%" },
    icon: "📚",
    justSolved: false,
  },
  {
    id: 9,
    description: "A traditional folk art performance is being forgotten.",
    solved: false,
    correctDutyId: "duty_2",
    position: { top: "70%", left: "90%" },
    icon: "🎭",
    justSolved: false,
  },
  {
    id: 10,
    description: "A neighborhood is divided due to prejudice.",
    solved: false,
    correctDutyId: "duty_4",
    position: { top: "25%", left: "75%" },
    icon: "🏘️",
    justSolved: false,
  },
];

// --- Keyframes & Style Component ---
const KeyframesStyle = () => (
  <style>{`
    @keyframes pulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(239, 68, 68, 0.6); } 50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(239, 68, 68, 1); } }
    @keyframes sparkle { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
    @keyframes score-popup { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-50px); opacity: 0; } }
    @keyframes wobble { 0%, 100% { transform: translateX(-50%) translateY(-50%); } 15% { transform: translateX(-55%) translateY(-50%); } 30% { transform: translateX(-45%) translateY(-50%); } 45% { transform: translateX(-55%) translateY(-50%); } 60% { transform: translateX(-45%) translateY(-50%); } 75% { transform: translateX(-52%) translateY(-50%); } }
  `}</style>
);

// --- UI Components ---
const HappinessMeter: React.FC<{ score: number }> = ({ score }) => {
  const happinessColor =
    score < 30 ? "#ef4444" : score < 70 ? "#f97316" : "#22c55e";

  return (
    <div style={styles.meterContainer}>
      <div style={styles.meterTextTop}>{score}%</div>
      <div style={styles.meterBar}>
        <div
          style={{
            ...styles.meterFill,
            height: `${score}%`,
            backgroundColor: happinessColor,
          }}
        ></div>
      </div>
      <div style={styles.meterLabel}>
        <span>🏙️</span>
        <span>Happiness</span>
      </div>
    </div>
  );
};

const HowToPlay = () => (
  <div style={styles.howToPlayContainer}>
    <div style={styles.howToPlayStep}>
      <div style={styles.stepNumber}>1</div>
      <div>
        <h4 style={styles.stepTitle}>Observe the City</h4>
        <p style={styles.stepText}>
          Find problems indicated by pulsing red alerts. Hover over an icon to
          see what's wrong.
        </p>
      </div>
    </div>
    <div style={styles.howToPlayStep}>
      <div style={styles.stepNumber}>2</div>
      <div>
        <h4 style={styles.stepTitle}>Select a Duty</h4>
        <p style={styles.stepText}>
          Choose a Fundamental Duty from your toolkit at the bottom by clicking
          and dragging it.
        </p>
      </div>
    </div>
    <div style={styles.howToPlayStep}>
      <div style={styles.stepNumber}>3</div>
      <div>
        <h4 style={styles.stepTitle}>Solve the Problem</h4>
        <p style={styles.stepText}>
          Drop the correct Duty onto the problem to fix it and increase your
          city's happiness!
        </p>
      </div>
    </div>
  </div>
);

// --- MAIN GAME COMPONENT ---
const CivicCityBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>(initialProblems);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [hoveredProblemId, setHoveredProblemId] = useState<number | null>(null);
  const [wrongDropId, setWrongDropId] = useState<number | null>(null);
  const [hoveredToolId, setHoveredToolId] = useState<string | null>(null);

  const allProblemsSolved = score >= 100;

  // ✅ Track only ONCE per game session
  const [sessionId] = useState(() => crypto.randomUUID());
  const [startTime] = useState(() => Date.now());

  const trackedRef = useRef(false);

  const finishGame = async () => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const solvedProblems = problems.filter((p) => p.solved).length;

    try {
      await userStatsAPI.trackGameEnd({
        sessionId,
        gameId: "civic_city_builder",
        gameName: "Civic City Builder",
        timeTaken,
        isWin: solvedProblems >= 10,
        meta: {
          solvedProblems,
          score,
        },
      });
    } catch (err) {
      console.error("trackGameEnd error:", err);
    }
  };

  // ✅ Only call finishGame when player wins
  useEffect(() => {
    if (allProblemsSolved) {
      finishGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProblemsSolved]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    dutyId: string
  ) => {
    e.dataTransfer.setData("dutyId", dutyId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, problem: Problem) => {
    e.preventDefault();
    if (problem.solved) return;

    const dutyId = e.dataTransfer.getData("dutyId");

    if (dutyId === problem.correctDutyId) {
      setProblems((prev) =>
        prev.map((p) => (p.id === problem.id ? { ...p, justSolved: true } : p))
      );

      setTimeout(() => {
        setProblems((prev) =>
          prev.map((p) =>
            p.id === problem.id ? { ...p, solved: true, justSolved: false } : p
          )
        );
        setScore((prev) => prev + 10);
      }, 500);

      showFeedback("Problem Solved!", "success");
    } else {
      showFeedback("Wrong Duty! Try another.", "error");
      setWrongDropId(problem.id);
      setTimeout(() => setWrongDropId(null), 500);
    }
  };

  const showFeedback = (message: string, type: "success" | "error") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 2500);
  };

  const resetGame = () => {
    // ✅ reset state
    setProblems(
      initialProblems.map((p) => ({ ...p, solved: false, justSolved: false }))
    );
    setScore(0);

    // ✅ reset tracker (new sessionId will be generated ONLY if component remounts)
    // If you want new sessionId even on "Play Again", use navigate/reload strategy.
    trackedRef.current = false;
  };

  return (
    <div style={styles.gameContainer}>
      <KeyframesStyle />

      {/* Back Button */}
      <div style={styles.backButtonContainer}>
        <button
          onClick={() => navigate('/games')}
          style={styles.backButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#f97316";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#9ca3af";
          }}
        >
          ← Back to Games
        </button>
      </div>

      {feedback && (
        <div
          style={{
            ...styles.feedbackMessage,
            ...(feedback.type === "success"
              ? styles.feedbackSuccess
              : styles.feedbackError),
          }}
        >
          {feedback.message}
        </div>
      )}

      <div style={styles.gameHeader}>
        <h2 style={styles.h2}>
          Civic City <span style={styles.span}>Builder</span>
        </h2>
      </div>

      <HowToPlay />

      <div style={styles.gameBoard}>
        <div style={styles.cityAreaContainer} onDragOver={handleDragOver}>
          <div
            style={{
              ...styles.cityBackground,
              filter: `grayscale(${100 - score}%) brightness(${
                0.7 + score * 0.003
              }) contrast(${0.9 + score * 0.001})`,
            }}
          ></div>
          <div
            style={{
              ...styles.crackedOverlay,
              opacity: (100 - score) / 100,
            }}
          ></div>

          {allProblemsSolved ? (
            <div style={styles.winMessage}>
              <h3 style={styles.h3}>Congratulations! Your city is thriving!</h3>
              <p style={styles.winMessageText}>
                This shows how applying our civic duties improves society.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <button style={styles.button} onClick={resetGame}>
                  Play Again
                </button>
                <button
                  style={{ ...styles.button, backgroundColor: "#374151" }}
                  onClick={() => navigate('/games')}
                >
                  Back to Games
                </button>
              </div>
            </div>
          ) : (
            problems.map((problem) => (
              <div
                key={problem.id}
                style={{
                  ...styles.problemWrapper,
                  top: problem.position.top,
                  left: problem.position.left,
                  opacity: problem.solved ? 0 : 1,
                  animation:
                    wrongDropId === problem.id ? "wobble 0.5s" : "none",
                }}
                onDrop={(e) => handleDrop(e, problem)}
                onMouseEnter={() => setHoveredProblemId(problem.id)}
                onMouseLeave={() => setHoveredProblemId(null)}
              >
                {!problem.solved && !problem.justSolved && (
                  <div style={styles.problemIcon}>{problem.icon}</div>
                )}
                {problem.justSolved && <div style={styles.sparkleEffect}>✨</div>}
                <div
                  style={{
                    ...styles.problemTooltip,
                    opacity: hoveredProblemId === problem.id ? 1 : 0,
                    visibility:
                      hoveredProblemId === problem.id ? "visible" : "hidden",
                  }}
                >
                  {problem.description}
                </div>
                {problem.justSolved && <div style={styles.scorePopup}>+10</div>}
              </div>
            ))
          )}
        </div>

        <HappinessMeter score={score} />
      </div>

      {!allProblemsSolved && (
        <div style={styles.toolsArea}>
          {duties.map((duty) => (
            <div
              key={duty.id}
              style={{
                ...styles.dutyTool,
                ...(hoveredToolId === duty.id ? styles.dutyToolHover : {}),
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, duty.id)}
              onMouseEnter={() => setHoveredToolId(duty.id)}
              onMouseLeave={() => setHoveredToolId(null)}
            >
              <span style={styles.dutyToolIcon}>{duty.icon}</span>
              <span style={styles.dutyToolText}>{duty.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


// --- STYLES ---
const styles: { [key: string]: CSSProperties } = {
  gameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1rem',
    backgroundColor: '#111827',
    color: '#e5e7eb',
    fontFamily: 'sans-serif',
    width: '100%',
    minHeight: '100vh',
    boxSizing: 'border-box'
  },

  // Back Button Styles
  backButtonContainer: {
    width: '100%',
    maxWidth: '1200px',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'flex-start'
  },

  backButton: {
    background: 'transparent',
    border: 'none',
    color: '#9ca3af',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    transition: 'color 0.2s',
    fontFamily: 'inherit'
  },

  gameHeader: { marginBottom: '1rem', textAlign: 'center' },
  h2: { fontSize: '3rem', fontWeight: 'bold', color: 'white', margin: 0 },
  span: { color: '#f97316' },
  howToPlayContainer: {
    width: '90%',
    maxWidth: '1200px',
    backgroundColor: 'rgba(31, 41, 55, 0.6)',
    backdropFilter: 'blur(5px)',
    borderRadius: '12px',
    marginBottom: '1.5rem',
    padding: '1.5rem',
    border: '1px solid #374151',
    display: 'flex',
    justifyContent: 'space-around',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  howToPlayStep: { display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '250px' },
  stepNumber: { flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#374151', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' },
  stepTitle: { margin: 0, color: 'white', fontWeight: 'bold' },
  stepText: { margin: 0, color: '#9ca3af', fontSize: '0.9rem' },
  gameBoard: {
    position: 'relative',
    width: '90%',
    maxWidth: '1200px',
    display: 'flex',
    justifyContent: 'center',
  },
  cityAreaContainer: {
    width: '100%',
    maxWidth: '1100px',
    height: '550px',
    position: 'relative',
    borderRadius: '15px',
    overflow: 'visible',
  },
  cityBackground: {
    width: '100%', height: '100%',
    backgroundImage: `url('/city-background.jpg')`,
    backgroundSize: 'cover', backgroundPosition: 'center',
    borderRadius: '15px', border: '1px solid #4b5563',
    transition: 'filter 0.8s ease-in-out',
    position: 'absolute', top: 0, left: 0,
  },
  crackedOverlay: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    backgroundImage: `url('/cracked-overlay.png')`,
    backgroundSize: 'cover', backgroundPosition: 'center',
    pointerEvents: 'none', transition: 'opacity 0.8s ease-in-out',
    borderRadius: '15px',
  },
  meterContainer: {
    position: 'absolute',
    right: '-100px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '80px',
    height: '450px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.6)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 0.5rem',
    borderRadius: '12px',
    border: '1px solid #374151',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
  },
  meterBar: {
    flexGrow: 1,
    width: '25px',
    backgroundColor: '#111827',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column-reverse',
    border: '1px solid #374151',
  },
  meterFill: { width: '100%', transition: 'height 0.5s ease-out, background-color 0.5s ease' },
  meterTextTop: { color: 'white', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '0.75rem' },
  meterLabel: {
    color: '#9ca3af',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    marginTop: '0.75rem',
    fontSize: '0.8rem'
  },
  problemWrapper: {
    position: 'absolute',
    cursor: 'pointer',
    width: '65px',
    height: '65px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: 'rgba(239, 68, 68, 0.25)',
    border: '2px solid rgba(239, 68, 68, 0.8)',
    backdropFilter: 'blur(3px)',
    transition: 'opacity 0.5s ease, transform 0.3s ease',
    animation: 'pulse 2.5s infinite ease-in-out',
    transform: 'translate(-50%, -50%)',
  },
  problemIcon: {
    fontSize: '2rem', zIndex: 1,
    filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.6))'
  },
  sparkleEffect: { position: 'absolute', fontSize: '2.5rem', zIndex: 2, color: '#fde047', animation: 'sparkle 0.5s ease-out forwards' },
  scorePopup: { position: 'absolute', fontSize: '1.2rem', zIndex: 3, color: '#22c55e', fontWeight: 'bold', animation: 'score-popup 1s ease-out forwards' },
  problemTooltip: {
    position: 'absolute',
    zIndex: 10,
    bottom: '130%',
    left: '50%',
    transform: 'translateX(-50%)',
    visibility: 'hidden',
    opacity: 0,
    width: '160px',
    backgroundColor: '#111827',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '0.9rem',
    border: '1px solid #374151',
    transition: 'opacity 0.2s, visibility 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
  },
  toolsArea: { display: 'flex', justifyContent: 'center', gap: '1.5rem', width: '90%', maxWidth: '1100px', marginTop: '1.5rem', flexWrap: 'wrap' },
  dutyTool: {
    background: 'linear-gradient(145deg, #4b5563, #2b3441)',
    color: '#e5e7eb',
    borderRadius: '15px',
    cursor: 'grab',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #5a6573',
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 5px 10px rgba(0,0,0,0.4)',
    transition: 'all 0.2s ease-out',
    width: '140px',
    height: '90px',
    textAlign: 'center',
    padding: '0.5rem',
  },
  dutyToolHover: {
    transform: 'translateY(-5px)',
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 8px 15px rgba(0,0,0,0.5), 0 0 10px rgba(249, 115, 22, 0.5)',
  },
  dutyToolIcon: { fontSize: '2.2rem', lineHeight: 1 },
  dutyToolText: { fontSize: '0.75rem', marginTop: '0.5rem', lineHeight: '1.2' },
  winMessage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    padding: '2rem 3rem',
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid #4b5563',
  },
  winMessageText: { color: '#d1d5db', fontSize: '1.1rem' },
  h3: { fontSize: '2.5rem', color: '#34d399', margin: '0 0 1rem 0' },
  button: {
    marginTop: '1.5rem',
    padding: '1rem 2rem',
    border: 'none',
    backgroundColor: '#f97316',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    transition: 'transform 0.2s'
  },
  feedbackMessage: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    borderRadius: '8px',
    color: 'white',
    zIndex: 100,
    fontWeight: 'bold',
    transition: 'opacity 0.5s ease-in-out',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
  },
  feedbackSuccess: { backgroundColor: '#10b981' },
  feedbackError: { backgroundColor: '#ef4444' },
};

export default CivicCityBuilder;