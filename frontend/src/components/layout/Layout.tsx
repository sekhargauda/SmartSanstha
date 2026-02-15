// import React from 'react';
// import { Navbar } from './Navbar';
// import { Footer } from './Footer';
// import type { UserData } from '../../App'; // Import the user type

// export interface LayoutProps {
//   currentPage: string;
//   onNavigate: (page: string) => void;
//   onLogout: () => void;
//   user: UserData | null;
//   children: React.ReactNode;
// }

// export const Layout: React.FC<LayoutProps> = ({ currentPage, onNavigate, onLogout, user, children }) => {
//   return (
//     <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
//       {/* Background Pattern */}
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

//       {/* Navbar with user-aware props */}
//       <Navbar currentPage={currentPage} onNavigate={onNavigate} user={user} onLogout={onLogout} />
      
//       <main className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
//         {children}
//       </main>

//       <Footer onNavigate={onNavigate} />
//     </div>
//   );
// };










// frontend/src/components/layout/Layout.tsx

import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import type { UserData } from '../../App';

export interface LayoutProps {
  user: UserData | null;
  onLogout: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
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

      <Navbar user={user} onLogout={onLogout} />

      <main className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
        {children}
      </main>

      <Footer />
    </div>
  );
};