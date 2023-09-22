import { FC, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";

import "./Invest.scss";

import trading_abi from "../../../../../abi/trading.json";
import usdc_abi from "../../../../../abi/usdc_goerli.json";

import usdc from "../../../../../res/svg/usdc-balance.svg";

import { investProps } from "../../../../../utils/props";
import {
    REJECTED_TRANSACTION,
    USDC_APPROVAL_NEEDED,
} from "../../../../../utils/const";
import { error, notify } from "../../../../../utils/toasts";
import { parseUSDCBalance } from "../../../../../utils/utils";

const Invest: FC<investProps> = ({
    signer,
    dashboardHeight,
    balanceUSDC,
    setInvestVisible,
}) => {
    const [investAmount, setInvestAmount] = useState<number>(0);
    const [goToApproval, setGoToApproval] = useState<boolean>(false);

    const deposit = async () => {
        const parsedAmount = investAmount * Math.pow(10, 6);

        const trading = new ethers.Contract(
            process.env.REACT_APP_TRADING_ADDRESS!,
            trading_abi.abi,
            signer
        );

        try {
            await trading.deposit(parsedAmount);

            // TODO: Tell user transaction has been processed succesfully
            // TODO: Tell user that window will reload in 10 seconds after previous toast

            setTimeout(() => {
                // Your code to be executed after 10 seconds
                console.log("Timer done!");
            }, 10000);
        } catch (e: any) {
            if (e.reason === USDC_APPROVAL_NEEDED) {
                setGoToApproval(true);
                return;
            } else {
                if (e.reason === REJECTED_TRANSACTION) {
                    error("The transaction has been rejected");
                } else {
                    error("An error occured while processing the transaction");
                }
            }
        }

        setInvestVisible(false);
    };

    const approve = async () => {
        const usdc = new ethers.Contract(
            process.env.REACT_APP_USDC_ADDRESS!,
            usdc_abi.abi,
            signer
        );

        try {
            await usdc.approve(
                process.env.REACT_APP_TRADING_ADDRESS,
                investAmount * Math.pow(10, 6)
            );
        } catch (e: any) {
            if (e.reason === REJECTED_TRANSACTION) {
                error("The transaction has been rejected");
                setInvestVisible(false);
                return;
            } else {
                error("An error occured while processing the transaction");
                setInvestVisible(false);
                return;
            }
        }

        deposit();

        setInvestVisible(false);
    };

    return (
        <div className="invest-tab" style={{ height: `${dashboardHeight}px` }}>
            {!goToApproval ? (
                <div className="initial-panel">
                    <div className="tab-header">
                        <p id="header">Deposit</p>
                        <div
                            className="btn"
                            onClick={() => {
                                setInvestVisible(false);
                            }}
                        >
                            X
                        </div>
                    </div>
                    <div className="input">
                        <div className="left">
                            <input
                                type="text"
                                value={investAmount}
                                onChange={(e) => {
                                    const result = Number(e.target.value);

                                    if (
                                        !isNaN(result) &&
                                        result >= 0 &&
                                        result < Number.MAX_SAFE_INTEGER
                                    ) {
                                        setInvestAmount(Number(e.target.value));
                                    }
                                }}
                                disabled={
                                    ethers.getBigInt(balanceUSDC) ===
                                    ethers.getBigInt(0)
                                }
                                style={{
                                    color:
                                        +investAmount > 0
                                            ? "rgba(0, 0, 0, 1)"
                                            : "",
                                }}
                            />
                        </div>
                        <div className="right">
                            <img src={usdc} alt="USDC banner" />
                            <div className="good-balance-text">
                                <p id="balance">
                                    Balance: {parseUSDCBalance(balanceUSDC)}{" "}
                                </p>
                                <p id="max">Max</p>
                            </div>
                        </div>
                    </div>
                    {investAmount === 0 ? (
                        <div className="empty-balance">Enter an amount</div>
                    ) : investAmount < 100 ? (
                        <div className="empty-balance">
                            Minimum deposit is 100 USDC
                        </div>
                    ) : (
                        <div
                            className="good-balance"
                            onClick={() => {
                                deposit();
                            }}
                        >
                            Deposit to account
                        </div>
                    )}
                </div>
            ) : (
                <div className="approval-panel">
                    <div className="tab-header">
                        <div
                            className="btn"
                            onClick={() => {
                                setInvestVisible(false);
                                notify("Transaction has been aborted");
                            }}
                        >
                            X
                        </div>
                    </div>
                    <div className="notification-field">
                        <p>
                            To enable the deposit in our smart contract, you
                            need to approve the spending of USDC.
                        </p>
                    </div>
                    <div
                        className="approval-check"
                        onClick={() => {
                            approve();
                        }}
                    >
                        Approve spending
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invest;
