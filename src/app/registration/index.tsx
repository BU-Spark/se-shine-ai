import React, { useState } from 'react';
import Header from './Header';
import Question from './Question';
import Options from './Options';
import ProgressBar from './ProgressBar';
import SubmitButton from './SubmitButton';
import styles from './index.module.css';

const Home: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  const handleBackClick = () => {
    setCurrentStep(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleSubmitClick = () => {
    setCurrentStep(prev => prev < 5 ? prev + 1 : 5); // Increment the current step to a max of 5
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
