import './Header.scss';

import hidden from "../../../../res/png/hidden-logo.png";

const Header = () => {
  return(
    <div className="Header">
      <div className="txt-container">
        <p id="regular">Experience True</p>
        <p id="highlighted">Trustlessness</p>
        <p id="regular">in Crypro Trading</p>
        <p id="subtext">Enjoy peace of mind knowing that your<br />investments are safe and secure.</p>
      </div>
      <div className="btn">
        Get Started
      </div>
      <img src={hidden} alt="Hidden Investiva logo" id="hidden-logo" />
    </div>
  )
}

export default Header;
