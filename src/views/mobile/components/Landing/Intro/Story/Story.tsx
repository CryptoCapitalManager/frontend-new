import { Link } from "react-router-dom";

import "./Story.scss";

import founder from "../../../../../../res/png/bojan-founder.png";
import email from "../../../../../../res/svg/email-circle.svg";
import twitter from "../../../../../../res/svg/twitter-circle.svg";
import linkedin from "../../../../../../res/svg/linkedin-circle.svg";

const Story = () => {
    return (
        <div className="story-mobile">
            <div className="container-mobile">
                <div className="text-mobile">
                    <p id="title-mobile">Our story</p>
                    <p id="header-mobile">
                        Harnessing the full
                        <br />
                        power of blockchain
                    </p>
                    <p id="description-mobile">
                        Investiva was founded by Bojan, a 22-year-old software
                        engineer with a passion for blockchain and
                        cryptocurrency. Bojan has entered the crypto industry in
                        2018 and has worked as a backend and smart contract
                        developer. With his understanding of the technology and
                        its potential, Bojan is committed to helping clients
                        harness the full power of blockchain for their needs.
                    </p>
                </div>
                <div className="creator-mobile">
                    <img
                        id="founder-mobile"
                        src={founder}
                        alt="Bojan Goretić"
                    />
                    <div className="links-mobile">
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
                    <div className="description-mobile">
                        <p id="name-mobile">Bojan Goretić</p>
                        <p id="title-mobile">Founder & CEO</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Story;
