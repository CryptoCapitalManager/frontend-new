import { FC, useEffect, useState } from "react";
import { ethers } from "ethers";

import "./Withdraw.scss";

import trading_abi from "../../../../../abi/trading.json";

import usdc from "../../../../../res/svg/usdc-balance.svg";

import { withdrawProps } from "../../../../../utils/props";
import { TRADING_GOERLI_ADDRESS } from "../../../../../utils/const";
import { withdrawlResponse } from "../../../../../utils/dto";

const Withdraw: FC<withdrawProps> = ({
    signer,
    address,
    dashboardHeight,
    investedAmount,
    setWithdrawVisible,
}) => {
    const [withdrawAmount, setWithdrawAmount] = useState<number>(0);

    const withdraw = async () => {
        let withdrawlData: withdrawlResponse;

        try {
            const result = await fetch(
                `https://investiva-test-api.onrender.com/user/withdraw/${address}?amount=${withdrawAmount}`
            );
            withdrawlData = await result.json();
        } catch (e) {
            // TODO: Tell user something went wrong
            return;
        }

        console.log(withdrawlData);

        const trading = new ethers.Contract(
            TRADING_GOERLI_ADDRESS,
            trading_abi.abi,
            signer
        );

        try {
            await trading.withdrawMultiple(
                withdrawlData.args,
                withdrawlData.args.length
            );
        } catch (e) {
            // TODO: Tell user all is good
            console.log(e);
        }

        setWithdrawVisible(false);
    };

    return (
        <div
            className="withdraw-tab"
            style={{ height: `${dashboardHeight}px` }}
        >
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
                            disabled={+investedAmount === 0}
                            style={{
                                color:
                                    +withdrawAmount > 0
                                        ? "rgba(0, 0, 0, 1)"
                                        : "",
                            }}
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
                    <div
                        className="good-balance"
                        onClick={() => {
                            withdraw();
                        }}
                    >
                        Withdraw from account
                    </div>
                )}
            </div>
        </div>
    );
};

export default Withdraw;
