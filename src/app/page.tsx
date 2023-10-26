'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      router.push("/dashboard");
    }
  }, [authenticated]);

  const makeApiCall = async() => {
    try {
      const response = await fetch('/api/happy', {
        method: 'POST',
        body: JSON.stringify({hello: 'world'}),
      })

      if (!response.ok){
        throw new Error(response.statusText)
      }
      console.log("API TESTING!")
      const data = await response.json();

      console.log(data)
    } catch(error) {
      console.error(error)
    }

  }

  return (
    <div className={styles.mainContainer}>
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
        <button onClick={makeApiCall}>make api call</button>
      </div>
    </div>
  )
}
