import { FC } from "react";
import { Link } from "react-router-dom";

import "./Welcome.scss";

import { connectToWallet } from "../../../../../utils/utils";
import { welcomeProps } from "../../../../../utils/props";

const Welcome: FC<welcomeProps> = ({ setToCalc }) => {
    return (
        <div className="welcome-web">
            <div className="heading-text">
                <p id="normal">Start your</p>
                <p id="highlighted">investment journey</p>
            </div>
            <div
                className="btn"
                onClick={() => {
                    connectToWallet();
                }}
            >
                Connect Metamask
            </div>
            <div className="suggestion">
                <p id="question">
                    Not sure yet? Preview your Dashboard as if you invested a
                    year ago
                </p>
                <Link
                    id="link"
                    to="/"
                    onClick={() => {
                        setToCalc(true);
                    }}
                >
                    Launch Demo
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
