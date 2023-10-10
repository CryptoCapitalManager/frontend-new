import { FC, useEffect, useRef, useState } from "react";

import "./Calculator.scss";

import loading from "../../../../../../res/svg/loading-animation.svg";

import { calculatorProps } from "../../../../../../utils/props";
import { isSameYearAndMonth } from "../../../../../../utils/utils";
import { Link } from "react-router-dom";
import ReactSlider from "react-slider";

const Calculator: FC<calculatorProps> = ({ windowDimensions, data }) => {
    const currentPeriodTxt = useRef("1 year");
    const maxPeriodTxt = useRef("2 years");

    const groupedROIs = useRef<number[]>([]);

    const [periodValue, setPeriodValue] = useState<number>(12);
    const [maxPeriodValue, setMaxPeriodValue] = useState<number>(24);

    const [initialDeposit, setInitialDeposit] = useState<number>(1000);
    const [extraDeposit, setExtraDeposit] = useState<number>(100);
    const [totalDeposit, setTotalDeposit] = useState<number>(2200);

    const [investmentValue, setInvestmentValue] = useState<number>(3300);

    const elementRef = useRef<any>(null);
    const [elementDimensions, setElementDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        setElementDimensions({
            width: elementRef.current.offsetWidth,
            height: elementRef.current.offsetHeight,
        });
    }, [windowDimensions]);

    // initial data load
    useEffect(() => {
        setPeriodValues();
    }, [data]);

    useEffect(() => {
        setTotalDeposit(initialDeposit + periodValue * extraDeposit);

        calculate();
    }, [periodValue, initialDeposit, extraDeposit]);

    const setPeriodValues = () => {
        const maxPeriod = updateMaxPeriodValue();
        setMaxPeriodText(maxPeriod);

        getGroupedROIs(maxPeriod);

        const current = updateCurrentPriodValue(maxPeriod);
        updatePeriodValue(current);
    };

    const updateMaxPeriodValue = (): number => {
        try {
            // Get max period
            const maxPeriod =
                Math.ceil(
                    (new Date(data[0].date).getTime() -
                        new Date(data[data.length - 1].date).getTime()) /
                        (1000 * 60 * 60 * 24 * 31)
                ) + 1;

            // Update max period value
            setMaxPeriodValue(maxPeriod);

            return maxPeriod;
        } catch {
            setMaxPeriodValue(24);

            return 24;
        }
    };

    const updateCurrentPriodValue = (maxPeriod: number): number => {
        const currentPeriod = maxPeriod / 2;

        setPeriodValue(currentPeriod);

        return currentPeriod;
    };

    const setMaxPeriodText = (maxPeriod: number) => {
        try {
            const years = Math.floor(maxPeriod / 12);
            const months = Math.floor(maxPeriod - ((years * 12) % 12));

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

            maxPeriodTxt.current = result;
        } catch {
            maxPeriodTxt.current = "2 years";
        }
    };

    const setPeriodText = (newPeriodValue: number) => {
        const years = Math.floor(newPeriodValue / 12);
        const months = (newPeriodValue - years * 12) % 12;

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

        currentPeriodTxt.current = result;
    };

    const getGroupedROIs = (maxPeriod: number) => {
        try {
            const ROIs: number[] = [];

            const temp: Date = new Date(data[data.length - 1].date);
            temp.setMonth(temp.getMonth() - 1);

            for (let i = 1; i <= maxPeriod; i++) {
                temp.setMonth(temp.getMonth() + 1);

                ROIs.push(getROIofMonth(temp));
            }

            groupedROIs.current = ROIs;
        } catch {}
    };

    const updatePeriodValue = (newPeriodValue: number) => {
        setPeriodValue(newPeriodValue);
        setPeriodText(newPeriodValue);
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
        const usedROIs = groupedROIs.current.slice(0, periodValue);

        let investment = initialDeposit;

        for (let i = 0; i < usedROIs.length; i++) {
            if (i !== 0) investment += extraDeposit;
            investment = investment * ((100 + usedROIs[i]) / 100);
        }

        const deposit = initialDeposit + periodValue * extraDeposit;

        setInvestmentValue(investment - deposit);
    };

    return (
        <div className="calculator-mobile">
            <div className="container-mobile">
                <div className="text-mobile">
                    <p id="title-mobile">Calculate your earnings</p>
                    <p id="text-header-mobile">Investment & ROI calculator</p>
                    <p id="subtext-mobile">
                        Based on our trading success from the previous year
                    </p>
                </div>
                <div className="calculator-container-mobile" ref={elementRef}>
                    {data.length === 0 && (
                        <div
                            className="loading-animation-container"
                            style={{
                                width: elementDimensions.width,
                                height: elementDimensions.height,
                            }}
                        >
                            <img src={loading} id="loading-animation" />
                        </div>
                    )}
                    <div className="input-mobile">
                        <div className="amount-mobile">
                            <p id="title-mobile">Initial deposit</p>
                            <div className="input-container-mobile">
                                <input
                                    type="text-mobile"
                                    value={initialDeposit}
                                    onChange={(e) => {
                                        const previousValue = initialDeposit;
                                        const newValue = Number(e.target.value);

                                        if (!Number.isNaN(newValue)) {
                                            setInitialDeposit(Number(newValue));
                                        } else {
                                            setInitialDeposit(previousValue);
                                        }
                                    }}
                                />
                                <p>USDC</p>
                            </div>
                        </div>
                        <div className="period-mobile">
                            <p id="title-mobile">Period</p>
                            <p id="duration-mobile">
                                {currentPeriodTxt.current}
                            </p>
                            <ReactSlider
                                className="period-mobile-slider"
                                trackClassName="period-mobile-track"
                                thumbClassName="period-mobile-thumb"
                                min={1}
                                max={maxPeriodValue}
                                step={1}
                                value={periodValue}
                                onChange={(e) => {
                                    updatePeriodValue(e);
                                }}
                            />
                            <div className="limits-mobile">
                                <p>1 month</p>
                                <p>{maxPeriodTxt.current}</p>
                            </div>
                        </div>
                        <div className="extra-mobile">
                            <p id="title-mobile">Extra monthly deposit</p>
                            <div className="input-container-mobile">
                                <input
                                    type="text"
                                    value={extraDeposit}
                                    onChange={(e) => {
                                        const previousValue = extraDeposit;
                                        const newValue = Number(e.target.value);

                                        if (!Number.isNaN(newValue)) {
                                            setExtraDeposit(Number(newValue));
                                        } else {
                                            setExtraDeposit(previousValue);
                                        }
                                    }}
                                />
                                <p>USDC</p>
                            </div>
                        </div>
                    </div>
                    <div className="result-shadow-mobile">
                        <div className="result-mobile">
                            <div className="invested-mobile">
                                <p id="title-mobile">Investment value</p>
                                <p id="amount-mobile">
                                    {(totalDeposit + investmentValue).toFixed(
                                        2
                                    )}{" "}
                                    USDC
                                </p>
                            </div>
                            <div className="break-mobile"></div>
                            <div className="additional-mobile">
                                <div className="total-mobile">
                                    <p id="title-mobile">Total deposit</p>
                                    <p id="amount-mobile">
                                        {totalDeposit} USDC
                                    </p>
                                </div>
                                <div className="period-mobile">
                                    <p id="title-mobile">Period</p>
                                    <p id="amount-mobile">
                                        {currentPeriodTxt.current}
                                    </p>
                                </div>
                            </div>
                            <Link to={"/dashboard"} className="btn-mobile">
                                <div>Get started</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
