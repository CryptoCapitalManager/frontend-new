import "./Comparison.scss";

import checked from "../../../../../../res/svg/checked.svg";

const Comparison = () => {
    return (
        <div className="comparison-web">
            <div className="text-container-web">
                <p id="title-web">Comparison</p>
                <p id="item-header-web">
                    Traditional asset
                    <br />
                    management vs <br />
                    Investiva
                </p>
                <p id="item-subtext-web">
                    Traditional approaches suffer from a lack of regulation and
                    transparency, leaving clients vulnerable to various risks.
                    Investiva aimes to revolutionize asset management through
                    smart contract technology and blockchain transparency. It
                    creates an investment ecosystem in the crypto world that is
                    more secure and trustworthy.
                </p>
            </div>
            <div className="comparison-container-web">
                <div className="traditional-web">
                    <div className="header-container-web">
                        <p id="item-header-web">Traditional</p>
                        <p id="item-subheader-web">Asset management</p>
                    </div>
                    <div className="options-web">
                        <p id="option-text-web">
                            No hedge funds & no
                            <br />
                            regulation
                        </p>
                        <p id="option-text-web">
                            Asset manager can lie
                            <br />
                            about performance
                        </p>
                        <p id="option-text-web">
                            Your crypto is in the hands
                            <br />
                            of your asset manager
                        </p>
                    </div>
                    <div className="wrong-container-web">
                        <p id="question-web">What can go wrong?</p>
                        <ul id="wrongs-web">
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
                <div className="investiva-web">
                    <div className="header-container-web">
                        <p id="item-header-web">Investiva</p>
                        <p id="item-subheader-web">Asset management</p>
                    </div>
                    <div className="options-web">
                        <div className="option-container-web">
                            <img src={checked} alt="Checked" />
                            <p id="option-text-web">
                                Smart contract
                                <br />
                                regulated
                            </p>
                        </div>
                        <div className="option-container-web">
                            <img src={checked} alt="Checked" />
                            <p id="option-text-web">
                                Asset manager can’t
                                <br />
                                fake their performance
                            </p>
                        </div>
                        <div className="option-container-web">
                            <img src={checked} alt="Checked" />
                            <p id="option-text-web">
                                Your crypto is in
                                <br />
                                your hands
                            </p>
                        </div>
                    </div>
                    <div className="wrong-container-web">
                        <p id="question-web">What can go wrong?</p>
                        <ul id="wrongs-web">
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
