import { FC } from "react";

import "./Navbar.scss";

import logo from "../../../../../res/svg/investiva-logo-black.svg";

import { connectToWallet } from "../../../../../utils/utils";
import { onboardingNavbarProps } from "../../../../../utils/props";
import { Link } from "react-router-dom";

const Navbar: FC<onboardingNavbarProps> = ({ address }) => {
    return (
        <div className="navbar-onboarding-web">
            <div className="container">
                <Link to="/" id="back-link">
                    <img src={logo} alt="Investiva logo" id="logo" />
                </Link>
                {address === "Connect" ? (
                    <div
                        className="btn-clickable"
                        onClick={() => {
                            connectToWallet();
                        }}
                    >
                        {address}
                    </div>
                ) : (
                    <div className="btn-nonclickable">{address}</div>
                )}
            </div>
            <div className="top-shadow"></div>
        </div>
    );
};

export default Navbar;
