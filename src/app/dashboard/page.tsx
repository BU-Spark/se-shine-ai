'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CirclesWithBar } from 'react-loader-spinner';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase/firebaseConfig';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  // on load, check if user should do registration quesitons
  useEffect(() => {
    const checkRegistrationQuestion = async () => {
      if (user) {
        const userRef = doc(db, 'user-data', user.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists() && !docSnap.data()['registration-question']) {
          router.push("/registration")
        }
      }
    };
    checkRegistrationQuestion();
  }, []);

  return (
    <div className={styles.mainContainer} style={{height: "200px"}}>
      <h1>Hi, {user?.displayName} !</h1>
      <h2>You are loggin with {user?.email}</h2>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
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
      {/* {user && (
        <div style={{ whiteSpace: 'pre-wrap', marginTop: '20px', maxHeight: '1000px', overflowX: 'auto' }}>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )} */}
    </div>
  )
}
