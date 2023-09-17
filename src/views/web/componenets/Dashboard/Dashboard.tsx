import { FC, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import "./Dashboard.scss";

import logo from "../../../../res/svg/investiva-logo-black.svg";
import usdc from "../../../../res/svg/usdc-icon.svg";
import placeholder from "../../../../res/svg/graph-placeholder.svg";
import roi from "../../../../res/svg/roi-placeholder.svg";
import loading from "../../../../res/svg/loading-animation.svg";

import Invest from "./Invest/Invest";
import Withdraw from "./Withdraw/Withdraw";
import TransactionsTable from "./TransactionsTable/TransactionsTable";

import {
    tradingPairDTO,
    tradingPairDataDTO,
    userDataDTO,
} from "../../../../utils/dto";
import { dashboardProps } from "../../../../utils/props";
import { formatBalanceString } from "../../../../utils/utils";

const Dashboard: FC<dashboardProps> = ({
    windowWidth,
    wallet,
    address,
    displayAddress,
    balanceUSDC,
    hasInvested,
}) => {
    const [investVisible, setInvestVisible] = useState<boolean>(false);
    const [withdrawVisible, setWithdrawVisible] = useState<boolean>(false);
    const [userData, setUserData] = useState<userDataDTO>();
    const [userTrades, setUserTrades] = useState<tradingPairDTO[]>([]);

    const dashboardRef = useRef<any>(null);
    const [dashboardDimensions, setDashboardDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (address.length !== 0) {
                let result = await fetch(
                    "https://investiva-test-api.onrender.com/data/user-account/0x199bD1ce2a507975304Dea14bB2f06023292c188"
                    //`https://investiva-test-api.onrender.com/data/user-account/${address}`
                );

                const data = (await result.json()) as userDataDTO;

                setUserData(data);

                result = await fetch(
                    "https://investiva-test-api.onrender.com/data/trades"
                );
                const trades = ((await result.json()) as tradingPairDataDTO)
                    .messages;

                const earliestDate = new Date(data.balanceChanges[0].date);

                setUserTrades(
                    trades.filter(
                        (trade) => earliestDate <= new Date(trade.date)
                    )
                );
            }
        };

        fetchData().catch(() => {});
    }, []);

    useEffect(() => {
        if (dashboardRef.current) {
            setDashboardDimensions({
                width: dashboardRef.current.offsetWidth,
                height: dashboardRef.current.offsetHeight,
            });
        }
    }, [windowWidth]);

    return !wallet || !hasInvested ? (
        <Navigate to={"/onboarding"} />
    ) : (
        <div className="dashboard-web" ref={dashboardRef}>
            {(!userData || userTrades.length === 0) && (
                <div
                    className="loading-animation-container"
                    style={{
                        width: dashboardDimensions.width,
                        height: dashboardDimensions.height,
                    }}
                >
                    <img src={loading} id="loading-animation" />
                </div>
            )}
            {investVisible && (
                <Invest
                    dashboardHeight={dashboardDimensions.height}
                    balanceUSDC={balanceUSDC}
                    setInvestVisible={setInvestVisible}
                />
            )}
            {withdrawVisible && (
                <Withdraw
                    dashboardHeight={dashboardDimensions.height}
                    setWithdrawVisible={setWithdrawVisible}
                    investedAmount={
                        userData
                            ? formatBalanceString(
                                  userData.totalDeposited.toString()
                              )
                            : "0"
                    }
                />
            )}
            <div className="navbar">
                <Link to="/" id="back-link">
                    <img src={logo} alt="Investiva logo" id="logo" />
                </Link>
                <div className="btn-nonclickable">{displayAddress}</div>
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
                            <p id="amount">
                                {userData
                                    ? formatBalanceString(
                                          userData.balance.toString()
                                      )
                                    : "0"}
                            </p>
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
                <TransactionsTable
                    windowWidth={windowWidth}
                    userTrades={userTrades}
                />
            </div>
        </div>
    );
};

export default Dashboard;
