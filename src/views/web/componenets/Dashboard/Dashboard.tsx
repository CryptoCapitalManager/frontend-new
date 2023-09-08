import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Dashboard.scss";

import logo from "../../../../res/svg/investiva-logo-black.svg";
import usdc from "../../../../res/svg/usdc-icon.svg";
import placeholder from "../../../../res/svg/graph-placeholder.svg";
import roi from "../../../../res/svg/roi-placeholder.svg";

import { dashboardProps } from "../../../../utils/props";

import Invest from "./Invest/Invest";
import Withdraw from "./Withdraw/Withdraw";
import TransactionsTable from "./TransactionsTable/TransactionsTable";

const Dashboard: FC<dashboardProps> = ({
    appHeight: height,
    windowWidth: width,
    wallet,
    address,
    balanceUSDC,
    investedAmount,
}) => {
    const [investVisible, setInvestVisible] = useState<boolean>(false);
    const [withdrawVisible, setWithdrawVisible] = useState<boolean>(false);

    return (
        <div className="dashboard-web">
            {investVisible && (
                <Invest
                    appHeight={height}
                    balanceUSDC={balanceUSDC}
                    setInvestVisible={setInvestVisible}
                />
            )}
            {withdrawVisible && (
                <Withdraw
                    appHeight={height}
                    setWithdrawVisible={setWithdrawVisible}
                    investedAmount={investedAmount}
                />
            )}
            <div className="navbar">
                <Link to="/" id="back-link">
                    <img src={logo} alt="Investiva logo" id="logo" />
                </Link>
                <div className="btn-nonclickable">{address}</div>
            </div>
            <div className="interface">
                <div className="windows">
                    <div className="balance-window">
                        <div className="title">
                            <p>Balance</p>
                            <img src={usdc} alt="USDC icon" />
                        </div>
                        <div className="balance-insight">
                            <p id="currency">USDC</p>
                            <p id="amount">3200</p>
                        </div>
                        <p id="initial-amount">1500 USDC Initial investment</p>
                        <div className="btns">
                            <div
                                className="invest"
                                onClick={() => {
                                    setInvestVisible(true);
                                }}
                            >
                                Invest more
                            </div>
                            <div
                                className="withdraw"
                                onClick={() => {
                                    setWithdrawVisible(true);
                                }}
                            >
                                Withdraw
                            </div>
                        </div>
                    </div>
                    <div className="balance-graph-window">
                        <img src={placeholder} alt="Balance graph" />
                    </div>
                    <div className="roi-window">
                        <div className="top-part">
                            <p>Insight</p>
                            <select id="time-interval">
                                <option>Last 30 days</option>
                                <option>Last 3 months</option>
                                <option>Last 6 months</option>
                                <option>Last 9 months</option>
                                <option>Last year</option>
                            </select>
                        </div>
                        <div className="indicators">
                            <div className="roi-indicator">
                                <div className="left">
                                    <p>ROI</p>
                                    <img src={roi} alt="ROI indicator" />
                                </div>
                                <p>32%</p>
                            </div>
                            <p id="amount">That’s 500 USDC</p>
                        </div>
                        <div className="bottom-part">
                            <p id="percentage">83%</p>
                            <p id="text">
                                Predicted ROI
                                <br />
                                by end of year
                            </p>
                        </div>
                    </div>
                </div>
                <TransactionsTable windowWidth={width} />
            </div>
        </div>
    );
};

export default Dashboard;
