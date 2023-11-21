import React from 'react';
import styles from './Header.module.css';
import logo from './shinelogo.png';
import backArrow from './backArrow.png'; 
import Image from 'next/image';
import ProgressBar from './ProgressBar';

interface HeaderProps {
  onBackClick: () => void; // Handler for back click
  step: number; // Current step for the progress bar
}

const Header: React.FC<HeaderProps> = ({ onBackClick, step}) => {


  return (
    <div className={styles.header}>
      <div className={styles.topRow}>
        <Image src="/shinelogo.jpg" alt="Shine Logo" width="100" height="60" />
        <div style={{ width: '50px' }}> {/* Placeholder for spacing; adjust as needed */}</div>
      </div>
      <button onClick={onBackClick} className={styles.backButton}>
        ←
      </button>
      <ProgressBar step={step} />
    </div> 
  );
};

export default Header;
