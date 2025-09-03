import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, registerUser, loginUser } from '../firebase';

// Interface simplificada sem Firestore
interface SimpleUserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  department: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: SimpleUserProfile | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<SimpleUserProfile>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<SimpleUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string) {
    const result = await registerUser(email, password);
    
    // Criar perfil básico do usuário (sem Firestore)
    const profile: SimpleUserProfile = {
      uid: result.uid,
      email: result.email || '',
      displayName: result.displayName || '',
      role: 'member',
      department: 'general',
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true
    };
    
    setUserProfile(profile);
    return result;
  }

  async function login(email: string, password: string) {
    const result = await loginUser(email, password);
    
    // Atualizar último login (sem Firestore)
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        lastLogin: new Date()
      });
    }
    
    return result;
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  async function updateProfile(updates: Partial<SimpleUserProfile>) {
    if (currentUser && userProfile) {
      const updatedProfile = { ...userProfile, ...updates };
      setUserProfile(updatedProfile);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Criar perfil básico do usuário (sem Firestore)
        const profile: SimpleUserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          role: 'member',
          department: 'general',
          createdAt: new Date(),
          lastLogin: new Date(),
          isActive: true
        };
        
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
