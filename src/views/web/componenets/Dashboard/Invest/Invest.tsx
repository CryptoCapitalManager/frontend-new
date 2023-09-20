import { FC, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";

import "./Invest.scss";

import trading_abi from "../../../../../abi/trading.json";

import usdc from "../../../../../res/svg/usdc-balance.svg";

import { investProps } from "../../../../../utils/props";
import {
    TRADING_GOERLI_ADDRESS,
    USDC_APPROVAL_NEEDED,
} from "../../../../../utils/const";

const Invest: FC<investProps> = ({
    signer,
    dashboardHeight,
    balanceUSDC,
    setInvestVisible,
}) => {
    const [investAmount, setInvestAmount] = useState<number>(0);
    const [gotToApproval, setGoToApproval] = useState<boolean>(false);

    const deposit = async () => {
        const parsedAmount = ethers.parseEther(investAmount.toString());

        const trading = new ethers.Contract(
            TRADING_GOERLI_ADDRESS,
            trading_abi.abi,
            signer
        );

        try {
            await trading.deposit(parsedAmount);
        } catch (e: any) {
            if (e.reason === USDC_APPROVAL_NEEDED) {
                setGoToApproval(true);
                return;
                // GOTO: Approval and change screen
            }
        }

        setInvestVisible(false);
    };

    const approve = async () => {
        setInvestVisible(false);
    };

    return (
        <div className="invest-tab" style={{ height: `${dashboardHeight}px` }}>
            {!gotToApproval ? (
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
                                <p id="balance">Balance: {balanceUSDC} </p>
                                <p id="max">Max</p>
                            </div>
                        </div>
                    </div>
                    {investAmount === 0 ? (
                        <div className="empty-balance">Enter an amount</div>
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
