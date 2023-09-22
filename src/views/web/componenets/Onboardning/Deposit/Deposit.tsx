import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

import "./Deposit.scss";

import trading_abi from "../../../../../abi/trading.json";
import usdc_abi from "../../../../../abi/usdc_goerli.json";

import usdc from "../../../../../res/svg/usdc-balance.svg";

import { depositProps } from "../../../../../utils/props";
import {
    REJECTED_TRANSACTION,
    USDC_APPROVAL_NEEDED,
} from "../../../../../utils/const";
import { error, notify } from "../../../../../utils/toasts";
import { parseUSDCBalance } from "../../../../../utils/utils";

const Deposit: FC<depositProps> = ({ signer, balanceUSDC }) => {
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [goToApproval, setGoToApproval] = useState<boolean>(false);

    const deposit = async () => {
        const parsedAmount = depositAmount * Math.pow(10, 6);

        const trading = new ethers.Contract(
            process.env.REACT_APP_TRADING_ADDRESS!,
            trading_abi.abi,
            signer
        );

        try {
            await trading.deposit(parsedAmount);

            window.location.reload();
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
                depositAmount * Math.pow(10, 6)
            );
        } catch (e: any) {
            if (e.reason === REJECTED_TRANSACTION) {
                error("The transaction has been rejected");
                return;
            } else {
                error("An error occured while processing the transaction");
                return;
            }
        }

        deposit();
    };

    return goToApproval ? (
        <div className="approval-panel">
            <div className="tab-header">
                <div
                    className="btn"
                    onClick={() => {
                        setGoToApproval(false);
                        notify("Transaction has been aborted");
                    }}
                >
                    X
                </div>
            </div>
            <div className="notification-field">
                <p>
                    To enable the deposit in our smart contract, you need to
                    approve the spending of USDC.
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
    ) : (
        <div className="deposit-web">
            <p id="header">Deposit</p>
            <div
                className="input"
                style={{
                    border:
                        ethers.getBigInt(balanceUSDC) >= ethers.getBigInt(100)
                            ? "1px solid #F1F2F7"
                            : "1px solid #CF202F",
                }}
            >
                <div className="left">
                    <input
                        type="text"
                        value={depositAmount}
                        onChange={(e) => {
                            const result = Number(e.target.value);

                            if (
                                !isNaN(result) &&
                                result >= 0 &&
                                result < Number.MAX_SAFE_INTEGER
                            ) {
                                setDepositAmount(Number(e.target.value));
                            }
                        }}
                        disabled={
                            ethers.getBigInt(balanceUSDC) <
                            ethers.getBigInt(100)
                        }
                    />
                    <p id="hint">Mininum: 100</p>
                </div>
                <div className="right">
                    <img src={usdc} alt="USDC banner" />
                    {ethers.getBigInt(balanceUSDC) >= ethers.getBigInt(100) ? (
                        <div className="good-balance-text">
                            <p id="balance">
                                Balance: {parseUSDCBalance(balanceUSDC)}
                            </p>
                            <p id="max">Max</p>
                        </div>
                    ) : (
                        <p className="bad-balance-text">
                            Balance: {parseUSDCBalance(balanceUSDC)}
                        </p>
                    )}
                </div>
            </div>
            {ethers.getBigInt(balanceUSDC) >= ethers.getBigInt(100) ? (
                depositAmount === 0 ? (
                    <div className="empty-amount">Enter an amount</div>
                ) : depositAmount >= 100 ? (
                    <div
                        className="good-amount"
                        onClick={() => {
                            deposit();
                        }}
                    >
                        Deposit to account
                    </div>
                ) : (
                    <div className="bad-amount">
                        Minimum deposit is 100 USDC
                    </div>
                )
            ) : (
                <div className="bad-balance">
                    <p id="subtext">
                        USDC is our preferred cryptocurrency for trading due to
                        its stability and reliable peg to the US dollar,
                        ensuring the preservation of its value.
                    </p>
                    <Link
                        to={"https://app.uniswap.org/"}
                        id="uniswap"
                        target="_blank"
                    >
                        Swap or buy USDC on Uniswap
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Deposit;
