'use client'

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

// error notification modals
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { emailPasswordSignUp, authenticated } = useAuth();

  const handleEmailPasswordSignUp = async() => {
    // receive response containing error codes as well
    // https://firebase.google.com/docs/auth/admin/errors
    // error code example: auth/email-already-in-use
    const authResponse: string|undefined = await emailPasswordSignUp(email, password, firstName, lastName);
    
    if (authResponse === undefined) {
      toast.error("An unexpected error occurred.");
    } else if (authResponse.includes("auth")) {
      let parseErrorCode = authResponse.replace("auth/", "").replaceAll("-", " ")
      toast.error(parseErrorCode);
    } else if (authResponse === "success") {
      sessionStorage.setItem("accountCreated", "true"); // save this to show toastify success in login
      router.push("/login");
    }
  }

  useEffect(() => {
    if (authenticated && !sessionStorage.getItem("accountCreated")) {
      router.push("/dashboard");
    }
  }, [authenticated]);

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
        <div style={{color: "#3AEDB1", padding: "5% 10% 10% 10%"}}>{"Let's get you in!"}</div>

        <div className={styles.inputGroup}>
          <div className={styles.label}>First Name</div>
          <div className={styles.inputBox}>
            <input 
              type="text"
              className={styles.firstNameInput}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.label}>Last Name</div>
          <div className={styles.inputBox}>
            <input 
              type="text"
              className={styles.lastNameInput}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

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
          onClick={handleEmailPasswordSignUp}
        >
          Go
        </button>
      </div>
    </div>
  )
}
