import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";

import "./Deposit.scss";

import usdc from "../../../../../res/svg/usdc-balance.svg";

import { depositProps } from "../../../../../utils/props";

const Deposit: FC<depositProps> = ({ balanceUSDC }) => {
    const [depositAmount, setDepositAmount] = useState<number>(0);

    return (
        <div className="deposit-web">
            <p id="header">Deposit</p>
            <div
                className="input"
                style={{
                    border:
                        ethers.getBigInt(balanceUSDC) >= ethers.getBigInt(100)
                            ? "border: 1px solid #F1F2F7;"
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
                            <p id="balance">Balance: {balanceUSDC} </p>
                            <p id="max">Max</p>
                        </div>
                    ) : (
                        <p className="bad-balance-text">
                            Balance: {balanceUSDC}
                        </p>
                    )}
                </div>
            </div>
            {ethers.getBigInt(balanceUSDC) >= ethers.getBigInt(100) ? (
                depositAmount === 0 ? (
                    <div className="empty-balance">Enter an amount</div>
                ) : (
                    <div className="good-balance"> Deposit to account</div>
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
