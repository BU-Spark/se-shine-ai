import React from 'react';
import styles from './Options.module.css';

interface OptionsProps {
  step: number;
  selectedOptions: Set<string>;
  toggleOption: (option: string) => void;
}

const options = {
  1: ['5-12 yrs', '13-18 yrs', '19-25 yrs', '26-40 yrs', '40-65 yrs', '65+ yrs'],
  2: ['Know myself better', 'Look for nearby communities', 'Work on interpersonal skills', 'Get connected with peers', 'Get connected with professionals', 'Just here to explore'],
  3: ['Food', 'Sports', 'Travel', 'Arts', 'Adventure Activities', 'Clubbing', 'Books', 'Card Games', 'Spirituality', 'Tech', 'Startups', 'Finance', 'Music', 'Social Media'],
  4: ['Chinese', 'Indian', 'Canadian', 'Peruvian', 'American', 'Russian', 'African', 'Columbian', 'B', 'Sty', 'T', 'S', 'F', 'M', 'S'],
  5: ['Time Management', 'Goal Setting', 'Confidence Building', 'Positive Thinking Pattern', 'Grief and Loss Management', 'Emotional Intelligence'],
};

const Options: React.FC<OptionsProps> = ({ step, selectedOptions, toggleOption }) => {
  const isGrid = step === 3 || step === 4 ; 
  const containerStyle = isGrid ? styles.gridContainer : styles.container;
  return (
    <div className={containerStyle}>
      {options[step].map((option, index) => {
        const isSelected = selectedOptions.has(option);
        const buttonClasses = `${isSelected ? styles.selected : ''} ${isGrid ? styles.gridOption : styles.option}`;
          
        return (
          <button
            key={`${step}-${option}-${index}`}
            className={buttonClasses}
            onClick={() => toggleOption(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}


export default Options;
