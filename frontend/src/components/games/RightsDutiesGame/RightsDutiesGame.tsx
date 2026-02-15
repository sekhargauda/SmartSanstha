// // frontend/src/components/games/RightsDutiesGame/RightsDutiesGame.tsx

// import React, { useEffect, useRef, useState } from "react";
// import { Scale, Info, ArrowLeft } from "lucide-react";
// import { SCENARIOS } from "../../../data/gamesData";
// import { IToken, IRandomEvent } from "../../../types";
// import { BalanceMeter } from "./BalanceMeter";
// import { ScenarioDisplay } from "./ScenarioDisplay";
// import { TokenTray } from "./TokenTray";
// import { DropScale } from "./DropScale";
// import { Modal } from "../../common/Modal";
// import { Button } from "../../common/Button";
// import { Card } from "../../common/Card";
// import { userStatsAPI } from "../../../services/api";

// interface RightsDutiesGameProps {
//   onNavigate: (page: string) => void;
// }

// export const RightsDutiesGame: React.FC<RightsDutiesGameProps> = ({ onNavigate }) => {
//   const [gameState, setGameState] = useState<"playing" | "debrief" | "end">("playing");
//   const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
//   const [freedom, setFreedom] = useState(50);
//   const [order, setOrder] = useState(50);

//   const [debriefResult, setDebriefResult] = useState<{
//     token: IToken;
//     randomEvent?: IRandomEvent;
//     finalFreedom: number;
//     finalOrder: number;
//   } | null>(null);

//   const currentScenario = SCENARIOS[currentScenarioIndex];

//   // ✅ tracking session per full game play
//   const sessionIdRef = useRef<string>(crypto.randomUUID());
//   const startTimeRef = useRef<number>(Date.now());
//   const trackedRef = useRef(false);

//   const resetTrackingSession = () => {
//     sessionIdRef.current = crypto.randomUUID();
//     startTimeRef.current = Date.now();
//     trackedRef.current = false;
//   };

//   const handleTokenDrop = (token: IToken) => {
//     let finalFreedom = freedom + token.meter.freedom;
//     let finalOrder = order + token.meter.order;
//     let triggeredEvent: IRandomEvent | undefined;

//     if (currentScenario.randomEvents) {
//       for (const event of currentScenario.randomEvents) {
//         if (Math.random() < event.chance) {
//           triggeredEvent = event;
//           finalFreedom += event.effect.freedom;
//           finalOrder += event.effect.order;
//           break;
//         }
//       }
//     }

//     finalFreedom = Math.max(0, Math.min(100, finalFreedom));
//     finalOrder = Math.max(0, Math.min(100, finalOrder));

//     setFreedom(finalFreedom);
//     setOrder(finalOrder);

//     setDebriefResult({ token, randomEvent: triggeredEvent, finalFreedom, finalOrder });
//     setGameState("debrief");
//   };

//   const handleNextScenario = () => {
//     if (currentScenarioIndex < SCENARIOS.length - 1) {
//       setCurrentScenarioIndex((prev) => prev + 1);
//       setDebriefResult(null);
//       setGameState("playing");
//     } else {
//       setGameState("end");
//     }
//   };

//   const restartGame = () => {
//     setFreedom(50);
//     setOrder(50);
//     setCurrentScenarioIndex(0);
//     setDebriefResult(null);
//     setGameState("playing");

//     // ✅ new play session
//     resetTrackingSession();
//   };

//   const getFinalMessage = () => {
//     if (freedom > 70 && order < 30)
//       return { title: "Chaos Reigns!", message: "Too much freedom without order led to instability.", emoji: "⚠️" };

//     if (order > 70 && freedom < 30)
//       return { title: "Authoritarian State!", message: "Too much order suppressed fundamental freedoms.", emoji: "🔒" };

//     if (Math.abs(freedom - order) < 15)
//       return { title: "Perfect Balance!", message: "You maintained an excellent equilibrium between rights and duties.", emoji: "⚖️" };

//     return { title: "Good Effort!", message: "You navigated the scenarios with reasonable balance.", emoji: "👏" };
//   };

//   // ✅ Track ONLY ON end state (once)
//   useEffect(() => {
//     const trackEnd = async () => {
//       if (gameState !== "end") return;
//       if (trackedRef.current) return;

//       trackedRef.current = true;

//       const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);

//       try {
//         await userStatsAPI.trackGameEnd({
//           sessionId: sessionIdRef.current,
//           gameId: "rights_duties_game",
//           gameName: "Rights vs Duties",
//           timeTaken,
//           isWin: true, // ✅ game completed
//           meta: {
//             finalFreedom: freedom,
//             finalOrder: order,
//             scenariosCompleted: SCENARIOS.length,
//           },
//         });
//       } catch (err) {
//         console.error("trackGameEnd error:", err);
//       }
//     };

//     trackEnd();
//   }, [gameState, freedom, order]);

//   return (
//     <div className="w-full min-h-screen bg-slate-900 py-8 px-4">
//       <div className="w-full max-w-5xl mx-auto animate-fade-in">
//         <button
//           onClick={() => onNavigate("games")}
//           className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-8 group"
//         >
//           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//           <span className="font-medium">Back to Games</span>
//         </button>

//         <header className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl mb-6">
//             <Scale className="w-10 h-10 text-white" />
//           </div>

//           <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
//             Rights vs{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
//               Duties
//             </span>
//           </h1>

//           <p className="text-lg text-slate-400">
//             Navigate complex scenarios and balance freedom with order
//           </p>
//         </header>

//         {gameState === "playing" && currentScenarioIndex === 0 && (
//           <Card className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                 <Info className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-white mb-2">How to Play</h3>
//                 <ol className="text-slate-300 text-sm space-y-1 list-decimal list-inside">
//                   <li>Read the scenario carefully</li>
//                   <li>
//                     <strong>Drag a decision token</strong> from the bottom
//                   </li>
//                   <li>
//                     <strong>Drop it in the decision zone</strong>
//                   </li>
//                   <li>See how your choice affects the balance</li>
//                   <li>Complete all scenarios to see your final result</li>
//                 </ol>
//               </div>
//             </div>
//           </Card>
//         )}

//         <main>
//           {(gameState === "playing" || gameState === "debrief") && (
//             <>
//               <BalanceMeter freedom={freedom} order={order} />
//               <ScenarioDisplay
//                 scenario={currentScenario}
//                 currentIndex={currentScenarioIndex}
//                 totalScenarios={SCENARIOS.length}
//               />
//               <DropScale onDrop={handleTokenDrop} />
//               <TokenTray tokens={currentScenario.tokens} />
//             </>
//           )}

//           {gameState === "debrief" && debriefResult && (
//             <Modal isOpen={true} onClose={() => {}} size="lg">
//               <div className="text-center">
//                 <h2 className="text-3xl font-bold text-orange-400 mb-4">Decision Impact</h2>

//                 <p className="text-slate-300 text-lg mb-4">
//                   You chose:{" "}
//                   <span className="font-bold text-white">{debriefResult.token.label}</span>
//                 </p>

//                 <Button onClick={handleNextScenario} variant="primary" size="lg">
//                   {currentScenarioIndex < SCENARIOS.length - 1
//                     ? "Next Scenario →"
//                     : "See Final Results"}
//                 </Button>
//               </div>
//             </Modal>
//           )}

//           {gameState === "end" && (
//             <div className="text-center">
//               <div className="text-6xl mb-4">{getFinalMessage().emoji}</div>
//               <h2 className="text-4xl font-bold text-white mb-2">{getFinalMessage().title}</h2>
//               <p className="text-xl mt-4 text-slate-300 mb-8">{getFinalMessage().message}</p>

//               <div className="flex gap-3 justify-center mt-8">
//                 <Button onClick={restartGame} variant="primary" size="lg">
//                   Play Again
//                 </Button>
//                 <Button onClick={() => onNavigate("games")} variant="outline" size="lg">
//                   <ArrowLeft className="w-4 h-4 mr-2" />
//                   Back to Games
//                 </Button>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };










// frontend/src/components/games/RightsDutiesGame/RightsDutiesGame.tsx

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scale, Info, ArrowLeft } from "lucide-react";
import { SCENARIOS } from "../../../data/gamesData";
import { IToken, IRandomEvent } from "../../../types";
import { BalanceMeter } from "./BalanceMeter";
import { ScenarioDisplay } from "./ScenarioDisplay";
import { TokenTray } from "./TokenTray";
import { DropScale } from "./DropScale";
import { Modal } from "../../common/Modal";
import { Button } from "../../common/Button";
import { Card } from "../../common/Card";
import { userStatsAPI } from "../../../services/api";

export const RightsDutiesGame: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<"playing" | "debrief" | "end">("playing");
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [freedom, setFreedom] = useState(50);
  const [order, setOrder] = useState(50);

  const [debriefResult, setDebriefResult] = useState<{
    token: IToken;
    randomEvent?: IRandomEvent;
    finalFreedom: number;
    finalOrder: number;
  } | null>(null);

  const currentScenario = SCENARIOS[currentScenarioIndex];

  // ✅ tracking session per full game play
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const startTimeRef = useRef<number>(Date.now());
  const trackedRef = useRef(false);

  const resetTrackingSession = () => {
    sessionIdRef.current = crypto.randomUUID();
    startTimeRef.current = Date.now();
    trackedRef.current = false;
  };

  const handleTokenDrop = (token: IToken) => {
    let finalFreedom = freedom + token.meter.freedom;
    let finalOrder = order + token.meter.order;
    let triggeredEvent: IRandomEvent | undefined;

    if (currentScenario.randomEvents) {
      for (const event of currentScenario.randomEvents) {
        if (Math.random() < event.chance) {
          triggeredEvent = event;
          finalFreedom += event.effect.freedom;
          finalOrder += event.effect.order;
          break;
        }
      }
    }

    finalFreedom = Math.max(0, Math.min(100, finalFreedom));
    finalOrder = Math.max(0, Math.min(100, finalOrder));

    setFreedom(finalFreedom);
    setOrder(finalOrder);

    setDebriefResult({ token, randomEvent: triggeredEvent, finalFreedom, finalOrder });
    setGameState("debrief");
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      setDebriefResult(null);
      setGameState("playing");
    } else {
      setGameState("end");
    }
  };

  const restartGame = () => {
    setFreedom(50);
    setOrder(50);
    setCurrentScenarioIndex(0);
    setDebriefResult(null);
    setGameState("playing");

    // ✅ new play session
    resetTrackingSession();
  };

  const getFinalMessage = () => {
    if (freedom > 70 && order < 30)
      return { title: "Chaos Reigns!", message: "Too much freedom without order led to instability.", emoji: "⚠️" };

    if (order > 70 && freedom < 30)
      return { title: "Authoritarian State!", message: "Too much order suppressed fundamental freedoms.", emoji: "🔒" };

    if (Math.abs(freedom - order) < 15)
      return { title: "Perfect Balance!", message: "You maintained an excellent equilibrium between rights and duties.", emoji: "⚖️" };

    return { title: "Good Effort!", message: "You navigated the scenarios with reasonable balance.", emoji: "👏" };
  };

  // ✅ Track ONLY ON end state (once)
  useEffect(() => {
    const trackEnd = async () => {
      if (gameState !== "end") return;
      if (trackedRef.current) return;

      trackedRef.current = true;

      const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);

      try {
        await userStatsAPI.trackGameEnd({
          sessionId: sessionIdRef.current,
          gameId: "rights_duties_game",
          gameName: "Rights vs Duties",
          timeTaken,
          isWin: true, // ✅ game completed
          meta: {
            finalFreedom: freedom,
            finalOrder: order,
            scenariosCompleted: SCENARIOS.length,
          },
        });
      } catch (err) {
        console.error("trackGameEnd error:", err);
      }
    };

    trackEnd();
  }, [gameState, freedom, order]);

  return (
    <div className="w-full min-h-screen bg-slate-900 py-8 px-4">
      <div className="w-full max-w-5xl mx-auto animate-fade-in">
        <button
          onClick={() => navigate('/games')}
          className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Games</span>
        </button>

        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl mb-6">
            <Scale className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Rights vs{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Duties
            </span>
          </h1>

          <p className="text-lg text-slate-400">
            Navigate complex scenarios and balance freedom with order
          </p>
        </header>

        {gameState === "playing" && currentScenarioIndex === 0 && (
          <Card className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">How to Play</h3>
                <ol className="text-slate-300 text-sm space-y-1 list-decimal list-inside">
                  <li>Read the scenario carefully</li>
                  <li>
                    <strong>Drag a decision token</strong> from the bottom
                  </li>
                  <li>
                    <strong>Drop it in the decision zone</strong>
                  </li>
                  <li>See how your choice affects the balance</li>
                  <li>Complete all scenarios to see your final result</li>
                </ol>
              </div>
            </div>
          </Card>
        )}

        <main>
          {(gameState === "playing" || gameState === "debrief") && (
            <>
              <BalanceMeter freedom={freedom} order={order} />
              <ScenarioDisplay
                scenario={currentScenario}
                currentIndex={currentScenarioIndex}
                totalScenarios={SCENARIOS.length}
              />
              <DropScale onDrop={handleTokenDrop} />
              <TokenTray tokens={currentScenario.tokens} />
            </>
          )}

          {gameState === "debrief" && debriefResult && (
            <Modal isOpen={true} onClose={() => {}} size="lg">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-orange-400 mb-4">Decision Impact</h2>

                <p className="text-slate-300 text-lg mb-4">
                  You chose:{" "}
                  <span className="font-bold text-white">{debriefResult.token.label}</span>
                </p>

                <Button onClick={handleNextScenario} variant="primary" size="lg">
                  {currentScenarioIndex < SCENARIOS.length - 1
                    ? "Next Scenario →"
                    : "See Final Results"}
                </Button>
              </div>
            </Modal>
          )}

          {gameState === "end" && (
            <div className="text-center">
              <div className="text-6xl mb-4">{getFinalMessage().emoji}</div>
              <h2 className="text-4xl font-bold text-white mb-2">{getFinalMessage().title}</h2>
              <p className="text-xl mt-4 text-slate-300 mb-8">{getFinalMessage().message}</p>

              <div className="flex gap-3 justify-center mt-8">
                <Button onClick={restartGame} variant="primary" size="lg">
                  Play Again
                </Button>
                <Button onClick={() => navigate('/games')} variant="outline" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Games
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};