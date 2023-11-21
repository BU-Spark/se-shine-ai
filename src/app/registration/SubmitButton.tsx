import styles from './SubmitButton.module.css';
import React from 'react';

interface SubmitButtonProps {
  onClick: () => void; // Prop to handle click event
}


const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <button className={styles.submit}>Submit</button>
    </div>
  );
}

export default SubmitButton;
