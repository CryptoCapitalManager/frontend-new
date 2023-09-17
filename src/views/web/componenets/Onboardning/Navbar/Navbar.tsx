import { FC } from "react";

import "./Navbar.scss";

import logo from "../../../../../res/svg/investiva-logo-black.svg";

import { connectToWallet } from "../../../../../utils/utils";
import { onboardingNavbarProps } from "../../../../../utils/props";
import { Link } from "react-router-dom";

const Navbar: FC<onboardingNavbarProps> = ({ displayAddress }) => {
    return (
        <div className="navbar-onboarding-web">
            <div className="container">
                <Link to="/" id="back-link">
                    <img src={logo} alt="Investiva logo" id="logo" />
                </Link>
                {displayAddress === "Connect" ? (
                    <div
                        className="btn-clickable"
                        onClick={() => {
                            connectToWallet();
                        }}
                    >
                        {displayAddress}
                    </div>
                ) : (
                    <div className="btn-nonclickable">{displayAddress}</div>
                )}
            </div>
            <div className="top-shadow"></div>
        </div>
    );
};

export default Navbar;
