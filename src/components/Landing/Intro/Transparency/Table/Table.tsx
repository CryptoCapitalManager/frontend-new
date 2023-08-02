import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { tableProps } from "../../../../../utils/props";

import "./Table.scss";

import arrow from "../../../../../res/svg/arrow.svg";
import arbitrum from "../../../../../res/svg/arbitrum.svg";
import eth from "../../../../../res/svg/eth-usdc.svg";
import link from "../../../../../res/svg/link-usdc.svg";
import { tradingPairDTO } from "../../../../../utils/dto";

const Table: FC<tableProps> = ({ data }) => {
    const [current, setCurrent] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([1, 2, 3, 4, 5]);
    const [visibleData, setVisibleData] = useState<tradingPairDTO[]>([]);

    // Will start when data is loaded
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

    const handlePagination = (page: number) => {
        let visible: tradingPairDTO[] = [];

        for (let index = (page - 1) * 4; index < page * 4; index++) {
            try {
                visible.push(data[index]);
            } catch {
                visible.push({
                    date: "",
                    entryPrice: 0,
                    entryTX: "",
                    exitPrice: 0,
                    exitTX: "",
                    positionType: "",
                    realROI: 0,
                    ROI: 0,
                    tradingPair: "",
                });
            }
        }

        setVisibleData(visible);
    };

    return (
        <div className="Table">
            <table>
                <thead>
                    <tr style={{ width: "100%" }}>
                        <th style={{ width: "3%" }}>#</th>
                        <th style={{ width: "45%" }}>Trading pair</th>
                        <th style={{ width: "10%" }}>Position</th>
                        <th style={{ width: "14%" }}>Entry price</th>
                        <th style={{ width: "14%" }}>Exit price</th>
                        <th style={{ width: "5%" }}>ROI</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleData.map((tradingPair, index) => {
                        try {
                            return (
                                <tr>
                                    <td>{(current - 1) * 4 + index + 1}</td>
                                    <td>
                                        <div className="pair">
                                            <img src={eth} alt="" />
                                            <p>{tradingPair.tradingPair}</p>
                                        </div>
                                    </td>
                                    <td>{tradingPair.positionType}</td>
                                    <td>
                                        <div className="link-container">
                                            <img
                                                src={arbitrum}
                                                alt="Arbitrum network icon"
                                            />
                                            <Link
                                                to={tradingPair.entryTX}
                                                id="link"
                                                target="_blank"
                                            >
                                                {tradingPair.entryPrice} USDC
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="link-container">
                                            <img src={arbitrum} alt="" />
                                            <Link
                                                to={tradingPair.exitTX}
                                                id="link"
                                                target="_blank"
                                            >
                                                {tradingPair.exitPrice} USDC
                                            </Link>
                                        </div>
                                    </td>
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
                                    <td></td>
                                    <td></td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <img
                    src={arrow}
                    alt=""
                    className={current === 1 ? "arrow unselectable" : "arrow"}
                    id="left"
                    onClick={() => {
                        handlePagination(current - 1);
                        setCurrent(current - 1);
                    }}
                />
                <div className="pages">
                    {pages.map((page) => {
                        return page === current ? (
                            <div
                                className="page"
                                id="current"
                                style={{ pointerEvents: "none" }}
                            >
                                {page}
                            </div>
                        ) : (
                            <div
                                className="page"
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
                    alt=""
                    className="arrow"
                    id="right"
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
