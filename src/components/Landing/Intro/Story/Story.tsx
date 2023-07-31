import { FC } from "react";
import { Link } from "react-router-dom";

import "./Story.scss";

import photo from "../../../../res/svg/mock-photo.svg";
import email from "../../../../res/svg/email-circle.svg";
import twitter from "../../../../res/svg/twitter-circle.svg";
import linkedin from "../../../../res/svg/linkedin-circle.svg";

import { storyProps } from "../../../../utils/props";

const Story: FC<storyProps> = ({ about }) => {
    return (
        <div className="Story" ref={about}>
            <div className="container">
                <div className="text">
                    <p id="title">Our story</p>
                    <p id="header">
                        Harnessing the full
                        <br />
                        power of blockchain
                    </p>
                    <p id="description">
                        Investiva was founded by Bojan, a 22-year-old software
                        engineer with a passion for blockchain and
                        cryptocurrency. Bojan has entered the crypto industry in
                        2018 and has worked as a backend and smart contract
                        developer. With his understanding of the technology and
                        its potential, Bojan is committed to helping clients
                        harness the full power of blockchain for their needs.
                    </p>
                </div>
                <div className="creator">
                    <img src={photo} alt="Mock profile" />
                    <div className="links">
                        <Link to="mailto:goretic.bojan@investiva.app">
                            <img src={email} alt="send email" />
                        </Link>
                        <Link
                            to="https://www.linkedin.com/in/bojan-goretic-85781b232"
                            target="_blank"
                        >
                            <img src={linkedin} alt="connect on linkedin" />
                        </Link>
                        <Link
                            to="https://twitter.com/kibo_01?t=_-Z6OwFlY3QLgjYAilRgaQ&s=09"
                            target="_blank"
                        >
                            <img src={twitter} alt="connect on twitter" />
                        </Link>
                    </div>
                    <div className="description">
                        <p id="name">Bojan Goretić</p>
                        <p id="title">Founder & CEO</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Story;