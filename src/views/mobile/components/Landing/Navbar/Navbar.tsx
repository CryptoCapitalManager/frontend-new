import "./Navbar.scss";

import logo from "../../../../../res/svg/investiva-logo.svg";

const Navbar = () => {
    return (
        <div className="navbar-mobile">
            <img src={logo} alt="Investiva logo" id="logo" />
            <div className="top-shadow"></div>
        </div>
    );
};

export default Navbar;
