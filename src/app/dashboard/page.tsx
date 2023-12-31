'use client'

import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import { db } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';

// chart.js imports
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { PolarArea, Doughnut } from 'react-chartjs-2';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [mindScore, setMindScore] = useState(0);
  const [buttonLabel, setButtonLabel] = useState('Random Assessment');

  useEffect(() => {
    const fetchMindScore = async () => {
      const docRef = doc(db, 'user-data', user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMindScore(docSnap.data().mindScore);
      } else {
        console.log("no assessments taken");
      }
    };

    fetchMindScore();
  }, []);

  const polarData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
    datasets: [
      {
        data: [mindScore, 20, 32, 40, 24], // mindScore fetch from user-data
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
    datasets: [
      {
        data: [mindScore, 19, 3, 5, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleButtonClick = () => {
    if (buttonLabel === 'Random Assessment') {
      setButtonLabel("Let's Go!");
    } else if (buttonLabel === "Let's Go!") {
      router.push("/assessment");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.chartHeaders}>Shine-AI Assessments</h2>
      <button onClick={handleButtonClick} className={styles.buttonPushable} role="button">
        <span className={styles.buttonShadow}></span>
        <span className={styles.buttonEdge}></span>
        <span className={`${styles.buttonFront} ${styles.text}`}>
          {buttonLabel}
        </span>
      </button>
      <h2 className={styles.chartHeaders}>Overview</h2>
      <div className={styles.chartContainer}>
        <div className={styles.individualChart}>
          <div>
            <PolarArea data={polarData} />
          </div>
        </div>
        <div className={styles.individualChart}>
          <div>
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  )
}
