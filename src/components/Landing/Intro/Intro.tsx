import Header from './Header/Header';
import Us from './Us/Us';
import How from './How/How';
import Comparison from './Comparison/Comparison';

import './Intro.scss';

const Intro = () => {
  return(
    <div className="Intro">
      <Header />
      <Us />
      <How />
      <Comparison />
      <div className="bottom-shadow"></div>
    </div>
  )
}

export default Intro;