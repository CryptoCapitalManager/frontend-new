import "./Header.scss";

import hidden from "../../../../../../res/png/hidden-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header-main-mobile">
            <div className="txt-container-mobile">
                <p id="regular-mobile">Experience True</p>
                <p id="highlighted-mobile">Trustlessness</p>
                <p id="regular-mobile">in Crypro Trading</p>
                <p id="subtext-mobile">
                    Enjoy peace of mind knowing
                    <br />
                    that your investments are safe
                    <br />
                    and secure.
                </p>
            </div>
            <Link to={"/dashboard"} className="btn-mobile">
                Get Started
            </Link>

            <img
                src={hidden}
                alt="Hidden Investiva logo"
                id="hidden-logo-mobile"
            />
        </div>
    );
};

export default Header;
