'use client'

import { useEffect } from 'react';
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
    <div className={styles.mainContainer}>
      <h1 style={{fontSize: "20px"}}>Hi, {user?.displayName} !</h1>
      <h2 style={{fontSize: "20px", marginBottom: "20px"}}>You are loggin with {user?.email}</h2>
      <div style={{backgroundColor: "#121B31", color: "white", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", padding: "50px 40px"}}>
        <h3 style={{fontSize: "30px", marginBottom: "10px"}}>Dashboard In construction...</h3>
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
