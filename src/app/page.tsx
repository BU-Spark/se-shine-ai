'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// success notification modals
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter();

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
        <button
          className={styles.button}
          onClick={()=>{router.push("/login")}}
        >
          Already a Friend? Login
        </button>
        <div className={styles.textContainer}>
          <span>or&nbsp;</span>
          <span onClick={()=>{router.push("/signup")}}>
            Let’s Register our Friendship 
          </span>
        </div>
      </div>
    </div>
  )
}
