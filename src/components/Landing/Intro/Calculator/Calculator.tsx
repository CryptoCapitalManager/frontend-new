import { useRef, useState } from "react";

import "./Calculator.scss";

const Calculator = () => {
    const time = useRef("1 year");

    const [period, setPeriod] = useState(12);
    const [initial, setInitial] = useState(1000);
    const [extra, setExtra] = useState(100);

    const handlePeriodChange = (newPeriod: number) => {
        setPeriod(newPeriod);

        const years = Math.floor(newPeriod / 12);
        const months = (newPeriod - years * 12) % 12;

        let result = "";

        if (years > 0) {
            if (years === 1) {
                result += ` ${years} year`;
            } else {
                result += ` ${years} years`;
            }
        }

        if (months > 0) {
            if (months === 1) {
                result += ` ${months} month`;
            } else {
                result += ` ${months} months`;
            }
        }

        time.current = result;
    };

    return (
        <div className="Calculator">
            <div className="container">
                <div className="text">
                    <p id="title">Calculate your earnings</p>
                    <p id="header">Investment & ROI calculator</p>
                    <p id="subtext">
                        Based on our trading success from the previous year
                    </p>
                </div>
                <div className="calculator-container">
                    <div className="input">
                        <div className="amount">
                            <p id="title">Initial deposit</p>
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={initial}
                                    onChange={(e) => {
                                        setInitial(Number(e.target.value));
                                    }}
                                />
                                <p>USDC</p>
                            </div>
                        </div>
                        <div className="period">
                            <p id="title">Period</p>
                            <p id="duration">{time.current}</p>
                            <input
                                type="range"
                                id="period"
                                min={1}
                                max={24}
                                step={1}
                                value={period}
                                onChange={(e) => {
                                    handlePeriodChange(Number(e.target.value));
                                }}
                            />
                            <div className="limits">
                                <p>1 month</p>
                                <p>2 years</p>
                            </div>
                        </div>
                        <div className="extra">
                            <p id="title">Extra monthly deposit</p>
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={extra}
                                    onChange={(e) => {
                                        setExtra(Number(e.target.value));
                                    }}
                                />
                                <p>USDC</p>
                            </div>
                        </div>
                    </div>
                    <div className="result-shadow">
                        <div className="result">
                            <div className="invested">
                                <p id="title">Investment value</p>
                                <p id="amount">3300 USDC</p>
                            </div>
                            <div className="break"></div>
                            <div className="additional">
                                <div className="total">
                                    <p id="title">Total deposit</p>
                                    <p id="amount">2100 USDC</p>
                                </div>
                                <div className="period">
                                    <p id="title">Period</p>
                                    <p id="amount">1 year</p>
                                </div>
                            </div>
                            <div className="btn">Get started</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
