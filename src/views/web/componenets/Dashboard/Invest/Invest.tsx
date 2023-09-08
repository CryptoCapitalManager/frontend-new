import { FC, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";

import "./Invest.scss";

import usdc from "../../../../../res/svg/usdc-balance.svg";

import { investProps } from "../../../../../utils/props";

const Invest: FC<investProps> = ({
    appHeight,
    balanceUSDC,
    setInvestVisible,
}) => {
    const [investAmount, setInvestAmount] = useState<number>(0);

    return (
        <div className="invest-tab" style={{ height: `${appHeight}px` }}>
            <div className="container">
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
                    <div className="good-balance"> Deposit to account</div>
                )}
            </div>
        </div>
    );
};

export default Invest;
