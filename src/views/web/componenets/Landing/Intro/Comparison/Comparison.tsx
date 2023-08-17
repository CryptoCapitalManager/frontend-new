import "./Comparison.scss";

import checked from "../../../../../../res/svg/checked.svg";

const Comparison = () => {
    return (
        <div className="Comparison">
            <div className="text-container">
                <p id="title">Comparison</p>
                <p id="header">
                    Traditional asset
                    <br />
                    management vs <br />
                    Investiva
                </p>
                <p id="subtext">
                    Traditional approaches suffer from a lack
                    <br />
                    of regulation and transparency, leaving
                    <br />
                    clients vulnerable to various risks. Investiva
                    <br />
                    aimes to revolutionize asset management
                    <br />
                    through smart contract technology and
                    <br />
                    blockchain transparency. It creates an
                    <br />
                    investment ecosystem in the crypto world
                    <br />
                    that is more secure and trustworthy.
                </p>
            </div>
            <div className="comparison-container">
                <div className="traditional">
                    <div className="header-container">
                        <p id="header">Traditional</p>
                        <p id="subheader">Asset management</p>
                    </div>
                    <div className="options">
                        <p id="option-text">
                            No hedge funds & no
                            <br />
                            regulation
                        </p>
                        <p id="option-text">
                            Asset manager can lie
                            <br />
                            about performance
                        </p>
                        <p id="option-text">
                            Your crypto is in the hands
                            <br />
                            of your asset manager
                        </p>
                    </div>
                    <div className="wrong-container">
                        <p id="question">What can go wrong?</p>
                        <ul id="wrongs">
                            <li>Theft of deposits</li>
                            <li>CEX declaring bankruptcy</li>
                            <li>
                                Losing access to your
                                <br />
                                cryprto
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="investiva">
                    <div className="header-container">
                        <p id="header">Investiva</p>
                        <p id="subheader">Asset management</p>
                    </div>
                    <div className="options">
                        <div className="option-container">
                            <img src={checked} alt="Checked" />
                            <p id="option-text">
                                Smart contract
                                <br />
                                regulated
                            </p>
                        </div>
                        <div className="option-container">
                            <img src={checked} alt="Checked" />
                            <p id="option-text">
                                Asset manager can’t
                                <br />
                                fake their performance
                            </p>
                        </div>
                        <div className="option-container">
                            <img src={checked} alt="Checked" />
                            <p id="option-text">
                                Your crypto is in
                                <br />
                                your hands
                            </p>
                        </div>
                    </div>
                    <div className="wrong-container">
                        <p id="question">What can go wrong?</p>
                        <ul id="wrongs">
                            <li>
                                Loss of a couple of % of
                                <br />
                                your crypto
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comparison;
