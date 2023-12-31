import { FC, useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { AreaChart, Area, Tooltip, ResponsiveContainer, YAxis } from "recharts";

import "./Dashboard.scss";

import logo from "../../../../res/svg/investiva-logo-black.svg";
import usdc from "../../../../res/svg/usdc-icon.svg";
import roi from "../../../../res/svg/roi-placeholder.svg";
import loading from "../../../../res/svg/loading-animation.svg";

import Invest from "./Invest/Invest";
import Withdraw from "./Withdraw/Withdraw";
import TransactionsTable from "./TransactionsTable/TransactionsTable";

import {
    balanceChangeDTO,
    tradingPairDTO,
    tradingPairDataDTO,
    userDataDTO,
} from "../../../../utils/dto";
import { dashboardProps } from "../../../../utils/props";
import {
    calculateROIEarnings,
    capitalizeString,
    filterUserData,
    formatBalanceString,
    formatPercentage,
    maxYpoint,
} from "../../../../utils/utils";
import { error } from "../../../../utils/toasts";

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="container"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    background: "rgba(68, 68, 68, 1)",
                    padding: "7px 5px",
                    borderRadius: "5px",
                }}
            >
                <p
                    id="event"
                    style={{
                        color: "rgba(255, 255, 255, 1)",
                        fontFamily: "Roboto",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: "500",
                    }}
                >{`${capitalizeString(payload[0].payload.actionType)}`}</p>
                <div
                    className="amount-text"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "5px",
                    }}
                >
                    <p
                        id="amount"
                        style={{
                            color: "rgba(255, 255, 255, 1)",
                            fontFamily: "Roboto",
                            fontSize: "20px",
                            fontStyle: "normal",
                            fontWeight: "400",
                        }}
                    >{`${formatBalanceString(payload[0].value.toString())}`}</p>
                    <p
                        id="currency"
                        style={{
                            color: "rgba(255, 255, 255, 1)",
                            fontFamily: "Roboto",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: "400",
                            margin: "5.5px 0px 0px 5px",
                        }}
                    >
                        USDC
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const Dashboard: FC<dashboardProps> = ({
    windowDimensions,
    signer,
    address,
    displayAddress,
    balanceUSDC,
    hasInvested,
}) => {
    const [investVisible, setInvestVisible] = useState<boolean>(false);
    const [withdrawVisible, setWithdrawVisible] = useState<boolean>(false);
    const [userData, setUserData] = useState<userDataDTO>();
    const [userTrades, setUserTrades] = useState<tradingPairDTO[]>();

    const dashboardRef = useRef<any>(null);
    const [dashboardDimensions, setDashboardDimensions] = useState({
        width: 0,
        height: 0,
    });

    const graphRef = useRef<any>(null);
    const [graphDimensions, setGraphDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [filterPeriod, setFilterPeriod] = useState<number>(12);
    const [maxYPoint, setMaxYPoint] = useState<number>(0);
    const [graphData, setGraphData] = useState<balanceChangeDTO[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (address.length !== 0) {
                try {
                    let result = await fetch(
                        `https://investiva-test-api.onrender.com/data/user-account/${address}`
                    );

                    const data = (await result.json()) as userDataDTO;

                    setUserData(data);
                    setMaxYPoint(maxYpoint(data.balanceChanges));
                    setGraphData(filterUserData(data, filterPeriod));

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
                } catch (e) {
                    error(
                        "An error occured while retrieving data from the server"
                    );
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (dashboardRef.current) {
            setDashboardDimensions({
                width: dashboardRef.current.offsetWidth,
                height: dashboardRef.current.offsetHeight,
            });
        }
        if (graphRef.current) {
            setGraphDimensions({
                width: graphRef.current.offsetWidth - 48,
                height: graphRef.current.offsetHeight,
            });
        }
    }, [windowDimensions.width]);

    useEffect(() => {
        if (userData) {
            setGraphData(filterUserData(userData, filterPeriod));
        }
    }, [filterPeriod]);

    useEffect(() => {
        setMaxYPoint(maxYpoint(graphData));
    }, [graphData]);

    return !signer || !hasInvested ? (
        <Navigate to={"/onboarding"} />
    ) : (
        <div className="dashboard-web" ref={dashboardRef}>
            {(!userData || !userTrades) && (
                <div
                    className="loading-animation-container"
                    style={{
                        width: dashboardDimensions.width,
                        height:
                            windowDimensions.height >= 930
                                ? "100vh"
                                : dashboardDimensions.height,
                    }}
                >
                    <img src={loading} id="loading-animation" />
                </div>
            )}
            {investVisible && (
                <Invest
                    signer={signer}
                    dashboardHeight={dashboardDimensions.height}
                    balanceUSDC={balanceUSDC}
                    setInvestVisible={setInvestVisible}
                />
            )}
            {withdrawVisible && (
                <Withdraw
                    signer={signer}
                    address={address}
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
                    <div className="balance-graph-window" ref={graphRef}>
                        <div
                            className="top"
                            style={{ width: graphDimensions.width }}
                        >
                            <p>Overview</p>
                            <select
                                id="interval"
                                value={filterPeriod}
                                onChange={(e) => {
                                    setFilterPeriod(+e.target.value);
                                }}
                            >
                                <option value="1">Last 30 days</option>
                                <option value="3">Last 3 months</option>
                                <option value="6">Last 6 months</option>
                                <option value="9">Last 9 months</option>
                                <option value="12">Last year</option>
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={graphData}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: "transparent" }}
                                />
                                <defs>
                                    <linearGradient
                                        id="fillGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            stopColor="#0052FF"
                                            stopOpacity="0.88"
                                        />
                                        <stop
                                            offset="0.265625"
                                            stopColor="#0052FF"
                                            stopOpacity="0.6"
                                        />
                                        <stop
                                            offset="1"
                                            stopColor="#0052FF"
                                            stopOpacity="0"
                                        />
                                    </linearGradient>
                                </defs>
                                <YAxis domain={[0, maxYPoint]} hide={true} />
                                <Area
                                    type="linear"
                                    dataKey="amount"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="url(#fillGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
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
                    windowDimensions={windowDimensions}
                    userTrades={userTrades ? userTrades : []}
                />
            </div>
        </div>
    );
};

export default Dashboard;
