import Navbar from './Navbar/Navbar';
import Tag from './Tag/Tag';
import Intro from './Intro/Intro';
import Footer from './Footer/Footer';

import './Landing.scss';

const Landing = () => {
  return(
    <div className="Landing">
      <Navbar />
      <Tag />
      <Intro />
      <Footer />
    </div>
  )
}

export default Landing;