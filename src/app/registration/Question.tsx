import React from 'react';
import styles from './Question.module.css';

interface QuestionProps {
  step: number;
  subtitle: string;
}

const Question: React.FC<QuestionProps> = ({ step,subtitle }) => {
  let questionText;
  switch (step) {
    case 1:
      questionText = 'How long are you living on this planet?';
      break;
    case 2:
      questionText = 'What\'s on your mind?';
      break;
    case 3:
      questionText = 'Your Interest Areas';
      break;
    case 4:
      questionText = 'Closest culture that resonates with you?';
      break;
    case 5:
      questionText = 'What\'s on your mind?';
      break;
    default:
      questionText = ''
  }
  
  return (
    <div>
      <h2 className={styles.question}>{questionText}</h2>
      <div className={styles.subtitle}>{subtitle}</div> 
    </div>
  );
}

export default Question;
