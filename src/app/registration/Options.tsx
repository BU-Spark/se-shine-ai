import styles from './Options.module.css';

function Options() {
  return (
    <div className={styles.container}>
      <button className={styles.option}>5-12 yrs</button>
      <button className={styles.option}>13-18 yrs</button>
      <button className={styles.option}>19-25 yrs</button>
      <button className={styles.option}>26-40 yrs</button>
      <button className={styles.option}>40-65 yrs</button>
      <button className={styles.option}>65+ yrs</button>
    </div>
  );
}

export default Options;
