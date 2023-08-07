import { FC, useEffect, useRef, useState } from "react";

import "./Calculator.scss";
import { calculatorProps } from "../../../../utils/props";
import { isSameYearAndMonth } from "../../../../utils/utils";

const Calculator: FC<calculatorProps> = ({ data }) => {
    const time = useRef("1 year");
    const maxPeriodValue = useRef(24);
    const groupedROIs = useRef<number[]>([]);

    const [period, setPeriod] = useState<number>(12);
    const [initial, setInitial] = useState<number>(1000);
    const [extra, setExtra] = useState<number>(100);
    const [maxPeriod, setMaxPeriod] = useState<string>("2 years");
    const [totalDeposit, setTotalDeposit] = useState<number>(2200);
    const [investmentValue, setInvestmentValue] = useState<number>(3300);

    useEffect(() => {
        updateMaxPeriod();
        handlePeriodChange(Math.round(maxPeriodValue.current / 2));
        groupROIs();
    }, [data]);

    useEffect(() => {
        if (period > 1) {
            setTotalDeposit(initial + (period - 1) * extra);
        } else {
            setTotalDeposit(initial);
        }

        calculate();
    }, [initial, extra, period]);

    const updateMaxPeriod = () => {
        try {
            getMaxPeriod();

            const years = Math.floor(maxPeriodValue.current / 12);
            const months = Math.floor(
                maxPeriodValue.current - ((years * 12) % 12)
            );

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

            setMaxPeriod(result);
        } catch {
            setMaxPeriod("2 years");
        }
    };

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

    const getMaxPeriod = () => {
        const maxPeriod =
            Math.ceil(
                (new Date(data[0].date).getTime() -
                    new Date(data[data.length - 1].date).getTime()) /
                    (1000 * 60 * 60 * 24 * 31)
            ) + 1;

        maxPeriodValue.current = maxPeriod;
    };

    const groupROIs = () => {
        const ROIs: number[] = [];

        try {
            const temp: Date = new Date(data[data.length - 1].date);
            temp.setMonth(temp.getMonth() - 1);

            for (let i = 1; i <= maxPeriodValue.current; i++) {
                temp.setMonth(temp.getMonth() + 1);

                ROIs.push(getROIofMonth(temp));
            }

            groupedROIs.current = ROIs;
        } catch {}
    };

    const yearAndMonthExist = (date: Date): boolean => {
        let exists: number = 0;

        for (let i = 0; i < data.length; i++) {
            if (isSameYearAndMonth(new Date(data[i].date), date)) {
                exists++;
            }
        }

        return exists !== 0 ? true : false;
    };

    const getROIofMonth = (date: Date): number => {
        if (!yearAndMonthExist(date)) {
            return 0;
        }

        let ROI: number = 1;

        for (let i = 0; i < data.length; i++) {
            if (isSameYearAndMonth(new Date(data[i].date), date)) {
                ROI = ROI * (1 + data[i].realROI / 100);
            }
        }

        return Number((ROI * 100 - 100).toFixed(2));
    };

    const calculate = () => {
        const usedROIs = groupedROIs.current.slice(
            groupedROIs.current.length - period,
            groupedROIs.current.length
        );

        let investment = initial;

        for (let i = 0; i < usedROIs.length; i++) {
            if (i != 0) investment += extra;
            investment = investment * ((100 + usedROIs[i]) / 100);
        }

        const value = Number(investment.toFixed(2)) - totalDeposit;

        setInvestmentValue(value);
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
                                max={maxPeriodValue.current}
                                step={1}
                                value={period}
                                onChange={(e) => {
                                    handlePeriodChange(Number(e.target.value));
                                    getMaxPeriod();
                                }}
                            />
                            <div className="limits">
                                <p>1 month</p>
                                <p>{maxPeriod}</p>
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
                                <p id="amount">
                                    {totalDeposit + investmentValue} USDC
                                </p>
                            </div>
                            <div className="break"></div>
                            <div className="additional">
                                <div className="total">
                                    <p id="title">Total deposit</p>
                                    <p id="amount">{totalDeposit} USDC</p>
                                </div>
                                <div className="period">
                                    <p id="title">Period</p>
                                    <p id="amount">{time.current}</p>
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
