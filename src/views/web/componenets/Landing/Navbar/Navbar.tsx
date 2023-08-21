import { FC } from "react";

import "./Navbar.scss";

import logo from "../../../../../res/svg/investiva-logo.svg";

import { navbarProps } from "../../../../../utils/props";

const Navbar: FC<navbarProps> = ({ scrollToSection, how, about }) => {
    return (
        <div className="navbar-web">
            <div className="container-web">
                <div className="top-shadow-web"></div>
                <div className="navbar-header-web">
                    <img id="logo-web" src={logo} alt="Investiva logo" />
                    <div className="btns-web">
                        <div
                            className="btn-web"
                            onClick={() => {
                                scrollToSection(how);
                            }}
                        >
                            How it works
                        </div>
                        <div
                            className="btn-web"
                            onClick={() => {
                                scrollToSection(about);
                            }}
                        >
                            About Us
                        </div>
                        <div className="btn-get-started-web">Get Started</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
