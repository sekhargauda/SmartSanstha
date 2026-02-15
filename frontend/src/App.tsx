// // frontend/src/App.tsx

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import { Layout } from './components/layout/Layout';
// import { HomePage } from './pages/HomePage';
// import { AboutPage } from './pages/AboutPage';
// import { ContactPage } from './pages/ContactPage';
// import { ArticlePage } from './pages/ArticlePage';
// import { PartArticlesPage } from './pages/PartArticlesPage';
// import { LearnPage } from './components/learn/LearnPage';
// import { MemoryGame } from './components/games/MemoryGame/MemoryGame';
// import { RightsDutiesGame } from './components/games/RightsDutiesGame/RightsDutiesGame';
// import CivicCityBuilder from './components/games/CivicCityBuilder/CivicCityBuilder';
// import JigsawPuzzle from './components/games/JigsawPuzzle/JigsawPuzzle';
// import { Dashboard } from './components/dashboard/Dashboard';
// import { ChatbotFloating } from './components/chatbot/ChatbotFloating';
// import { CourtSimulationPage } from './pages/CourtSimulationPage';
// import { GamesPage } from './pages/GamesPage';
// import { AuthPage } from './pages/AuthPage';
// import { AdminLoginPage } from './pages/AdminLoginPage';
// import { AdminDashboard } from './components/dashboard/AdminDashboard';
// import { auth } from './firebase';

// export interface UserData {
//   id: string;
//   name: string;
//   email: string;
//   category?: string;
//   type?: string;
// }

// // Auth wrapper component for login/admin-login pages
// const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
//       <div className="fixed inset-0 opacity-10 pointer-events-none">
//         <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute top-1/3 right-20 w-40 h-40 bg-red-500 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: '1s' }}
//         ></div>
//         <div
//           className="absolute bottom-20 left-1/4 w-36 h-36 bg-yellow-500 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: '2s' }}
//         ></div>
//         <div
//           className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-amber-500 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: '3s' }}
//         ></div>
//       </div>
//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// };

// // Protected route wrapper
// const ProtectedRoute: React.FC<{ children: React.ReactNode; user: UserData | null }> = ({ children, user }) => {
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   return <>{children}</>;
// };

// // Admin route wrapper
// const AdminRoute: React.FC<{ children: React.ReactNode; user: UserData | null }> = ({ children, user }) => {
//   if (!user) {
//     return <Navigate to="/admin-login" replace />;
//   }
//   if (user.type !== 'admin') {
//     return <Navigate to="/" replace />;
//   }
//   return <>{children}</>;
// };

// function AppContent() {
//   const [user, setUser] = useState<UserData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   const API_URL = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:5001';

//   // Check user session on mount
//   useEffect(() => {
//     const checkUserSession = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/user/me`, {
//           credentials: 'include',
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUser(data.profile);
//         } else if (response.status === 401) {
//           const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
//             method: 'POST',
//             credentials: 'include',
//           });

//           if (refreshResponse.ok) {
//             const retryResponse = await fetch(`${API_URL}/api/user/me`, {
//               credentials: 'include',
//             });

//             if (retryResponse.ok) {
//               const data = await retryResponse.json();
//               setUser(data.profile);
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Session check failed:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     checkUserSession();
//   }, [API_URL]);

//   const handleLoginSuccess = (userData: UserData) => {
//     setUser(userData);
//     navigate('/');
//   };

//   const handleLogout = async () => {
//     try {
//       await fetch(`${API_URL}/api/auth/logout`, {
//         method: 'POST',
//         credentials: 'include',
//       });

//       await auth.signOut();

//       setUser(null);
//       navigate('/');
//     } catch (error) {
//       console.error('Logout error:', error);
//       setUser(null);
//       navigate('/');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Routes>
//         {/* Auth Routes (No Layout) */}
//         <Route
//           path="/login"
//           element={
//             user ? (
//               <Navigate to="/" replace />
//             ) : (
//               <AuthLayout>
//                 <AuthPage onLoginSuccess={handleLoginSuccess} />
//               </AuthLayout>
//             )
//           }
//         />
//         <Route
//           path="/admin-login"
//           element={
//             user?.type === 'admin' ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <AuthLayout>
//                 <AdminLoginPage onLoginSuccess={handleLoginSuccess} />
//               </AuthLayout>
//             )
//           }
//         />

//         {/* Main Routes (With Layout) */}
//         <Route
//           path="/*"
//           element={
//             <Layout user={user} onLogout={handleLogout}>
//               <Routes>
//                 <Route path="/" element={<HomePage user={user} />} />
//                 <Route path="/about" element={<AboutPage />} />
//                 <Route path="/contact" element={<ContactPage />} />

//                 {/* Protected Routes */}
//                 <Route
//                   path="/learn"
//                   element={
//                     <ProtectedRoute user={user}>
//                       <LearnPage user={user} />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/learn/part/:partId"
//                   element={
//                     <ProtectedRoute user={user}>
//                       <PartArticlesPage />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/learn/article/:articleId"
//                   element={
//                     <ProtectedRoute user={user}>
//                       <ArticlePage />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/games"
//                   element={
//                     <ProtectedRoute user={user}>
//                       <GamesPage />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/games/memory"
//                   element={
//                     <ProtectedRoute user={user}>
//                       <MemoryGame />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/games/rights-duties"
//                   element={
//                     <ProtectedRoute user={user}>
//                       <RightsDutiesGame />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/games/civic-builder"
//                   element={
//                     <ProtectedRoute user={user}>
//                       <CivicCityBuilder />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/games/jigsaw"
//                   element={
//                     <ProtectedRoute user={user}>
//                       <JigsawPuzzle />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/court-simulation"
//                   element={
//                     <ProtectedRoute user={user}>
//                       <CourtSimulationPage />
//                     </ProtectedRoute>
//                   }
//                 />

//                 {/* Dashboard Routes */}
//                 <Route
//                   path="/dashboard"
//                   element={
//                     <ProtectedRoute user={user}>
//                       {user?.type === 'admin' ? (
//                         <AdminDashboard admin={user} />
//                       ) : (
//                         <Dashboard user={user!} />
//                       )}
//                     </ProtectedRoute>
//                   }
//                 />

//                 {/* 404 */}
//                 <Route path="*" element={<Navigate to="/" replace />} />
//               </Routes>
//             </Layout>
//           }
//         />
//       </Routes>

//       {/* Chatbot - Show everywhere except auth pages */}
//       {user && <ChatbotFloating user={user} />}
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

// export default App;

// frontend/src/App.tsx

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { ArticlePage } from "./pages/ArticlePage";
import { PartArticlesPage } from "./pages/PartArticlesPage";
import { LearnPage } from "./components/learn/LearnPage";
import { MemoryGame } from "./components/games/MemoryGame/MemoryGame";
import { RightsDutiesGame } from "./components/games/RightsDutiesGame/RightsDutiesGame";
import CivicCityBuilder from "./components/games/CivicCityBuilder/CivicCityBuilder";
import JigsawPuzzle from "./components/games/JigsawPuzzle/JigsawPuzzle";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ChatbotFloating } from "./components/chatbot/ChatbotFloating";
import { CourtSimulationPage } from "./pages/CourtSimulationPage";
import { GamesPage } from "./pages/GamesPage";
import { AuthPage } from "./pages/AuthPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import { auth } from "./firebase";

export interface UserData {
  id: string;
  name: string;
  email: string;
  category?: string;
  type?: string;
}

// Auth wrapper component for login/admin-login pages
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/3 right-20 w-40 h-40 bg-red-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-36 h-36 bg-yellow-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-amber-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Protected route wrapper
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  user: UserData | null;
}> = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Admin route wrapper
const AdminRoute: React.FC<{
  children: React.ReactNode;
  user: UserData | null;
}> = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }
  if (user.type !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function AppContent() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_AUTH_API_BASE_URL || "http://localhost:5001";

  // Check user session on mount
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user/me`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.profile);
        } else if (response.status === 401) {
          const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
          });

          if (refreshResponse.ok) {
            const retryResponse = await fetch(`${API_URL}/api/user/me`, {
              credentials: "include",
            });

            if (retryResponse.ok) {
              const data = await retryResponse.json();
              setUser(data.profile);
            }
          }
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, [API_URL]);

  const handleLoginSuccess = (userData: UserData) => {
    setUser(userData);
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      await auth.signOut();

      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
      navigate("/");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Auth Routes (No Layout) */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <AuthLayout>
                <AuthPage onLoginSuccess={handleLoginSuccess} />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/admin-login"
          element={
            user?.type === "admin" ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <AdminLoginPage onLoginSuccess={handleLoginSuccess} />
              </AuthLayout>
            )
          }
        />

        {/* Main Routes (With Layout) */}
        <Route
          path="/*"
          element={
            <Layout user={user} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Protected Routes */}
                <Route
                  path="/learn"
                  element={
                    <ProtectedRoute user={user}>
                      <LearnPage user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/learn/part/:partId"
                  element={
                    <ProtectedRoute user={user}>
                      <PartArticlesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/learn/article/:articleId"
                  element={
                    <ProtectedRoute user={user}>
                      {/* 👇 Pass user prop here */}
                      <ArticlePage user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games"
                  element={
                    <ProtectedRoute user={user}>
                      <GamesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/memory"
                  element={
                    <ProtectedRoute user={user}>
                      <MemoryGame />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/rights-duties"
                  element={
                    <ProtectedRoute user={user}>
                      <RightsDutiesGame />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/civic-builder"
                  element={
                    <ProtectedRoute user={user}>
                      <CivicCityBuilder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/games/jigsaw"
                  element={
                    <ProtectedRoute user={user}>
                      <JigsawPuzzle />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/court-simulation"
                  element={
                    <ProtectedRoute user={user}>
                      <CourtSimulationPage />
                    </ProtectedRoute>
                  }
                />

                {/* Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute user={user}>
                      {user?.type === "admin" ? (
                        <AdminDashboard admin={user} />
                      ) : (
                        <Dashboard user={user!} />
                      )}
                    </ProtectedRoute>
                  }
                />

                {/* 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>

      {/* Chatbot - Show everywhere except auth pages */}
      {user && <ChatbotFloating user={user} />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
