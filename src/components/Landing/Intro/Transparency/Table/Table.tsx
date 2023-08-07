import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { tableProps } from "../../../../../utils/props";

import "./Table.scss";

import arrow from "../../../../../res/svg/arrow.svg";
import arbitrum from "../../../../../res/svg/arbitrum.svg";
import eth from "../../../../../res/svg/eth-usdc.svg";

import { tradingPairDTO } from "../../../../../utils/dto";

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
        if (current - 1 === 0) {
            return;
        }

        const newPages: number[] = pages;

        if (current - 1 === pages[4]) {
            for (let i = 0; i < newPages.length; i++) {
                newPages[i] += 5;
            }

            setPages(newPages);
        }
        if (current + 1 === pages[0]) {
            const newPages: number[] = pages;

            for (let i = 0; i < newPages.length; i++) {
                newPages[i] -= 5;
            }

            setPages(newPages);
        }
    }, [current]);

    useEffect(() => {
        console.log("radi");
    }, [pages]);

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
                {data.length === 0 ? (
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
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
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
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
                                                    {tradingPair.entryPrice}{" "}
                                                    USDC
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
                )}
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
                    alt=""
                    className={
                        (current + 1) * 4 - data.length >= 4
                            ? "arrow unselectable"
                            : "arrow"
                    }
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