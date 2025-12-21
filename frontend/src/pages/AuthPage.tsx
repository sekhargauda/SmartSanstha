// frontend/src/pages/AuthPage.tsx
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "../firebase";

import { User, Mail, KeyRound, Calendar, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  category: string;
}

interface AuthPageProps {
  onLoginSuccess: (userData: UserData) => void;
}

// --- Styled Components ---

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
    className="flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50"
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
      className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-12 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>
));

// --- Main Component ---

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0];

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(null);
    setSuccess(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setDob('');
  };

  // ---------------- REGISTER ----------------
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 12) {
      setError("You must be at least 12 years old.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await sendEmailVerification(userCredential.user);

      setSuccess("Verification email sent! Please verify your email before signing in.");
      setIsLoginView(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        await auth.signOut();
        return;
      }


      // 🔥 NEW: Sync with backend
      const token = await user.getIdToken();
      await fetch("http://localhost:5001/api/auth/firebase", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      onLoginSuccess({
        id: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        category: "user",
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-4 text-slate-400"
    >
      {showPassword ? <EyeOff /> : <Eye />}
    </button>
  );

  return (
    <div className="w-full max-w-md my-8">
      <Card>
        <div className="text-center mb-6">
          <div className="inline-flex w-16 h-16 items-center justify-center bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-4">
            {isLoginView ? <LogIn /> : <UserPlus />}
          </div>
          <h1 className="text-2xl font-bold text-white">
            {isLoginView ? "Welcome Back!" : "Create Account"}
          </h1>
        </div>

        <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-4">
          {!isLoginView && (
            <>
              <InputField
                icon={<User />}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <InputField
                icon={<Calendar />}
                type="date"
                max={maxDate}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </>
          )}

          <InputField
            icon={<Mail />}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <InputField
              icon={<KeyRound />}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggle />
          </div>

          {!isLoginView && (
            <InputField
              icon={<KeyRound />}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          {success && <p className="text-green-400 text-xs text-center">{success}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : isLoginView ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <button onClick={toggleView} className="text-sm text-slate-400">
            {isLoginView ? "No account? Sign Up" : "Have an account? Sign In"}
          </button>
        </div>
      </Card>
    </div>
  );
};
