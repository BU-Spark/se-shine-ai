'use client'

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

// success notification modals
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { emailPasswordLogin, googleLogin, authenticated } = useAuth();

  const handleEmailPasswordLogin = async() => {
    try {
      await emailPasswordLogin(email, password);
      // routing implemented over in AuthContext
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async() => {
    try {
      await googleLogin();
      // routing implemented over in AuthContext
    } catch (error) {
      console.error(error);
    }
  };

  // redirect to dashboard if already authenticated
  useEffect(() => {
    if (authenticated) {
      router.push("/dashboard");
    }
  }, [authenticated]);

  useEffect(() => {
    if (sessionStorage.getItem("accountCreated") === "true") {
      toast.success("Successfully Created Account!");
      sessionStorage.removeItem("accountCreated");
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={styles.secondContainer}>
        <Image 
          src="/main-logo-transparent.svg"
          alt="shine-ai"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className={styles.mainLogoTransparent}
        />
        <Image 
          src="/main-robot.svg"
          alt="shine-ai"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className={styles.mainRobot}
        />

        <div className={styles.inputGroup}>
          <div className={styles.label}>Email ID</div>
          <div className={styles.inputBox}>
            <input 
              type="email"
              className={styles.emailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div className={styles.inputGroup}>
          <div className={styles.label}>Password</div>
          <div className={styles.inputBox}>
            <input 
              type="password" 
              className={styles.passwordInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        
        <button
          className={styles.button}
          onClick={handleEmailPasswordLogin}
        >
          Login
        </button>
        <div className={styles.textContainer} onClick={handleGoogleLogin}>
          <Image 
            src="/google-plus.png"
            alt="google plus"
            width={0}
            height={0}
            sizes="100vw"
            priority
            className={styles.googleButton}
          />
          &nbsp;
          <span>
            Authenticate using Google
          </span>
        </div>
      </div>
    </div>
  )
}
