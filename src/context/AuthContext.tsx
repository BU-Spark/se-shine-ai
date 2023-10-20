'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User, signInWithEmailAndPassword } from "firebase/auth";
import { usePathname, useRouter } from 'next/navigation';

import app from '../firebase/firebaseConfig'

interface AuthContextProps {
  authenticated: boolean;
  user: any;
  emailPasswordLogin: (email: string, password: string) => void;
  googleLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ['/login', '/signup', '/']; // specify public routes allowed without authentication
  const [user, setUser] = useState<User | null>(null); // contains firebase user or null
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // loading screen state
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // user login with email and password
  const emailPasswordLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      setAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  // pop-up signup for google
  const googleLogin = async() => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // logout reset delete firebase User
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setAuthenticated(false);
        router.push("/")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // this allows only public routes to be accessed
  // if they don't have User then they get redirected to /
  useEffect(() => {
    if (!authenticated && !publicRoutes.includes(pathname)) {
      router.push('/');
    }
  }, [authenticated, pathname]);

  // checks firebase user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAuthenticated(true);
        setTimeout(() => {
          logout();
        }, 600000); // 10 minutes automatic logout
      } else {
        setUser(null);
        setAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'black'
      }}>
        {/* <IonSpinner style={{width: "10%", height: "10%"}}/> */}
      </div>
    ); 
  }

  return (
    <AuthContext.Provider value={{ authenticated, user, emailPasswordLogin, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('no user context!');
  }
  return context;
};
