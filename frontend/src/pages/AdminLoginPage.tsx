// // frontend/src/pages/AdminLoginPage.tsx
// import React, { useState } from 'react';
// import { Shield, Mail, KeyRound, LogIn, Eye, EyeOff, ArrowLeft } from 'lucide-react';

// interface AdminData {
//   id: string;
//   name: string;
//   email: string;
//   type: string;
// }

// interface AdminLoginPageProps {
//   onLoginSuccess: (adminData: AdminData) => void;
//   onBack: () => void;
// }

// // --- Styled Components (Same as AuthPage) ---

// interface CardProps {
//   children: React.ReactNode;
//   className?: string;
// }

// const Card: React.FC<CardProps> = ({ children, className = '' }) => (
//   <div className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-xl p-6 ${className}`}>
//     {children}
//   </div>
// );

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   children: React.ReactNode;
//   icon?: React.ReactNode;
// }

// const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => (
//   <button
//     {...props}
//     className="flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
//   >
//     {icon}
//     {children}
//   </button>
// );

// interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   icon: React.ReactNode;
// }

// const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({ icon, ...props }, ref) => (
//   <div className="relative">
//     <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
//       {icon}
//     </div>
//     <input
//       ref={ref}
//       {...props}
//       className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-12 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
//     />
//   </div>
// ));

// // --- Main Component ---

// export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onBack }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const API_URL = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:5001';

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/api/auth/admin/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || 'Login failed');
//         setIsLoading(false);
//         return;
//       }

//       // Success
//       onLoginSuccess({
//         id: data.admin.id,
//         name: data.admin.name,
//         email: data.admin.email,
//         type: 'admin',
//       });

//     } catch (err: any) {
//       setError(err.message || 'Network error. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const PasswordToggle = () => (
//     <button
//       type="button"
//       onClick={() => setShowPassword(!showPassword)}
//       className="absolute inset-y-0 right-0 pr-4 text-slate-400 hover:text-slate-300 transition-colors"
//       tabIndex={-1}
//     >
//       {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//     </button>
//   );

//   return (
//     <div className="w-full max-w-md my-8">
//       <Card>
//         {/* Back Button */}
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-4"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           <span className="text-sm">Back to User Login</span>
//         </button>

//         <div className="text-center mb-6">
//           <div className="inline-flex w-16 h-16 items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
//             <Shield className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-white">Admin Login</h1>
//           <p className="text-slate-400 text-sm mt-2">
//             Access the admin dashboard
//           </p>
//         </div>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <InputField
//             icon={<Mail className="w-5 h-5" />}
//             type="email"
//             placeholder="Admin Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             autoComplete="email"
//           />

//           <div className="relative">
//             <InputField
//               icon={<KeyRound className="w-5 h-5" />}
//               type={showPassword ? "text" : "password"}
//               placeholder="Admin Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength={6}
//               autoComplete="current-password"
//             />
//             <PasswordToggle />
//           </div>

//           {error && (
//             <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
//               <p className="text-red-400 text-sm text-center">{error}</p>
//             </div>
//           )}

//           <Button
//             type="submit"
//             disabled={isLoading}
//             icon={<LogIn className="w-5 h-5" />}
//           >
//             {isLoading ? "Logging in..." : "Sign In as Admin"}
//           </Button>
//         </form>

//         <div className="mt-6 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
//           <p className="text-xs text-slate-400 text-center">
//             Admin access only. Unauthorized access is prohibited.
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// };





// frontend/src/pages/AdminLoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ ADD THIS IMPORT
import { Shield, Mail, KeyRound, LogIn, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface AdminData {
  id: string;
  name: string;
  email: string;
  type: string;
}

interface AdminLoginPageProps {
  onLoginSuccess: (adminData: AdminData) => void;
}

// Styled Components
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-xl p-6 ${className}`}>
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => (
  <button
    {...props}
    className="flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {icon}
    {children}
  </button>
);

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({ icon, ...props }, ref) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
      {icon}
    </div>
    <input
      ref={ref}
      {...props}
      className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-12 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
    />
  </div>
));

// Main Component
export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate(); // ✅ ADD THIS
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL || "/api";


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        setIsLoading(false);
        return;
      }

      onLoginSuccess({
        id: data.admin.id,
        name: data.admin.name,
        email: data.admin.email,
        type: 'admin',
      });

    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-4 text-slate-400 hover:text-slate-300 transition-colors"
      tabIndex={-1}
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  );

  return (
    <div className="w-full max-w-md my-8">
      <Card>
        {/* Back Button */}
        <button
          onClick={() => navigate('/login')} // ✅ FIXED
          className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to User Login</span>
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex w-16 h-16 items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-slate-400 text-sm mt-2">
            Access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            icon={<Mail className="w-5 h-5" />}
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <div className="relative">
            <InputField
              icon={<KeyRound className="w-5 h-5" />}
              type={showPassword ? "text" : "password"}
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="current-password"
            />
            <PasswordToggle />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            icon={<LogIn className="w-5 h-5" />}
          >
            {isLoading ? "Logging in..." : "Sign In as Admin"}
          </Button>
        </form>

        <div className="mt-6 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
          <p className="text-xs text-slate-400 text-center">
            Admin access only. Unauthorized access is prohibited.
          </p>
        </div>
      </Card>
    </div>
  );
};