import Header from './Header';
import Question from './Question';
import Options from './Options';
import SubmitButton from './SubmitButton';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Question />
      <Options />
      <SubmitButton />
    </div>
  );
}

export default Home;
