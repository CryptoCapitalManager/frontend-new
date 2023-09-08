import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./TransactionsTable.scss";

import arrow from "../../../../../res/svg/arrow.svg";
import arbitrum from "../../../../../res/svg/arbitrum.svg";
import eth from "../../../../../res/svg/eth-usdc.svg";

import { transactionsTableProps } from "../../../../../utils/props";

import { tradingPairDTO } from "../../../../../utils/dto";

import mock from "../../../../../res/mock.json";

const TransactionsTable: FC<transactionsTableProps> = ({
    windowWidth: width,
}) => {
    const [data, setData] = useState<tradingPairDTO[]>(mock.messages);
    const [visibleData, setVisibleData] = useState<tradingPairDTO[]>([]);

    const [current, setCurrent] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([1, 2, 3, 4, 5]);

    const [sortOption, setSortOption] = useState<string>("Sort by date");

    useEffect(() => {
        switch (sortOption) {
            case "Sort by date":
                const sortedByDate = data.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setData(sortedByDate);
                setVisibleData(sortedByDate.slice(0, 4));
                break;

            case "Sort by ROI":
                const sortedByROI = data.sort((a, b) => b.ROI - a.ROI);
                setData(sortedByROI);
                setVisibleData(sortedByROI.slice(0, 4));
                break;

            case "Sort by position":
                const sortedByPosition = data.sort((a, b) =>
                    b.positionType.localeCompare(a.positionType)
                );
                setData(sortedByPosition);
                setVisibleData(sortedByPosition.slice(0, 4));
                break;
        }
    }, [sortOption]);

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
        <div className="table-container">
            <div className="upper-part">
                <p>Trading history</p>
                <select
                    id="sorting"
                    value={sortOption}
                    onChange={(e) => {
                        setSortOption(e.target.value);
                    }}
                >
                    <option>Sort by date</option>
                    <option>Sort by ROI</option>
                    <option>Sort by position</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr style={{ width: "100%" }}>
                        <th style={{ width: "3%" }}>#</th>
                        <th style={{ width: "45%" }}>Trading pair</th>
                        <th style={{ width: "10%" }}>Position</th>
                        <th style={{ width: "14%" }} hidden={width < 1195}>
                            Entry price
                        </th>
                        <th style={{ width: "14%" }} hidden={width < 1195}>
                            Exit price
                        </th>
                        <th style={{ width: "5%" }}>ROI</th>
                    </tr>
                </thead>
                {visibleData.length === 0 ? (
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td hidden={width < 1195}></td>
                            <td hidden={width < 1195}></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td hidden={width < 1195}></td>
                            <td hidden={width < 1195}></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td hidden={width < 1195}></td>
                            <td hidden={width < 1195}></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td hidden={width < 1195}></td>
                            <td hidden={width < 1195}></td>
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
                                            <div className="pair-web">
                                                <img
                                                    src={eth}
                                                    alt="Pair symbol"
                                                />
                                                <p>{tradingPair.tradingPair}</p>
                                            </div>
                                        </td>
                                        <td>{tradingPair.positionType}</td>
                                        <td hidden={width < 1195}>
                                            <div className="link-container-web">
                                                <img
                                                    src={arbitrum}
                                                    alt="Arbitrum network icon"
                                                />
                                                <Link
                                                    to={tradingPair.entryTX}
                                                    id="link-web"
                                                    target="_blank"
                                                >
                                                    {tradingPair.entryPrice}{" "}
                                                    USDC
                                                </Link>
                                            </div>
                                        </td>
                                        <td hidden={width < 1195}>
                                            <div className="link-container-web">
                                                <img src={arbitrum} alt="" />
                                                <Link
                                                    to={tradingPair.exitTX}
                                                    id="link-web"
                                                    target="_blank"
                                                >
                                                    {tradingPair.exitPrice} USDC
                                                </Link>
                                            </div>
                                        </td>
                                        {tradingPair.ROI > 0 ? (
                                            <td
                                                style={{
                                                    color: "#A5DF08",
                                                }}
                                            >
                                                {tradingPair.ROI}%
                                            </td>
                                        ) : (
                                            <td
                                                style={{
                                                    color: "#CF202F",
                                                }}
                                            >
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
            <div className="pagination-web">
                <img
                    src={arrow}
                    alt="Left arrow"
                    className={current === 1 ? "arrow unselectable" : "arrow"}
                    id="left-web"
                    onClick={() => {
                        handlePagination(current - 1);
                        setCurrent(current - 1);
                    }}
                />
                <div className="pages-web">
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
                    id="right-web"
                    onClick={() => {
                        handlePagination(current + 1);
                        setCurrent(current + 1);
                    }}
                />
            </div>
        </div>
    );
};

export default TransactionsTable;
