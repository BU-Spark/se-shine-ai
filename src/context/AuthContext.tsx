'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { usePathname, useRouter } from 'next/navigation';
import { CirclesWithBar } from 'react-loader-spinner';

import {app} from '../firebase/firebaseConfig'

interface AuthContextProps {
  authenticated: boolean;
  user: any;
  emailPasswordLogin: (email: string, password: string) => void;
  googleLogin: () => void;
  logout: () => void;
  emailPasswordSignUp: (email: string, password: string, firstName: string, lastName: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = ['/login', '/signup', '/', '/assessment']; // specify public routes allowed without authentication
  const [user, setUser] = useState<User | null>(null); // contains firebase user or null
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // loading screen state
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();

  // user sign up using email and password
  const emailPasswordSignUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Setting document in the user-data collection
      await setDoc(doc(db, 'user-data', email), {
        firstName: firstName,
        lastName: lastName
      });

      // delete the user auth
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  // user login with email and password
  const emailPasswordLogin = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      if (user.email) {
        const emailExist = await getDoc(doc(db, 'user-data', user.email));

        if (emailExist.exists()) {
          const userData = emailExist.data();
          const displayName = `${userData.firstName} ${userData.lastName}`;

          // update displayName of Firebase user
          const customUser = {
            ...user,
            displayName: displayName
          };

          setUser(customUser);
          setAuthenticated(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // pop-up login for google
  const googleLogin = async() => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      setAuthenticated(true);

      if (user.email) {
        const emailExist = await getDoc(doc(db, 'user-data', user.email));

        // only saves if email does not exist
        if (!emailExist.exists()) {
          await setDoc(doc(db, 'user-data', user.email),{
            // not saving anything for now
          });
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  // logout reset delete firebase User
  const logout = () => {
    signOut(auth)
    .then(() => {
        router.push("/")
        setUser(null);
        setAuthenticated(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // this allows only public routes to be accessed
  // if they don't have User then they get redirected to /
  useEffect(() => {
    if (!loading && !authenticated && !publicRoutes.includes(pathname)) {
      router.push('/');
    }
  }, [authenticated, pathname, loading]);

  // checks firebase user state
  // this useEffect sets a timer so that user will be removed if idle
  // the timer will reset if user interacts with the website
  useEffect(() => {
    let logoutTimer: NodeJS.Timeout;

    const setLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => logout(), 600000); // 10 minutes idle
    };

    // events that will extend the timer
    const events: string[] = ['mousemove', 'mousedown', 'keydown', 'scroll'];

    const handleUserActivity = () => setLogoutTimer();
    events.forEach(event => window.addEventListener(event, handleUserActivity)); // reset timer when event occurs

    // sets user | redirect them if token expires
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAuthenticated(true);
      } else {
        setUser(null);
        setAuthenticated(false);
      }
      setLoading(false);
    });

    return () => {
      // clean-up process
      unsubscribe();
      clearTimeout(logoutTimer);
      events.forEach(event => window.removeEventListener(event, handleUserActivity));
    };
  }, [auth]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#121B31'
      }}>
        <CirclesWithBar
          height="100"
          width="100"
          color="#3AEDB1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel='circles-with-bar-loading'
        />
      </div>
    ); 
  }

  return (
    <AuthContext.Provider value={{ authenticated, user, emailPasswordLogin, googleLogin, logout, emailPasswordSignUp }}>
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
