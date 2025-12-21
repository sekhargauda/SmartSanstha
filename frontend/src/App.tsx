// frontend/src/App.tsx

import React, { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ArticlePage } from './pages/ArticlePage';
import { PartArticlesPage } from './pages/PartArticlesPage';
import { LearnPage } from './components/learn/LearnPage';
import { MemoryGame } from './components/games/MemoryGame/MemoryGame';
import { RightsDutiesGame } from './components/games/RightsDutiesGame/RightsDutiesGame';
import CivicCityBuilder from './components/games/CivicCityBuilder/CivicCityBuilder';
import JigsawPuzzle from './components/games/JigsawPuzzle/JigsawPuzzle';
import { Dashboard } from './components/dashboard/Dashboard';
import { ChatbotFloating } from './components/chatbot/ChatbotFloating';
import { CourtSimulationPage } from './pages/CourtSimulationPage';
import { GamesPage } from './pages/GamesPage';
import { AuthPage } from './pages/AuthPage';

export interface UserData {
  id: string;
  name: string;
  email: string;
  category: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState<any>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // App.tsx
  const API_URL = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:5001';


  // Check user session on app load
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Try to get user me
        const response = await fetch(`${API_URL}/api/user/me`, {
          credentials: 'include',
        });


        if (response.ok) {
          const data = await response.json();
          setUser(data.profile);
        } else if (response.status === 401) {
          // Access token expired, try to refresh
          const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshResponse.ok) {
            // Retry getting user me with new access token
            const retryResponse = await fetch(`${API_URL}/api/user/me`, {
              credentials: 'include',
            });


            if (retryResponse.ok) {
              const data = await retryResponse.json();
              setUser(data.profile);
            }
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, [API_URL]);

  const handleLoginSuccess = (userData: UserData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setCurrentPage('home');
    }
  };

  const handleNavigation = (page: string, data?: any) => {
    console.log('🧭 Navigation called:', page, data);
    setCurrentPage(page);
    setPageData(data || null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} user={user} />;
      case 'about':
        return <AboutPage />;
      case 'learn':
        return <LearnPage onNavigate={handleNavigation} user={user} />;
      case 'part-articles':
        return <PartArticlesPage onNavigate={handleNavigation} partData={pageData} />;
      case 'article':
        return <ArticlePage onNavigate={handleNavigation} articleData={pageData} />;
      case 'games':
        return <GamesPage onNavigate={handleNavigation} />;
      case 'memory-game':
        return <MemoryGame onNavigate={handleNavigation} />;
      case 'rights-duties-game':
        return <RightsDutiesGame onNavigate={handleNavigation} />;
      case 'civic-city-builder':
        return <CivicCityBuilder onNavigate={handleNavigation} />;
      case 'jigsaw-puzzle':
        return <JigsawPuzzle onNavigate={handleNavigation} />;
      case 'dashboard':
        return user ? <Dashboard user={user} /> : <HomePage onNavigate={handleNavigation} user={user} />;
      case 'contact':
        return <ContactPage />;
      case 'auth':
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;
      case 'court-simulation':
        return <CourtSimulationPage onNavigate={handleNavigation} />;
      default:
        return <HomePage onNavigate={handleNavigation} user={user} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        Loading...
      </div>
    );
  }

  // Conditionally render AuthPage without the Layout
  if (currentPage === 'auth') {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-1/3 right-20 w-40 h-40 bg-red-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-20 left-1/4 w-36 h-36 bg-yellow-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-amber-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '3s' }}
          ></div>
        </div>
        <div className="relative z-10">
          <AuthPage onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  // Render all other pages with the full Layout and Chatbot
  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={handleNavigation}
        user={user}
        onLogout={handleLogout}
      >
        {renderPage()}
      </Layout>
      <ChatbotFloating user={user} />
    </>
  );
}

export default App;