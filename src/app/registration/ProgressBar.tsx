import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar: React.FC<{ step: number, onBackClick: () => void }> = ({ step, onBackClick }) => {
  const fillerWidth = `${step * 20}%`;

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBarFiller}
        style={{ width: fillerWidth }}
      ></div>
    </div>
  );
};

export default ProgressBar;
