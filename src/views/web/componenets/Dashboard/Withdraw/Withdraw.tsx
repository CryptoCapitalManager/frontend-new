import { FC, useState } from "react";
import { ethers } from "ethers";

import "./Withdraw.scss";

import usdc from "../../../../../res/svg/usdc-balance.svg";

import { withdrawProps } from "../../../../../utils/props";

const Withdraw: FC<withdrawProps> = ({
    appHeight,
    investedAmount,
    setWithdrawVisible,
}) => {
    const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

    return (
        <div className="withdraw-tab" style={{ height: `${appHeight}px` }}>
            <div className="container">
                <div className="tab-header">
                    <p id="header">Deposit</p>
                    <div
                        className="btn"
                        onClick={() => {
                            setWithdrawVisible(false);
                        }}
                    >
                        X
                    </div>
                </div>

                <div className="input">
                    <div className="left">
                        <input
                            type="text"
                            value={withdrawAmount}
                            onChange={(e) => {
                                const result = Number(e.target.value);

                                if (
                                    !isNaN(result) &&
                                    result >= 0 &&
                                    result < Number.MAX_SAFE_INTEGER
                                ) {
                                    setWithdrawAmount(Number(e.target.value));
                                }
                            }}
                            disabled={
                                ethers.getBigInt(investedAmount) ===
                                ethers.getBigInt(0)
                            }
                        />
                    </div>
                    <div className="right">
                        <img src={usdc} alt="USDC banner" />
                        <div className="good-balance-text">
                            <p id="balance">
                                Total invested amount: {investedAmount}
                            </p>
                        </div>
                    </div>
                </div>
                {withdrawAmount === 0 ? (
                    <div className="empty-balance">Enter an amount</div>
                ) : (
                    <div className="good-balance"> Deposit to account</div>
                )}
            </div>
        </div>
    );
};

export default Withdraw;
