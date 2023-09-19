import { FC, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Filler,
    LineOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "./Dashboard.scss";

import logo from "../../../../res/svg/investiva-logo-black.svg";
import usdc from "../../../../res/svg/usdc-icon.svg";
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
import {
    calculateROIEarnings,
    formatBalanceString,
    formatPercentage,
} from "../../../../utils/utils";

const Dashboard: FC<dashboardProps> = ({
    windowWidth,
    wallet,
    address,
    displayAddress,
    balanceUSDC,
    hasInvested,
}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    );

    const [investVisible, setInvestVisible] = useState<boolean>(false);
    const [withdrawVisible, setWithdrawVisible] = useState<boolean>(false);
    const [userData, setUserData] = useState<userDataDTO>();
    const [userTrades, setUserTrades] = useState<tradingPairDTO[]>([]);

    const dashboardRef = useRef<any>(null);
    const [dashboardDimensions, setDashboardDimensions] = useState({
        width: 0,
        height: 0,
    });

    const gradient = document.createElement("canvas").getContext("2d");
    const gradientFill = gradient?.createLinearGradient(0, 0, 0, 400);
    gradientFill!.addColorStop(0, "rgba(0, 82, 255, 0.5)");
    gradientFill!.addColorStop(1, "rgba(0, 82, 255, 0)");

    const options = {
        plugins: {
            filler: {
                propagate: false,
            },
            title: {
                display: false,
            },
            legend: {
                display: false,
            },
            tooltip: {
                labelColor: "rgba(0, 0, 0, 1)",
                callbacks: {
                    label: (context: any) => {
                        const amount = context.parsed.y;

                        return `${amount} USDC`;
                    },
                    title: (context: any) => {
                        return "";
                    },
                },
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            y: {
                ticks: {
                    display: false,
                },
                grid: {
                    drawBorder: false,
                    display: false,
                },
                border: { display: false },
            },
            x: {
                ticks: {
                    display: false,
                },
                grid: {
                    drawBorder: false,
                    display: false,
                },
                border: { display: false },
            },
        },
    };

    const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ];

    const data = {
        labels,
        datasets: [
            {
                fill: "start",
                label: "Deposit",
                data: [200, 600, 1000, 120, 200, 300, 300],
                borderColor: "rgba(0, 82, 255, 1)",
                borderWidth: 1,
                backgroundColor: gradientFill,
                lineTension: 0,
                pointRadius: 0,
            },
        ],
    };

    useEffect(() => {
        const fetchData = async () => {
            if (address.length !== 0) {
                let result = await fetch(
                    `https://investiva-test-api.onrender.com/data/user-account/${address}`
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
                height: dashboardRef.current.offsetHeight + 51,
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
                        <div className="balance-info">
                            <p id="balance-info-text">
                                {`Total deposited amount: ${formatBalanceString(
                                    userData
                                        ? userData.totalDeposited.toString()
                                        : "0"
                                )} USDC`}
                            </p>
                            <p id="balance-info-text">{`Total withdrawn amount: ${formatBalanceString(
                                userData
                                    ? userData.totalWithdrawn.toString()
                                    : "0"
                            )} USDC`}</p>
                        </div>

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
                        <div className="top">
                            <p>Overview</p>
                            <select id="interval">
                                <option value="1">Last 30 days</option>
                                <option value="3">Last 3 months</option>
                                <option value="6">Last 6 months</option>
                                <option value="9">Last 9 months</option>
                                <option value="12">Last year</option>
                            </select>
                        </div>
                        <Line options={options} data={data} />
                    </div>
                    <div className="roi-window">
                        <div className="top-part">
                            <p>Insight</p>
                        </div>
                        <div className="indicators">
                            <div className="roi-indicator">
                                <div className="left">
                                    <p>ROI</p>
                                    <img src={roi} alt="ROI indicator" />
                                </div>
                                <p>
                                    {`${formatPercentage(
                                        userData ? userData.ROI : 0
                                    )}%`}
                                </p>
                            </div>
                            <p id="amount">
                                {`That's ${
                                    userData
                                        ? calculateROIEarnings(
                                              userData.ROI,
                                              userData.totalDeposited
                                          )
                                        : "0"
                                } USDC`}
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
