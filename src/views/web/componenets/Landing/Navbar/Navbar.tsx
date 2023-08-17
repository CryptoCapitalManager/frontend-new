import { FC } from "react";

import "./Navbar.scss";

import logo from "../../../../../res/svg/investiva-logo.svg";

import { navbarProps } from "../../../../../utils/props";

const Navbar: FC<navbarProps> = ({ scrollToSection, how, about }) => {
    return (
        <div className="Navbar">
            <div className="container">
                <div className="top-shadow"></div>
                <div className="header">
                    <img id="logo" src={logo} alt="Investiva logo" />
                    <div className="btns">
                        <div
                            className="btn"
                            onClick={() => {
                                scrollToSection(how);
                            }}
                        >
                            How it works
                        </div>
                        <div
                            className="btn"
                            onClick={() => {
                                scrollToSection(about);
                            }}
                        >
                            About Us
                        </div>
                        <div className="btn-get-started">Get Started</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
