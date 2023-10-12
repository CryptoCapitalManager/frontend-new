import { FC, useEffect, useState } from "react";
import { ethers } from "ethers";

import "./Withdraw.scss";

import trading_abi from "../../../../../abi/trading.json";
import request_abi from "../../../../../abi/request.json";
import usdc from "../../../../../res/svg/usdc-balance.svg";

import { withdrawProps } from "../../../../../utils/props";
import { REJECTED_TRANSACTION } from "../../../../../utils/const";
import { withdrawlResponse } from "../../../../../utils/dto";

const Withdraw: FC<withdrawProps> = ({
    signer,
    address,
    dashboardHeight,
    investedAmount,
    setWithdrawVisible,
}) => {
    const [withdrawData, setWithdrawData] = useState<withdrawlResponse>();
    const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
    const [goToMultiple, setGoToMultiple] = useState<boolean>(false);

    const withdraw = async () => {
        let withdrawlData: withdrawlResponse;

        try {
            const result = await fetch(
                `https://investiva-test-api.onrender.com/user/withdraw/${address}?amount=${withdrawAmount}`
            );
            withdrawlData = await result.json();
            setWithdrawData(withdrawData);
        } catch (e) {
            // TODO: Tell user and error occured while prepairing the transaction
            return;
        }

        if (withdrawlData.inTrade === 0) {
            const trading = new ethers.Contract(
                process.env.REACT_APP_TRADING_ADDRESS!,
                trading_abi.abi,
                signer
            );

            try {
                await trading.withdrawMultiple(
                    withdrawlData.args,
                    withdrawlData.args.length
                );

                // TODO: Tell user transaction has been sent (create adequate promise toast)
                // TODO: Tell user that window will reload in 10 seconds after previous toast
            } catch (e: any) {
                if (e.reason === REJECTED_TRANSACTION) {
                    // TODO: Tell user that the action has been rejected
                } else {
                    // TODO: Tell user an error occured
                }
            }

            setWithdrawVisible(false);
        } else {
            setGoToMultiple(true);
        }
    };

    const withdrawNow = async () => {
        const trading = new ethers.Contract(
            process.env.REACT_APP_TRADING_ADDRESS!,
            trading_abi.abi,
            signer
        );

        try {
            await trading.withdrawMultiple(
                withdrawData?.args,
                withdrawData?.inTrade
            );

            // TODO: Tell user transaction has been sent (create adequate promise toast)
            // TODO: Tell user that window will reload in 10 seconds after previous toast
        } catch (e: any) {
            if (e.reason === REJECTED_TRANSACTION) {
                // TODO: Tell user that the action has been rejected
            } else {
                // TODO: Tell user an error occured
            }
        }

        setWithdrawVisible(false);
        setGoToMultiple(false);
    };

    const withdrawRequest = async () => {
        const request = new ethers.Contract(
            process.env.REACT_APP_REQUEST_ACTION_ADDRESS!,
            request_abi.abi,
            signer
        );

        try {
            await request.requestWithdrawMultiple(
                withdrawData?.args,
                withdrawData?.inTrade
            );

            // TODO: Tell user transaction has been sent (create adequate promise toast)
            // TODO: Tell user that window will reload in 10 seconds after previous toast
        } catch (e: any) {
            if (e.reason === REJECTED_TRANSACTION) {
                // TODO: Tell user that the action has been rejected
            } else {
                // TODO: Tell user an error occured
            }
        }

        setWithdrawVisible(false);
        setGoToMultiple(false);
    };

    return goToMultiple ? (
        <div
            className="withdraw-tab"
            style={{ height: `${dashboardHeight}px` }}
        >
            <div className="multiple-panel">
                <div className="tab-header">
                    <p id="header">Notice</p>
                    <div
                        className="btn"
                        onClick={() => {
                            setWithdrawVisible(false);
                            setGoToMultiple(false);
                        }}
                    >
                        X
                    </div>
                </div>
                <p id="notification-field">
                    We advise against withdrawing your funds at this time, as
                    there will be an additional 5% fee due to our current open
                    position. You can submit a withdrawal request, and your USDC
                    will be processed for payout as soon as we have closed all
                    positions.
                </p>
                <div className="btns">
                    <div
                        className="btn good"
                        onClick={() => {
                            withdrawRequest();
                        }}
                    >
                        Request withdraw
                    </div>
                    <div
                        className="btn bad"
                        onClick={() => {
                            withdrawNow();
                        }}
                    >
                        Withdraw now
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div
            className="withdraw-tab"
            style={{ height: `${dashboardHeight}px` }}
        >
            <div className="container">
                <div className="tab-header">
                    <p id="header">Withdraw</p>
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
