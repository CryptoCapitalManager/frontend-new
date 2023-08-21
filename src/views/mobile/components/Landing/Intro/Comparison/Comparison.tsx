import "./Comparison.scss";

import checked from "../../../../../../res/svg/checked-fact.svg";

const Comparison = () => {
    return (
        <div className="comparison-mobile">
            <p id="header-mobile">Comparison</p>
            <p id="title-mobile">
                Traditiona asset
                <br />
                management vs
                <br />
                Investiva
            </p>
            <p id="description-mobile">
                Traditional approaches suffer from a lack
                <br />
                of regulation and transparency, leaving
                <br />
                clients vulnerable to various risks.
                <br />
                Investiva aimes to revolutionize asset
                <br />
                management through smart contract
                <br />
                technology and blockchain transparency.
                <br />
                It creates an investment ecosystem in the
                <br />
                crypto world that is more secure and
                <br />
                trustworthy.
            </p>
            <div className="comparison-table-shadow">
                <div className="comparison-table">
                    <div className="traditional">
                        <div className="main">
                            <p id="first">Traditional</p>
                            <p id="second">Asset management</p>
                        </div>
                        <div className="fact">
                            <p>
                                No hedge funds &<br />
                                no regulation
                            </p>
                        </div>
                        <div className="fact">
                            <p>
                                Asset manager
                                <br />
                                can lie about
                                <br />
                                performance
                            </p>
                        </div>
                        <div className="fact">
                            <p>
                                Your crypto is in
                                <br />
                                the hands of your
                                <br />
                                asset manager
                            </p>
                        </div>
                        <div className="question">
                            <p id="question">What can go wrong?</p>
                            <ul>
                                <li>Theft of deposits</li>
                                <li>
                                    CEX declaring
                                    <br />
                                    bankruptcy
                                </li>
                                <li>
                                    Losing access to
                                    <br />
                                    your cryprto
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="investiva">
                        <div className="main">
                            <p id="first">Investiva</p>
                            <p id="second">Asset management</p>
                        </div>
                        <div className="fact">
                            <img src={checked} alt="Investiva fact" id="mark" />
                            <p>
                                Smart contract
                                <br />
                                regulated
                            </p>
                        </div>
                        <div className="fact">
                            <img src={checked} alt="Investiva fact" id="mark" />
                            <p>
                                Asset manager
                                <br />
                                can’t fake their
                                <br />
                                performance
                            </p>
                        </div>
                        <div className="fact">
                            <img src={checked} alt="Investiva fact" id="mark" />
                            <p>
                                Your crypto is
                                <br />
                                in your hands
                            </p>
                        </div>
                        <div className="question">
                            <p id="question">What can go wrong?</p>
                            <ul>
                                <li>
                                    Loss of a couple
                                    <br />
                                    of % of your
                                    <br />
                                    crypto
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comparison;
