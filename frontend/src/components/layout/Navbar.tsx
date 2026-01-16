import React, { useState } from 'react';
import {
  BookOpen, Menu, X, Home, BookMarked, Gamepad2, User,
  BarChart3, Mail, Scale, LogIn, LogOut
} from 'lucide-react';

interface UserData {
  name: string;
}

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: UserData | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Define groups of navigation items
  const startItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
  ];

  const contactItem = { id: 'contact', label: 'Contact', icon: Mail };

  const authenticatedItems = [
    { id: 'learn', label: 'Learn', icon: BookMarked },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'court-simulation', label: 'Court', icon: Scale },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  ];

  // 2. Construct the final list based on User Status
  let navItems;

  if (user) {
    // Logged In: Contact goes to the VERY END
    navItems = [...startItems, ...authenticatedItems, contactItem];
  } else {
    // Logged Out: Contact is after About
    navItems = [...startItems, contactItem];
  }

  // Helper to determine if a link is active
  const checkActive = (itemId: string) => {
    return currentPage === itemId ||
      (itemId === 'games' && ['memory-game', 'rights-duties-game'].includes(currentPage));
  };

  const NavLink = ({ item, action, children, customActive }: { item?: any; action?: () => void; children: React.ReactNode; customActive?: boolean }) => {
    // Determine active state: either specific item match OR manual override (for Sign In)
    const isActive = customActive || (item && checkActive(item.id));

    return (
      <button
        onClick={action || (() => { if (item) onNavigate(item.id); setIsMenuOpen(false); })}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
          ${isActive
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' // Active State (Orange)
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'} // Inactive State (Grey)
        `}
      >
        {children}
      </button>
    );
  };

  const MobileNavLink = ({ item, action, children, customActive }: { item?: any; action?: () => void; children: React.ReactNode; customActive?: boolean }) => {
    const Icon = item?.icon;
    const isActive = customActive || (item && checkActive(item.id));

    return (
      <button
        onClick={action || (() => { if (item) onNavigate(item.id); setIsMenuOpen(false); })}
        className={`
          w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300
          ${isActive
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
        `}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </button>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                SmartSanstha
              </span>
              <p className="text-[10px] text-slate-400 -mt-1">Learn. Play. Grow.</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map(item => (
              <NavLink key={item.id} item={item}>{item.label}</NavLink>
            ))}

            {/* User Auth Section */}
            {user ? (
              <>
                <span className="text-sm text-slate-300 px-4 border-l border-slate-700 ml-2">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              // Sign In Button: NOW USES STANDARD STYLING (Only Orange if Active)
              <NavLink
                action={() => onNavigate('auth')}
                customActive={currentPage === 'auth'}
              >
                Sign In
              </NavLink>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in-down border-t border-slate-800">
          <nav className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <MobileNavLink key={item.id} item={item}>
                {item.label}
              </MobileNavLink>
            ))}


            {user ? (
              <div className="pt-2 border-t border-slate-700/50">
                <MobileNavLink action={onLogout}>
                  <LogOut className="w-5 h-5" />Logout
                </MobileNavLink>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-700/50">
                <MobileNavLink
                  action={() => onNavigate('auth')}
                  customActive={currentPage === 'auth'}
                >
                  <LogIn className="w-5 h-5" />Sign In
                </MobileNavLink>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};