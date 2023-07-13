import { Link } from 'react-router-dom';

import './Footer.scss';

import investiva from '../../../res/svg/investiva-logo.svg';
import attic42 from '../../../res/svg/attic42-logo.svg';
import email from '../../../res/svg/email.svg';
import linkedin from '../../../res/svg/linkedin.svg';
import twitter from '../../../res/svg/twitter.svg';
import facebook from '../../../res/svg/facebook.svg';
import instagram from '../../../res/svg/instagram.svg';

const Footer = () => {
  return(
    <div className="Footer">
      <div className="container">
        <div className="logo-container">
          <img src={investiva} alt="Investiva logo" />
          <p>Backed by <Link to="https://attic42.com" target="_blank"><img src={attic42} alt="Attic42 logo" /></Link></p>
        </div>
        <div className="media-container">
          <Link to="https://mail.google.com/mail" target="_blank" id="media-btn"><img src={email} alt="Contact by email" /></Link>
          <Link to="https://www.linkedin.com" target="_blank" id="media-btn"><img src={linkedin} alt="Connect via LinkedIn" /></Link>
          <Link to="https://twitter.com" target="_blank" id="media-btn"><img src={twitter} alt="Follow on Twitter" /></Link>
          <Link to="https://facebook.com" target="_blank" id="media-btn"><img src={facebook} alt="Connect on Facebook" /></Link>
          <Link to="https://instagram.com" target="_blank" id="media-btn"><img src={instagram} alt="Follow on Instagram" /></Link>
        </div>
      </div>
    </div>
  )
}

export default Footer;