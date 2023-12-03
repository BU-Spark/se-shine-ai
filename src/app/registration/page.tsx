'use client'

import React, { useState } from 'react';
import Header from './Header';
import Question from './Question';
import Options from './Options';
import ProgressBar from './ProgressBar';
import SubmitButton from './SubmitButton';
import styles from './page.module.css';
import {db} from '../../firebase/firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import { useAuth } from '@/context/AuthContext';

const Home: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const handleBackClick = () => {
    setCurrentStep(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleSubmitClick = async () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Convert Set to Array for Firebase
      const optionsArray = Array.from(selectedOptions);
  
      try {
        // Use the user's email to identify the correct document
        const userEmail = user.email; // Assuming `user.email` is available from your auth context
        
        // Save data to Firestore
        await setDoc(doc(collection(db, 'user-data'), userEmail), {
          selectedOptions: optionsArray
        });
  
        console.log('Data successfully saved!');
        // Handle additional logic after successful save, such as redirecting
      } catch (error) {
        console.error('Error saving data: ', error);
        // Handle errors, such as displaying a message to the user
      }
    }
  };
  const handleSkipClick = () => {
  setCurrentStep(prev => (prev < 5 ? prev + 1 : prev));
  };
  const toggleOption = (option: string) => {
    setSelectedOptions(prevSelectedOptions => {
      const newSelectedOptions = new Set(prevSelectedOptions);
      if (newSelectedOptions.has(option)) {
        newSelectedOptions.delete(option);
      } else {
        newSelectedOptions.add(option);
      }
      return newSelectedOptions;
    });
  };
  const subtitles = [
    "It’s been around...", 
    "I want to...", 
    "I am interested in...", 
    "I would say...",
    "I want to learn" 
  ];


  return (
    <div className={styles.container}>
      <Header step={currentStep} onBackClick={handleBackClick}/>
      <div className={styles.backAndProgressBar}>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBarFiller}
          />
        </div>
      </div>
      <Question step={currentStep} subtitle={subtitles[currentStep - 1]} />
      <Options 
        step={currentStep} 
        selectedOptions={selectedOptions} 
        toggleOption={toggleOption} 
      />
      <SubmitButton onClick={handleSubmitClick} />
      {currentStep === 4 && (
        <button className={styles.skipButton} onClick={handleSkipClick}>
          or skip this question...
        </button>
        )}
    </div>
  );
}

export default Home;
