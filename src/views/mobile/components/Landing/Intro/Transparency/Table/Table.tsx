import { FC, useEffect, useState } from "react";

import "./Table.scss";

import arrow from "../../../../../../../res/svg/arrow.svg";
import arbitrum from "../../../../../../../res/svg/arbitrum.svg";
import eth from "../../../../../../../res/svg/eth-usdc.svg";

import { tableProps } from "../../../../../../../utils/props";
import { tradingPairDTO } from "../../../../../../../utils/dto";
import { Link } from "react-router-dom";

const Table: FC<tableProps> = ({ data }) => {
    const [current, setCurrent] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([1, 2, 3, 4, 5]);
    const [visibleData, setVisibleData] = useState<tradingPairDTO[]>([]);

    useEffect(() => {
        if (data[0] === undefined) {
            return;
        }

        let visible: tradingPairDTO[] = [];

        for (let index = 0; index < 4; index++) {
            visible.push(data[index]);
        }

        setVisibleData(visible);
    }, [data]);

    useEffect(() => {
        if (current === 1) {
            return;
        }

        const multiplier = Number((current / 5).toFixed(0));

        if ((current - 1) % 5 === 0) {
            setPages([
                multiplier * 5 + 1,
                multiplier * 5 + 2,
                multiplier * 5 + 3,
                multiplier * 5 + 4,
                multiplier * 5 + 5,
            ]);
        }

        if (current % 5 === 0) {
            setPages([
                (multiplier - 1) * 5 + 1,
                (multiplier - 1) * 5 + 2,
                (multiplier - 1) * 5 + 3,
                (multiplier - 1) * 5 + 4,
                (multiplier - 1) * 5 + 5,
            ]);
        }
    }, [current]);

    const handlePagination = (page: number) => {
        let visible: tradingPairDTO[] = [];

        for (let index = (page - 1) * 4; index < page * 4; index++) {
            try {
                visible.push(data[index]);
            } catch {}
        }

        setVisibleData(visible);
    };

    return (
        <div className="table-mobile">
            <table>
                <thead>
                    <tr style={{ width: "100%" }}>
                        <th style={{ width: "10%" }}>#</th>
                        <th style={{ width: "40%" }}>Trading pair</th>
                        <th style={{ width: "25%" }}>Position</th>
                        <th style={{ width: "25%" }}>ROI</th>
                    </tr>
                </thead>
                {data.length === 0 ? (
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody>
                        {visibleData.map((tradingPair, index) => {
                            try {
                                return (
                                    <tr>
                                        <td>{(current - 1) * 4 + index + 1}</td>
                                        <td>
                                            <div className="pair-mobile">
                                                <img
                                                    src={eth}
                                                    alt="Pair symbol"
                                                />
                                                <p>{tradingPair.tradingPair}</p>
                                            </div>
                                        </td>
                                        <td>{tradingPair.positionType}</td>
                                        {tradingPair.ROI > 0 ? (
                                            <td style={{ color: "#A5DF08" }}>
                                                {tradingPair.ROI}%
                                            </td>
                                        ) : (
                                            <td style={{ color: "#CF202F" }}>
                                                {tradingPair.ROI}%
                                            </td>
                                        )}
                                    </tr>
                                );
                            } catch {
                                return (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                )}
            </table>
            <div className="pagination-mobile">
                <img
                    src={arrow}
                    alt="Left arrow"
                    className={current === 1 ? "arrow unselectable" : "arrow"}
                    id="left-mobile"
                    onClick={() => {
                        handlePagination(current - 1);
                        setCurrent(current - 1);
                    }}
                />
                <div className="pages-mobile">
                    {pages.map((page) => {
                        return page === current ? (
                            <div
                                className="page "
                                id="current"
                                style={{ pointerEvents: "none" }}
                            >
                                {page}
                            </div>
                        ) : (
                            <div
                                className={
                                    page * 4 - data.length >= 4
                                        ? "page unselectable"
                                        : "page"
                                }
                                id="unselected"
                                onClick={(e: any) => {
                                    handlePagination(e.target.innerText);
                                    setCurrent(+e.target.innerText);
                                }}
                            >
                                {page}
                            </div>
                        );
                    })}
                </div>
                <img
                    src={arrow}
                    alt="Right arrow"
                    className={
                        (current + 1) * 4 - data.length >= 4
                            ? "arrow unselectable"
                            : "arrow"
                    }
                    id="right-mobile"
                    onClick={() => {
                        handlePagination(current + 1);
                        setCurrent(current + 1);
                    }}
                />
            </div>
        </div>
    );
};

export default Table;
