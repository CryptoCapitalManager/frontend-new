import { Link } from "react-router-dom";

import "./Footer.scss";

import investiva from "../../../../../res/svg/investiva-logo.svg";
import attic42 from "../../../../../res/svg/attic42-logo.svg";
import email from "../../../../../res/svg/email.svg";
import linkedin from "../../../../../res/svg/linkedin.svg";
import twitter from "../../../../../res/svg/twitter.svg";
import instagram from "../../../../../res/svg/instagram.svg";

const Footer = () => {
    return (
        <div className="footer-mobile">
            <div className="container-mobile">
                <div className="logo-container-mobile">
                    <img src={investiva} alt="Investiva logo" />
                    <p>
                        Backed by{" "}
                        <Link to="https://attic42.com" target="_blank">
                            <img src={attic42} alt="Attic42 logo" />
                        </Link>
                    </p>
                </div>
                <div className="media-container-mobile">
                    <Link
                        to="mailto:goretic.bojan@investiva.app"
                        id="media-btn-mobile"
                    >
                        <img src={email} alt="Contact by email" />
                    </Link>
                    <Link
                        to="https://www.linkedin.com/in/bojan-goretic-85781b232"
                        target="_blank"
                        id="media-btn-mobile"
                    >
                        <img src={linkedin} alt="Connect via LinkedIn" />
                    </Link>
                    <Link
                        to="https://twitter.com/kibo_01?t=_-Z6OwFlY3QLgjYAilRgaQ&s=09"
                        target="_blank"
                        id="media-btn-mobile"
                    >
                        <img src={twitter} alt="Follow on Twitter" />
                    </Link>
                    <Link
                        to="https://instagram.com/goreticb?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
                        target="_blank"
                        id="media-btn-mobile"
                    >
                        <img src={instagram} alt="Follow on Instagram" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
