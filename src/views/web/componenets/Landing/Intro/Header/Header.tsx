import "./Header.scss";

import hidden from "../../../../../../res/png/hidden-logo.png";

const Header = () => {
    return (
        <div className="header-main-web">
            <div className="txt-container-web">
                <p id="regular-web">Experience True</p>
                <p id="highlighted-web">Trustlessness</p>
                <p id="regular-web">in Crypto Trading</p>
                <p id="subtext-web">
                    Enjoy peace of mind knowing that your
                    <br />
                    investments are safe and secure.
                </p>
            </div>
            <div className="btn-web">Get Started</div>
            <img
                src={hidden}
                alt="Hidden Investiva logo"
                id="hidden-logo-web"
            />
        </div>
    );
};

export default Header;
