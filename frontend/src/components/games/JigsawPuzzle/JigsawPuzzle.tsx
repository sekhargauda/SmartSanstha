// // frontend/src/components/games/JigsawPuzzle/JigsawPuzzle.tsx

// import React, { useState, useEffect, useRef, CSSProperties } from 'react';
// import { ProgressBar } from '../../common/ProgressBar';
// import { userStatsAPI } from "../../../services/api"; // ✅ ADDED

// // --- TYPES ---
// interface JigsawPuzzleProps {
//   onNavigate: (page: string) => void;
// }

// interface PuzzleData {
//   id: string;
//   name: string;
//   gridSize: number;
//   basePath: string;
//   hintImage: string;
//   facts: { [key: string]: string };
// }
// interface Piece {
//   id: string;
//   src: string;
//   order: number;
// }

// // --- GAME DATA ---
// const puzzles: PuzzleData[] = [
//   {
//     id: 'preamble',
//     name: 'The Preamble',
//     gridSize: 3,
//     basePath: '/puzzles/preamble/',
//     hintImage: '/puzzles/preamble-full.jpg',
//     facts: {
//       'piece-1': "The Preamble is the soul of the Constitution.",
//       'piece-2': "It was adopted on 26th November 1949.",
//       'piece-3': "The word 'Socialist' was added by the 42nd Amendment.",
//       'piece-4': "It secures 'Liberty' of thought and expression.",
//       'piece-5': "'Justice' in the Preamble covers social, economic, and political aspects.",
//       'piece-6': "The Preamble starts with 'WE, THE PEOPLE OF INDIA...'",
//       'piece-7': "'Fraternity' means a sense of common brotherhood.",
//       'piece-8': "'Equality' ensures the absence of special privileges.",
//       'piece-9': "The constitution came into effect on 26th January 1950.",
//       'completionFact': "The Preamble is based on the 'Objectives Resolution', drafted by Jawaharlal Nehru."
//     }
//   },
//   {
//     id: 'mapOfIndia',
//     name: 'Map of India',
//     gridSize: 4,
//     basePath: '/puzzles/map-of-india/',
//     hintImage: '/puzzles/map-of-india-full.jpg',
//     facts: {
//       'piece-1': "India is the seventh-largest country by area.",
//       'piece-2': "Rajasthan is the largest state by area.",
//       'piece-3': "The Tropic of Cancer passes through 8 Indian states.",
//       'piece-4': "India shares land borders with seven countries.",
//       'piece-5': "The southern-most point is Kanyakumari.",
//       'piece-6': "New Delhi is the capital.",
//       'piece-7': "The Himalayas form the northern boundary.",
//       'piece-8': "Goa is the smallest state by area.",
//       'piece-9': "India has 28 states and 8 union territories.",
//       'piece-10': "Indian Standard Time is calculated from Mirzapur.",
//       'piece-11': "Gujarat has the longest coastline.",
//       'piece-12': "The river Ganga is the longest river in India.",
//       'piece-13': "Mumbai is the financial capital.",
//       'piece-14': "The Deccan Plateau covers most of southern India.",
//       'piece-15': "The Andaman and Nicobar Islands are in the Bay of Bengal.",
//       'piece-16': "The Thar Desert is India's largest desert.",
//       'completionFact': "The political map of India has changed significantly since its independence in 1947."
//     }
//   },
//   {
//     id: 'emblem',
//     name: 'National Emblem',
//     gridSize: 4,
//     basePath: '/puzzles/national-emblem/',
//     hintImage: '/puzzles/national-emblem-full.jpg',
//     facts: {
//       'piece-1': "It's an adaptation of the Lion Capital of Ashoka from Sarnath.",
//       'piece-2': "It was adopted on January 26, 1950.",
//       'piece-3': "The four lions symbolize power, courage, confidence, and pride.",
//       'piece-4': "The central wheel is the Dharma Chakra.",
//       'piece-5': "The motto 'Satyameva Jayate' means 'Truth Alone Triumphs'.",
//       'piece-6': "The horse represents energy and the bull represents hard work.",
//       'piece-7': "The original was erected by Emperor Ashoka in 250 BC.",
//       'piece-8': "Its use is regulated by the State Emblem of India Act, 2005.",
//       'piece-9': "Only three of the four lions are visible from any angle.",
//       'piece-10': "The motto is from the Mundaka Upanishad.",
//       'piece-11': "The animals are on a circular abacus.",
//       'piece-12': "The original is carved out of a single block of polished sandstone.",
//       'piece-13': "It represents India's sovereignty.",
//       'piece-14': "The abacus also features an elephant and a lion.",
//       'piece-15': "The bell-shaped lotus beneath the abacus was omitted.",
//       'piece-16': "It is used on all official government documents.",
//       'completionFact': "The motto 'Satyameva Jayate' is taken from the Mundaka Upanishad, an ancient Hindu scripture."
//     }
//   }
// ];

// // --- KEYFRAMES ---
// const KeyframesStyle = () => (
//   <style>{`
//     @keyframes pulse-hint { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
//     @keyframes wobble {
//       0%, 100% { transform: translateX(0); }
//       15% { transform: translateX(-5px); }
//       30% { transform: translateX(5px); }
//       45% { transform: translateX(-5px); }
//       60% { transform: translateX(5px); }
//       75% { transform: translateX(-2px); }
//     }
//   `}</style>
// );

// const HowToPlay = () => (
//   <div style={styles.howToPlayContainer}>
//     <div style={styles.howToPlayStep}>
//       <div style={styles.stepNumber}>1</div>
//       <div>
//         <h4 style={styles.stepTitle}>Select a Puzzle</h4>
//         <p style={styles.stepText}>Choose a puzzle from the buttons above to begin.</p>
//       </div>
//     </div>
//     <div style={styles.howToPlayStep}>
//       <div style={styles.stepNumber}>2</div>
//       <div>
//         <h4 style={styles.stepTitle}>Drag a Piece</h4>
//         <p style={styles.stepText}>Select a piece from the tray on the right by clicking and dragging it.</p>
//       </div>
//     </div>
//     <div style={styles.howToPlayStep}>
//       <div style={styles.stepNumber}>3</div>
//       <div>
//         <h4 style={styles.stepTitle}>Drop in Place</h4>
//         <p style={styles.stepText}>Drop the piece onto the correct spot on the grid to learn a fact!</p>
//       </div>
//     </div>
//   </div>
// );

// // --- MAIN COMPONENT ---
// const JigsawPuzzle: React.FC<JigsawPuzzleProps> = ({ onNavigate }) => {
//   const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleData>(puzzles[0]);
//   const [piecesInTray, setPiecesInTray] = useState<Piece[]>([]);
//   const [boardState, setBoardState] = useState<(Piece | null)[]>([]);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [fact, setFact] = useState<{ text: string; type: 'info' | 'error' } | null>(null);
//   const [isHintActive, setHintActive] = useState(false);
//   const [hintCountdown, setHintCountdown] = useState(0);
//   const [draggedOverZone, setDraggedOverZone] = useState<number | null>(null);
//   const [wobblePieceId, setWobblePieceId] = useState<string | null>(null);

//   // ✅ TRACKING (SESSION + TIME) ADDED
//   const sessionIdRef = useRef<string>(crypto.randomUUID());
//   const startTimeRef = useRef<number>(Date.now());
//   const trackedRef = useRef<boolean>(false);

//   const resetTrackingSession = () => {
//     sessionIdRef.current = crypto.randomUUID();
//     startTimeRef.current = Date.now();
//     trackedRef.current = false;
//   };

//   useEffect(() => {
//     loadPuzzle(currentPuzzle.id);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPuzzle.id]);

//   // ✅ TRACK ONLY WHEN COMPLETED (ONLY ONCE)
//   useEffect(() => {
//     const trackEnd = async () => {
//       if (!isCompleted) return;
//       if (trackedRef.current) return;

//       trackedRef.current = true;

//       const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);

//       try {
//         await userStatsAPI.trackGameEnd({
//           sessionId: sessionIdRef.current,
//           gameId: "jigsaw_puzzle",
//           gameName: "Jigsaw Puzzle",
//           timeTaken,
//           isWin: true,
//           meta: {
//             puzzleId: currentPuzzle.id,
//             puzzleName: currentPuzzle.name,
//           },
//         });
//       } catch (error) {
//         console.error("❌ trackGameEnd failed:", error);
//       }
//     };

//     trackEnd();
//   }, [isCompleted]); // ✅ ONLY depends on isCompleted

//   const loadPuzzle = (puzzleId: string) => {
//     const puzzleData = puzzles.find(p => p.id === puzzleId)!;
//     setCurrentPuzzle(puzzleData);
//     const totalPieces = puzzleData.gridSize * puzzleData.gridSize;
//     const newPieces: Piece[] = Array.from({ length: totalPieces }, (_, i) => ({
//       id: `piece-${i + 1}`,
//       src: `${puzzleData.basePath}piece-${i + 1}.png`,
//       order: i + 1
//     }));
//     setPiecesInTray(newPieces.sort(() => Math.random() - 0.5));
//     setBoardState(Array(totalPieces).fill(null));
//     setIsCompleted(false);

//     // ✅ RESET TRACKING ON NEW GAME / PLAY AGAIN
//     resetTrackingSession();
//   };

//   const handleDragStart = (e: React.DragEvent<HTMLImageElement>, pieceId: string) => {
//     try { e.dataTransfer.setData('text/plain', pieceId); } catch (err) { e.dataTransfer.setData('pieceId', pieceId); }
//   };

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>, zoneIndex: number) => {
//     e.preventDefault();
//     setDraggedOverZone(null);
//     let pieceId = e.dataTransfer.getData('text/plain');
//     if (!pieceId) pieceId = e.dataTransfer.getData('pieceId');
//     const correctPieceId = `piece-${zoneIndex + 1}`;

//     if (pieceId === correctPieceId && !boardState[zoneIndex]) {
//       const piece = piecesInTray.find(p => p.id === pieceId)!;
//       const newBoardState = [...boardState];
//       newBoardState[zoneIndex] = piece;
//       setBoardState(newBoardState);
//       setPiecesInTray(prev => prev.filter(p => p.id !== pieceId));
//       const factText = currentPuzzle.facts[pieceId];
//       if (factText) showFeedback(factText, 'info');
//       if (newBoardState.filter(p => p !== null).length === currentPuzzle.gridSize * currentPuzzle.gridSize) {
//         setIsCompleted(true);
//       }
//     } else {
//       showFeedback("That's not the right spot!", 'error');
//       setWobblePieceId(pieceId || null);
//       setTimeout(() => setWobblePieceId(null), 500);
//     }
//   };

//   const showFeedback = (text: string, type: 'info' | 'error') => {
//     setFact({ text, type });
//     setTimeout(() => setFact(null), 3000);
//   };

//   const handleHint = () => {
//     if (isHintActive) return;
//     setHintActive(true);
//     setHintCountdown(3);
//     const interval = setInterval(() => setHintCountdown(prev => prev - 1), 1000);
//     setTimeout(() => { setHintActive(false); clearInterval(interval); setHintCountdown(0); }, 3000);
//   };

//   const placedCount = boardState.filter(p => p !== null).length;
//   const totalPieces = currentPuzzle.gridSize * currentPuzzle.gridSize;
//   const progressPercent = totalPieces > 0 ? Math.round((placedCount / totalPieces) * 100) : 0;

//   return (
//     <div style={styles.gameContainer}>
//       <KeyframesStyle />

//       {/* Back Button */}
//       <div style={styles.backButtonContainer}>
//         <button
//           onClick={() => onNavigate('games')}
//           style={styles.backButton}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.color = '#f97316';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.color = '#9ca3af';
//           }}
//         >
//           ← Back to Games
//         </button>
//       </div>

//       {fact && (
//         <div style={{ ...styles.factPopup, ...(fact.type === 'error' ? styles.factPopupError : {}) }}>
//           {fact.text}
//         </div>
//       )}

//       <div style={styles.gameHeader}>
//         <h2 style={styles.h2}>Constitutional <span style={styles.span}>Jigsaw</span></h2>
//         <p style={styles.p}>Solve the puzzle to unlock an interesting fact!</p>
//       </div>

//       <div style={styles.puzzleSelection}>
//         {puzzles.map(p => (
//           <button
//             key={p.id}
//             onClick={() => loadPuzzle(p.id)}
//             style={{ ...styles.puzzleSelectBtn, ...(currentPuzzle.id === p.id ? styles.activeBtn : {}) }}
//           >
//             {p.name}
//           </button>
//         ))}
//       </div>

//       <HowToPlay />

//       <div style={{ width: '90%', maxWidth: '1000px', marginBottom: '1.5rem' }}>
//         <ProgressBar value={progressPercent} />
//       </div>

//       <div style={styles.mainGameArea}>
//         <div style={styles.boardWrapper}>
//           <div
//             style={{
//               ...styles.puzzleBoard,
//               gridTemplateColumns: `repeat(${currentPuzzle.gridSize}, 1fr)`,
//               gridTemplateRows: `repeat(${currentPuzzle.gridSize}, 1fr)`
//             }}
//           >
//             {boardState.map((piece, index) => (
//               <div
//                 key={index}
//                 style={{ ...styles.puzzleCell, ...(draggedOverZone === index ? styles.dropZoneHover : {}) }}
//                 onDragOver={handleDragOver}
//                 onDrop={(e) => handleDrop(e, index)}
//                 onDragEnter={() => setDraggedOverZone(index)}
//                 onDragLeave={() => setDraggedOverZone(null)}
//               >
//                 {piece && (
//                   <img
//                     src={piece.src}
//                     alt={`piece-${index + 1}`}
//                     style={styles.placedPiece}
//                     draggable={false}
//                   />
//                 )}
//               </div>
//             ))}

//             {isHintActive && (
//               <>
//                 <div style={{ ...styles.hintOverlay, backgroundImage: `url(${currentPuzzle.hintImage})` }} />
//                 <div style={styles.hintTimer}>{hintCountdown}</div>
//               </>
//             )}
//           </div>

//           <div style={styles.gameControls}>
//             <button onClick={handleHint} style={styles.hintBtn} disabled={isHintActive}>💡 Hint</button>
//           </div>
//         </div>

//         <div style={styles.piecesTray}>
//           <h3 style={{ color: 'white', borderBottom: '1px solid #374151', paddingBottom: '1rem', marginBottom: '1rem', textAlign: 'center', flexShrink: 0 }}>
//             Puzzle Pieces
//           </h3>

//           <div style={styles.trayContent}>
//             {piecesInTray.map(piece => (
//               <div key={piece.id} style={styles.trayCell}>
//                 <img
//                   id={piece.id}
//                   src={piece.src}
//                   alt={piece.id}
//                   style={{ ...styles.puzzlePiece, animation: wobblePieceId === piece.id ? 'wobble 0.5s' : 'none' }}
//                   draggable
//                   onDragStart={(e) => handleDragStart(e, piece.id)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {isCompleted && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalContent}>
//             <h2>Puzzle Complete!</h2>
//             <h3>Here's an interesting fact:</h3>
//             <p>{currentPuzzle.facts.completionFact}</p>
//             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.25rem' }}>
//               <button onClick={() => loadPuzzle(currentPuzzle.id)} style={styles.playAgainBtn}>
//                 Play Again
//               </button>
//               <button
//                 onClick={() => onNavigate('games')}
//                 style={{
//                   ...styles.playAgainBtn,
//                   background: '#374151',
//                   border: '1px solid #4b5563'
//                 }}
//               >
//                 Back to Games
//               </button>
//             </div>
//           </div>
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
//     padding: '1rem',
//     backgroundColor: '#111827',
//     color: '#e5e7eb',
//     fontFamily: 'sans-serif',
//     minHeight: '100vh',
//     boxSizing: 'border-box',
//     width: '100%'
//   },

//   // Back Button Styles
//   backButtonContainer: {
//     width: '100%',
//     maxWidth: '1300px',
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

//   gameHeader: { textAlign: 'center', marginBottom: '1rem' },
//   h2: { fontSize: '2.2rem', fontWeight: '700', color: 'white', margin: 0 },
//   span: { color: '#f97316' },
//   p: { fontSize: '1rem', color: '#9ca3af', marginTop: '0.25rem' },

//   puzzleSelection: { display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' },
//   puzzleSelectBtn: {
//     background: '#374151',
//     color: 'white',
//     border: '1px solid #4b5563',
//     padding: '0.45rem 0.9rem',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontWeight: '700',
//     transition: 'all 0.2s'
//   },
//   activeBtn: { background: '#f97316', borderColor: '#f97316' },

//   howToPlayContainer: {
//     width: '100%',
//     maxWidth: '900px',
//     backgroundColor: 'rgba(31, 41, 55, 0.6)',
//     backdropFilter: 'blur(5px)',
//     borderRadius: '12px',
//     marginBottom: '1rem',
//     padding: '1rem',
//     border: '1px solid #374151',
//     display: 'flex',
//     justifyContent: 'space-around',
//     gap: '1rem',
//     flexWrap: 'wrap'
//   },
//   howToPlayStep: { display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '180px' },
//   stepNumber: { flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#374151', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' },
//   stepTitle: { margin: 0, color: 'white', fontWeight: '700', fontSize: '0.9rem' },
//   stepText: { margin: 0, color: '#9ca3af', fontSize: '0.8rem' },

//   mainGameArea: { display: 'flex', gap: '2rem', width: '100%', maxWidth: '1300px', alignItems: 'flex-start', justifyContent: 'center' },

//   boardWrapper: {
//     flex: '1 1 55%',
//     display: 'flex',
//     flexDirection: 'column',
//     maxWidth: '560px',
//     aspectRatio: '1/1'
//   },

//   puzzleBoard: {
//     display: 'grid',
//     border: '3px solid #4b5563',
//     borderRadius: '8px',
//     overflow: 'hidden',
//     position: 'relative',
//     backgroundColor: '#111827',
//     width: '100%',
//     height: '100%'
//   },

//   puzzleCell: {
//     position: 'relative',
//     width: '100%',
//     aspectRatio: '1/1',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#0f1724',
//     overflow: 'hidden',
//     border: '1px dashed #26303a'
//   },

//   placedPiece: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'contain',
//     objectPosition: 'center',
//     display: 'block',
//     userSelect: 'none',
//     pointerEvents: 'none'
//   },

//   dropZoneHover: { backgroundColor: 'rgba(249,115,22,0.18)' },

//   hintOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundSize: 'contain',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     opacity: 0.6,
//     animation: 'pulse-hint 1.5s infinite ease-in-out'
//   },

//   hintTimer: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     fontSize: '4.5rem',
//     fontWeight: '700',
//     color: 'white',
//     textShadow: '0 0 10px black'
//   },

//   gameControls: { marginTop: '1rem', display: 'flex', justifyContent: 'center' },
//   hintBtn: { background: '#374151', color: '#facc15', border: '1px solid #4b5563', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' },

//   piecesTray: {
//     flex: '0 0 30%',
//     backgroundColor: '#1f2937',
//     padding: '0.8rem',
//     borderRadius: '8px',
//     border: '1px solid #374151',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center'
//   },

//   trayContent: {
//     width: '100%',
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 70px)',
//     gridAutoRows: '70px',
//     gap: '0.6rem',
//     justifyContent: 'center',
//     alignContent: 'start',
//     overflow: 'hidden',
//     padding: '0.3rem'
//   },

//   trayCell: {
//     width: '70px',
//     height: '70px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: '#0f1724',
//     borderRadius: '6px',
//     border: '1px solid #26303a',
//     overflow: 'hidden'
//   },

//   puzzlePiece: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'contain',
//     objectPosition: 'center',
//     cursor: 'grab',
//     borderRadius: '4px',
//     transition: 'transform 0.18s'
//   },

//   factPopup: {
//     position: 'fixed',
//     bottom: '20px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     backgroundColor: '#111827',
//     color: 'white',
//     padding: '1rem 1.8rem',
//     borderRadius: '8px',
//     border: '1px solid #f97316',
//     zIndex: 100,
//     boxShadow: '0 0 20px rgba(0,0,0,0.5)'
//   },
//   factPopupError: { borderColor: '#ef4444' },

//   modalOverlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 200,
//     backdropFilter: 'blur(4px)'
//   },

//   modalContent: {
//     backgroundColor: '#1f2937',
//     padding: '2rem',
//     borderRadius: '12px',
//     textAlign: 'center',
//     border: '1px solid #4b5563',
//     color: 'white',
//     boxShadow: '0 8px 20px rgba(0,0,0,0.45)'
//   },

//   playAgainBtn: {
//     marginTop: '1.25rem',
//     background: '#f97316',
//     color: 'white',
//     border: 'none',
//     padding: '0.7rem 1.6rem',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontWeight: '700',
//     transition: 'all 0.2s'
//   }
// };

// export default JigsawPuzzle;









// frontend/src/components/games/JigsawPuzzle/JigsawPuzzle.tsx

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../../common/ProgressBar';
import { userStatsAPI } from "../../../services/api";

// --- TYPES ---
interface PuzzleData {
  id: string;
  name: string;
  gridSize: number;
  basePath: string;
  hintImage: string;
  facts: { [key: string]: string };
}
interface Piece {
  id: string;
  src: string;
  order: number;
}

// --- GAME DATA ---
const puzzles: PuzzleData[] = [
  {
    id: 'preamble',
    name: 'The Preamble',
    gridSize: 3,
    basePath: '/puzzles/preamble/',
    hintImage: '/puzzles/preamble-full.jpg',
    facts: {
      'piece-1': "The Preamble is the soul of the Constitution.",
      'piece-2': "It was adopted on 26th November 1949.",
      'piece-3': "The word 'Socialist' was added by the 42nd Amendment.",
      'piece-4': "It secures 'Liberty' of thought and expression.",
      'piece-5': "'Justice' in the Preamble covers social, economic, and political aspects.",
      'piece-6': "The Preamble starts with 'WE, THE PEOPLE OF INDIA...'",
      'piece-7': "'Fraternity' means a sense of common brotherhood.",
      'piece-8': "'Equality' ensures the absence of special privileges.",
      'piece-9': "The constitution came into effect on 26th January 1950.",
      'completionFact': "The Preamble is based on the 'Objectives Resolution', drafted by Jawaharlal Nehru."
    }
  },
  {
    id: 'mapOfIndia',
    name: 'Map of India',
    gridSize: 4,
    basePath: '/puzzles/map-of-india/',
    hintImage: '/puzzles/map-of-india-full.jpg',
    facts: {
      'piece-1': "India is the seventh-largest country by area.",
      'piece-2': "Rajasthan is the largest state by area.",
      'piece-3': "The Tropic of Cancer passes through 8 Indian states.",
      'piece-4': "India shares land borders with seven countries.",
      'piece-5': "The southern-most point is Kanyakumari.",
      'piece-6': "New Delhi is the capital.",
      'piece-7': "The Himalayas form the northern boundary.",
      'piece-8': "Goa is the smallest state by area.",
      'piece-9': "India has 28 states and 8 union territories.",
      'piece-10': "Indian Standard Time is calculated from Mirzapur.",
      'piece-11': "Gujarat has the longest coastline.",
      'piece-12': "The river Ganga is the longest river in India.",
      'piece-13': "Mumbai is the financial capital.",
      'piece-14': "The Deccan Plateau covers most of southern India.",
      'piece-15': "The Andaman and Nicobar Islands are in the Bay of Bengal.",
      'piece-16': "The Thar Desert is India's largest desert.",
      'completionFact': "The political map of India has changed significantly since its independence in 1947."
    }
  },
  {
    id: 'emblem',
    name: 'National Emblem',
    gridSize: 4,
    basePath: '/puzzles/national-emblem/',
    hintImage: '/puzzles/national-emblem-full.jpg',
    facts: {
      'piece-1': "It's an adaptation of the Lion Capital of Ashoka from Sarnath.",
      'piece-2': "It was adopted on January 26, 1950.",
      'piece-3': "The four lions symbolize power, courage, confidence, and pride.",
      'piece-4': "The central wheel is the Dharma Chakra.",
      'piece-5': "The motto 'Satyameva Jayate' means 'Truth Alone Triumphs'.",
      'piece-6': "The horse represents energy and the bull represents hard work.",
      'piece-7': "The original was erected by Emperor Ashoka in 250 BC.",
      'piece-8': "Its use is regulated by the State Emblem of India Act, 2005.",
      'piece-9': "Only three of the four lions are visible from any angle.",
      'piece-10': "The motto is from the Mundaka Upanishad.",
      'piece-11': "The animals are on a circular abacus.",
      'piece-12': "The original is carved out of a single block of polished sandstone.",
      'piece-13': "It represents India's sovereignty.",
      'piece-14': "The abacus also features an elephant and a lion.",
      'piece-15': "The bell-shaped lotus beneath the abacus was omitted.",
      'piece-16': "It is used on all official government documents.",
      'completionFact': "The motto 'Satyameva Jayate' is taken from the Mundaka Upanishad, an ancient Hindu scripture."
    }
  }
];

// --- KEYFRAMES ---
const KeyframesStyle = () => (
  <style>{`
    @keyframes pulse-hint { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
    @keyframes wobble {
      0%, 100% { transform: translateX(0); }
      15% { transform: translateX(-5px); }
      30% { transform: translateX(5px); }
      45% { transform: translateX(-5px); }
      60% { transform: translateX(5px); }
      75% { transform: translateX(-2px); }
    }
  `}</style>
);

const HowToPlay = () => (
  <div style={styles.howToPlayContainer}>
    <div style={styles.howToPlayStep}>
      <div style={styles.stepNumber}>1</div>
      <div>
        <h4 style={styles.stepTitle}>Select a Puzzle</h4>
        <p style={styles.stepText}>Choose a puzzle from the buttons above to begin.</p>
      </div>
    </div>
    <div style={styles.howToPlayStep}>
      <div style={styles.stepNumber}>2</div>
      <div>
        <h4 style={styles.stepTitle}>Drag a Piece</h4>
        <p style={styles.stepText}>Select a piece from the tray on the right by clicking and dragging it.</p>
      </div>
    </div>
    <div style={styles.howToPlayStep}>
      <div style={styles.stepNumber}>3</div>
      <div>
        <h4 style={styles.stepTitle}>Drop in Place</h4>
        <p style={styles.stepText}>Drop the piece onto the correct spot on the grid to learn a fact!</p>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
const JigsawPuzzle: React.FC = () => {
  const navigate = useNavigate();
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleData>(puzzles[0]);
  const [piecesInTray, setPiecesInTray] = useState<Piece[]>([]);
  const [boardState, setBoardState] = useState<(Piece | null)[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [fact, setFact] = useState<{ text: string; type: 'info' | 'error' } | null>(null);
  const [isHintActive, setHintActive] = useState(false);
  const [hintCountdown, setHintCountdown] = useState(0);
  const [draggedOverZone, setDraggedOverZone] = useState<number | null>(null);
  const [wobblePieceId, setWobblePieceId] = useState<string | null>(null);

  // ✅ TRACKING (SESSION + TIME) ADDED
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const startTimeRef = useRef<number>(Date.now());
  const trackedRef = useRef<boolean>(false);

  const resetTrackingSession = () => {
    sessionIdRef.current = crypto.randomUUID();
    startTimeRef.current = Date.now();
    trackedRef.current = false;
  };

  useEffect(() => {
    loadPuzzle(currentPuzzle.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPuzzle.id]);

  // ✅ TRACK ONLY WHEN COMPLETED (ONLY ONCE)
  useEffect(() => {
    const trackEnd = async () => {
      if (!isCompleted) return;
      if (trackedRef.current) return;

      trackedRef.current = true;

      const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);

      try {
        await userStatsAPI.trackGameEnd({
          sessionId: sessionIdRef.current,
          gameId: "jigsaw_puzzle",
          gameName: "Jigsaw Puzzle",
          timeTaken,
          isWin: true,
          meta: {
            puzzleId: currentPuzzle.id,
            puzzleName: currentPuzzle.name,
          },
        });
      } catch (error) {
        console.error("❌ trackGameEnd failed:", error);
      }
    };

    trackEnd();
  }, [isCompleted]);

  const loadPuzzle = (puzzleId: string) => {
    const puzzleData = puzzles.find(p => p.id === puzzleId)!;
    setCurrentPuzzle(puzzleData);
    const totalPieces = puzzleData.gridSize * puzzleData.gridSize;
    const newPieces: Piece[] = Array.from({ length: totalPieces }, (_, i) => ({
      id: `piece-${i + 1}`,
      src: `${puzzleData.basePath}piece-${i + 1}.png`,
      order: i + 1
    }));
    setPiecesInTray(newPieces.sort(() => Math.random() - 0.5));
    setBoardState(Array(totalPieces).fill(null));
    setIsCompleted(false);

    // ✅ RESET TRACKING ON NEW GAME / PLAY AGAIN
    resetTrackingSession();
  };

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>, pieceId: string) => {
    try { e.dataTransfer.setData('text/plain', pieceId); } catch (err) { e.dataTransfer.setData('pieceId', pieceId); }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, zoneIndex: number) => {
    e.preventDefault();
    setDraggedOverZone(null);
    let pieceId = e.dataTransfer.getData('text/plain');
    if (!pieceId) pieceId = e.dataTransfer.getData('pieceId');
    const correctPieceId = `piece-${zoneIndex + 1}`;

    if (pieceId === correctPieceId && !boardState[zoneIndex]) {
      const piece = piecesInTray.find(p => p.id === pieceId)!;
      const newBoardState = [...boardState];
      newBoardState[zoneIndex] = piece;
      setBoardState(newBoardState);
      setPiecesInTray(prev => prev.filter(p => p.id !== pieceId));
      const factText = currentPuzzle.facts[pieceId];
      if (factText) showFeedback(factText, 'info');
      if (newBoardState.filter(p => p !== null).length === currentPuzzle.gridSize * currentPuzzle.gridSize) {
        setIsCompleted(true);
      }
    } else {
      showFeedback("That's not the right spot!", 'error');
      setWobblePieceId(pieceId || null);
      setTimeout(() => setWobblePieceId(null), 500);
    }
  };

  const showFeedback = (text: string, type: 'info' | 'error') => {
    setFact({ text, type });
    setTimeout(() => setFact(null), 3000);
  };

  const handleHint = () => {
    if (isHintActive) return;
    setHintActive(true);
    setHintCountdown(3);
    const interval = setInterval(() => setHintCountdown(prev => prev - 1), 1000);
    setTimeout(() => { setHintActive(false); clearInterval(interval); setHintCountdown(0); }, 3000);
  };

  const placedCount = boardState.filter(p => p !== null).length;
  const totalPieces = currentPuzzle.gridSize * currentPuzzle.gridSize;
  const progressPercent = totalPieces > 0 ? Math.round((placedCount / totalPieces) * 100) : 0;

  return (
    <div style={styles.gameContainer}>
      <KeyframesStyle />

      {/* Back Button */}
      <div style={styles.backButtonContainer}>
        <button
          onClick={() => navigate('/games')}
          style={styles.backButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#f97316';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#9ca3af';
          }}
        >
          ← Back to Games
        </button>
      </div>

      {fact && (
        <div style={{ ...styles.factPopup, ...(fact.type === 'error' ? styles.factPopupError : {}) }}>
          {fact.text}
        </div>
      )}

      <div style={styles.gameHeader}>
        <h2 style={styles.h2}>Constitutional <span style={styles.span}>Jigsaw</span></h2>
        <p style={styles.p}>Solve the puzzle to unlock an interesting fact!</p>
      </div>

      <div style={styles.puzzleSelection}>
        {puzzles.map(p => (
          <button
            key={p.id}
            onClick={() => loadPuzzle(p.id)}
            style={{ ...styles.puzzleSelectBtn, ...(currentPuzzle.id === p.id ? styles.activeBtn : {}) }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <HowToPlay />

      <div style={{ width: '90%', maxWidth: '1000px', marginBottom: '1.5rem' }}>
        <ProgressBar value={progressPercent} />
      </div>

      <div style={styles.mainGameArea}>
        <div style={styles.boardWrapper}>
          <div
            style={{
              ...styles.puzzleBoard,
              gridTemplateColumns: `repeat(${currentPuzzle.gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${currentPuzzle.gridSize}, 1fr)`
            }}
          >
            {boardState.map((piece, index) => (
              <div
                key={index}
                style={{ ...styles.puzzleCell, ...(draggedOverZone === index ? styles.dropZoneHover : {}) }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnter={() => setDraggedOverZone(index)}
                onDragLeave={() => setDraggedOverZone(null)}
              >
                {piece && (
                  <img
                    src={piece.src}
                    alt={`piece-${index + 1}`}
                    style={styles.placedPiece}
                    draggable={false}
                  />
                )}
              </div>
            ))}

            {isHintActive && (
              <>
                <div style={{ ...styles.hintOverlay, backgroundImage: `url(${currentPuzzle.hintImage})` }} />
                <div style={styles.hintTimer}>{hintCountdown}</div>
              </>
            )}
          </div>

          <div style={styles.gameControls}>
            <button onClick={handleHint} style={styles.hintBtn} disabled={isHintActive}>💡 Hint</button>
          </div>
        </div>

        <div style={styles.piecesTray}>
          <h3 style={{ color: 'white', borderBottom: '1px solid #374151', paddingBottom: '1rem', marginBottom: '1rem', textAlign: 'center', flexShrink: 0 }}>
            Puzzle Pieces
          </h3>

          <div style={styles.trayContent}>
            {piecesInTray.map(piece => (
              <div key={piece.id} style={styles.trayCell}>
                <img
                  id={piece.id}
                  src={piece.src}
                  alt={piece.id}
                  style={{ ...styles.puzzlePiece, animation: wobblePieceId === piece.id ? 'wobble 0.5s' : 'none' }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, piece.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCompleted && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Puzzle Complete!</h2>
            <h3>Here's an interesting fact:</h3>
            <p>{currentPuzzle.facts.completionFact}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.25rem' }}>
              <button onClick={() => loadPuzzle(currentPuzzle.id)} style={styles.playAgainBtn}>
                Play Again
              </button>
              <button
                onClick={() => navigate('/games')}
                style={{
                  ...styles.playAgainBtn,
                  background: '#374151',
                  border: '1px solid #4b5563'
                }}
              >
                Back to Games
              </button>
            </div>
          </div>
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
    padding: '1rem',
    backgroundColor: '#111827',
    color: '#e5e7eb',
    fontFamily: 'sans-serif',
    minHeight: '100vh',
    boxSizing: 'border-box',
    width: '100%'
  },

  // Back Button Styles
  backButtonContainer: {
    width: '100%',
    maxWidth: '1300px',
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

  gameHeader: { textAlign: 'center', marginBottom: '1rem' },
  h2: { fontSize: '2.2rem', fontWeight: '700', color: 'white', margin: 0 },
  span: { color: '#f97316' },
  p: { fontSize: '1rem', color: '#9ca3af', marginTop: '0.25rem' },

  puzzleSelection: { display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' },
  puzzleSelectBtn: {
    background: '#374151',
    color: 'white',
    border: '1px solid #4b5563',
    padding: '0.45rem 0.9rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'all 0.2s'
  },
  activeBtn: { background: '#f97316', borderColor: '#f97316' },

  howToPlayContainer: {
    width: '100%',
    maxWidth: '900px',
    backgroundColor: 'rgba(31, 41, 55, 0.6)',
    backdropFilter: 'blur(5px)',
    borderRadius: '12px',
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #374151',
    display: 'flex',
    justifyContent: 'space-around',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  howToPlayStep: { display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '180px' },
  stepNumber: { flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#374151', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' },
  stepTitle: { margin: 0, color: 'white', fontWeight: '700', fontSize: '0.9rem' },
  stepText: { margin: 0, color: '#9ca3af', fontSize: '0.8rem' },

  mainGameArea: { display: 'flex', gap: '2rem', width: '100%', maxWidth: '1300px', alignItems: 'flex-start', justifyContent: 'center' },

  boardWrapper: {
    flex: '1 1 55%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '560px',
    aspectRatio: '1/1'
  },

  puzzleBoard: {
    display: 'grid',
    border: '3px solid #4b5563',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#111827',
    width: '100%',
    height: '100%'
  },

  puzzleCell: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1/1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f1724',
    overflow: 'hidden',
    border: '1px dashed #26303a'
  },

  placedPiece: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    display: 'block',
    userSelect: 'none',
    pointerEvents: 'none'
  },

  dropZoneHover: { backgroundColor: 'rgba(249,115,22,0.18)' },

  hintOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity: 0.6,
    animation: 'pulse-hint 1.5s infinite ease-in-out'
  },

  hintTimer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '4.5rem',
    fontWeight: '700',
    color: 'white',
    textShadow: '0 0 10px black'
  },

  gameControls: { marginTop: '1rem', display: 'flex', justifyContent: 'center' },
  hintBtn: { background: '#374151', color: '#facc15', border: '1px solid #4b5563', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' },

  piecesTray: {
    flex: '0 0 30%',
    backgroundColor: '#1f2937',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #374151',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  trayContent: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 70px)',
    gridAutoRows: '70px',
    gap: '0.6rem',
    justifyContent: 'center',
    alignContent: 'start',
    overflow: 'hidden',
    padding: '0.3rem'
  },

  trayCell: {
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0f1724',
    borderRadius: '6px',
    border: '1px solid #26303a',
    overflow: 'hidden'
  },

  puzzlePiece: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    cursor: 'grab',
    borderRadius: '4px',
    transition: 'transform 0.18s'
  },

  factPopup: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#111827',
    color: 'white',
    padding: '1rem 1.8rem',
    borderRadius: '8px',
    border: '1px solid #f97316',
    zIndex: 100,
    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
  },
  factPopupError: { borderColor: '#ef4444' },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
    backdropFilter: 'blur(4px)'
  },

  modalContent: {
    backgroundColor: '#1f2937',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #4b5563',
    color: 'white',
    boxShadow: '0 8px 20px rgba(0,0,0,0.45)'
  },

  playAgainBtn: {
    marginTop: '1.25rem',
    background: '#f97316',
    color: 'white',
    border: 'none',
    padding: '0.7rem 1.6rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'all 0.2s'
  }
};

export default JigsawPuzzle;