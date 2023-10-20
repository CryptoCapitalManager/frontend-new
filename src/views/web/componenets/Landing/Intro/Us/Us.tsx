import { useState } from "react";
import { Link } from "react-router-dom";

import "./Us.scss";

import expertise from "../../../../../../res/svg/our-experience.svg";
import protocol from "../../../../../../res/svg/our-protocol.svg";

const Us = () => {
    const [showExpertise, setShowExpertise] = useState<boolean>(true);
    const [expertiseTab, SetExpertiseTab] = useState<string>("selected");
    const [protocolTab, SetProtocolTab] = useState<string>("unselected");

    return (
        <div className="us-web">
            <div className="container-web">
                <div className="tabs-web">
                    <div
                        className="tab-web"
                        id={expertiseTab}
                        onClick={() => {
                            setShowExpertise(true);
                            SetExpertiseTab("selected");
                            SetProtocolTab("unselected");
                        }}
                    >
                        <p id="tab-text-web">Our expertise</p>
                        <div className="underline-web" />
                    </div>
                    <div
                        className="tab-web"
                        id={protocolTab}
                        onClick={() => {
                            setShowExpertise(false);
                            SetExpertiseTab("unselected");
                            SetProtocolTab("selected");
                        }}
                    >
                        <p id="tab-text-web">Our protocol</p>
                        <div className="underline-web" />
                    </div>
                </div>
                <div className="text-container-web">
                    <p id="heading-web">
                        Transparent
                        <br />
                        trading history
                    </p>
                    <p id="subtext-web">
                        Results of our traders are transparent
                        <br />
                        on the blockchain. You can see our
                        <br />
                        whole history of trading and you can be
                        <br />
                        100% sure that the data is real.
                    </p>
                </div>
                <div className="btn-container-web">
                    <Link className="btn-web" to={"/onboarding"}>
                        Get started
                    </Link>
                </div>
            </div>
            {showExpertise ? (
                <img
                    src={expertise}
                    alt="Our trading performance"
                    id="illustration-web"
                />
            ) : (
                <img
                    src={protocol}
                    alt="Our trading performance"
                    id="illustration-web"
                />
            )}
        </div>
    );
};

export default Us;
