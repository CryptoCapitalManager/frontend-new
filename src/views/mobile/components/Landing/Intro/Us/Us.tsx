import "./Us.scss";

import expertise from "../../../../../../res/svg/our-experience.svg";
import protocol from "../../../../../../res/svg/our-protocol.svg";

const Us = () => {
    return (
        <div className="us-mobile">
            <div className="container-mobile">
                <div className="text-mobile">
                    <p id="title-mobile">Our expertise</p>
                    <p id="header-mobile">
                        Transparent <br />
                        trading history
                    </p>
                    <p id="subtext-mobile">
                        Results of our traders are
                        <br />
                        transparent on the blockchain.
                        <br />
                        You can see our whole history of
                        <br />
                        trading and you can be 100%
                        <br />
                        sure that the data is real.
                    </p>
                </div>
                <img src={expertise} alt="Trades history" />
            </div>
            <div className="container-mobile">
                <div className="text-mobile">
                    <p id="title-mobile">Our protocol</p>
                    <p id="header-mobile">
                        Trusted & reliable
                        <br />
                        DeFi protocol
                    </p>
                    <p id="subtext-mobile">
                        Your crypto is always your crypto
                        <br />
                        and you can withdraw it at any
                        <br />
                        moment.
                    </p>
                </div>
                <img src={protocol} alt="Trades history" />
            </div>
        </div>
    );
};

export default Us;
