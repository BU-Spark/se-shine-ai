import styles from './SubmitButton.module.css';

function SubmitButton() {
  return (
    <div className={styles.container}>
      <button className={styles.submit}>Submit</button>
    </div>
  );
}

export default SubmitButton;
