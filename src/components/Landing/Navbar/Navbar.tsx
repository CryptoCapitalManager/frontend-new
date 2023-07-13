import './Navbar.scss';

import logo from '../../../res/svg/investiva-logo.svg';

const Navbar = () => {
  return(
    <div className="Navbar">
      <div className="container">
        <img id="logo" src={logo} alt="Investiva logo"/>
        <div className="btns">
          <div className="btn">
            How it works
          </div>
          <div className="btn">
            Traders
          </div>
          <div className="btn">
            About Us
          </div>
          <div className="btn-get-started">
            Get Started
          </div>
        </div>
      </div>
      <div className="top-shadow"></div>
    </div>
  )
}

export default Navbar;