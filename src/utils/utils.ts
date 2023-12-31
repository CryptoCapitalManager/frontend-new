import React from "react";
import { JsonRpcSigner, ethers } from "ethers";

import usdc_abi from "../abi/usdc_goerli.json";
import trading_abi from "../abi/trading.json";

import { balanceChangeDTO, userDataDTO } from "./dto";

import eth_pair from "../res/svg/trading-pairs/eth-pair.svg";
import btc_pair from "../res/svg/trading-pairs/bitcoin-pair.svg";
import arb_pair from "../res/svg/trading-pairs/arb-pair.svg";
import link_pair from "../res/svg/trading-pairs/link-pair.svg";
import uni_pair from "../res/svg/trading-pairs/uniswap-pair.svg";
import sol_pair from "../res/svg/trading-pairs/sol-pair.svg";
import dodge_pair from "../res/svg/trading-pairs/dodge-pair.svg";
import xrp_pair from "../res/svg/trading-pairs/xrp-pair.svg";
import ltc_pair from "../res/svg/trading-pairs/ltc-pair.svg";
import { error } from "./toasts";

const isSameYearAndMonth = (firstDate: Date, secondDate: Date) => {
    return (
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth()
    );
};

const getTradingPairIcon = (pair: string): string => {
    switch (pair) {
        case "ETH/USDC":
            return eth_pair;

        case "BTC/USDC":
            return btc_pair;

        case "ARB/USDC":
            return arb_pair;

        case "LINK/USDC":
            return link_pair;

        case "UNI/USDC":
            return uni_pair;

        case "SOL/USDC":
            return sol_pair;

        case "DODGE/USDC":
            return dodge_pair;

        case "XRP/USDC":
            return xrp_pair;

        case "LTC/USDC":
            return ltc_pair;

        default:
            return arb_pair;
    }
};

const formatBalanceString = (balance: string): string => {
    const dotIndex = balance.indexOf(".");
    return dotIndex !== -1
        ? balance.substring(0, dotIndex + 3)
        : `${balance}.0`;
};

const maxYpoint = (userData: balanceChangeDTO[]): number => {
    let maxYpoint = 0;

    userData.forEach((change) => {
        if (maxYpoint < change.amount) {
            maxYpoint = change.amount;
        }
    });

    maxYpoint = Math.round(maxYpoint / 100) * 175;

    return maxYpoint;
};

const filterUserData = (
    userData: userDataDTO,
    period: number
): balanceChangeDTO[] => {
    const currentDate = new Date().getTime();
    const subtractedMonths = period * 31 * 24 * 60 * 60 * 1000;

    const periodThreshold = new Date(currentDate - subtractedMonths);

    const filteredData: balanceChangeDTO[] = [];

    userData.balanceChanges.forEach((change) => {
        if (new Date(change.date) > periodThreshold) {
            filteredData.push({
                actionType: change.actionType,
                amount: change.amount,
                date: change.date,
            });
        }
    });

    if (filteredData.length === 1) {
        filteredData.push(filteredData[0]);
    }

    return filteredData;
};

const formatPercentage = (percentage: number): string => {
    const result = percentage.toFixed(1);
    return result;
};

const calculateROIEarnings = (roi: number, totalDeposit: number): string => {
    return formatBalanceString(((roi * totalDeposit) / 100).toString());
};

const connectToWallet = async () => {
    if (!window.ethereum) {
        error("You must use a ethereum compatible wallet!");
        return;
    }

    if (!window.ethereum.isMetaMask) {
        error("You must use metamask!");
        return;
    }

    const provider = window.ethereum;

    try {
        await provider.request({
            method: "eth_requestAccounts",
        });
    } catch (e: any) {
        switch (e.code) {
            case -32002:
                error("You already have a pending website connection request!");
                return;
            case 4001:
                error(
                    "You must approve the website to connect to your wallet!"
                );
                return;
            default:
                console.log(e);
                return;
        }
    }

    const chainId: any = await provider.request({
        method: "eth_chainId",
    });

    if (chainId !== process.env.REACT_APP_CHAIN_ID) {
        await provider.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: process.env.REACT_APP_CHAIN_ID,
                    rpcUrls: [process.env.REACT_APP_RPC_URL],
                    chainName: process.env.REACT_APP_CHAIN_NAME,
                    nativeCurrency: {
                        name: process.env.REACT_APP_CURRENCY_NAME,
                        symbol: process.env.REACT_APP_SYMBOL,
                        decimals: +process.env.REACT_APP_DECIMALS!,
                    },
                    blockExplorerUrls: [process.env.REACT_APP_BLOCK_EXPLORER],
                },
            ],
        });
    }

    window.location.reload();
};

const metamaskConnectionCheck = async (
    setDataLoaded: React.Dispatch<boolean>,
    setAddress: React.Dispatch<string>,
    setDisplayAddress: React.Dispatch<string>,
    setSigner: React.Dispatch<React.SetStateAction<JsonRpcSigner | undefined>>,
    setBalanceUSDC: React.Dispatch<React.SetStateAction<string>>,
    setHasInvested: React.Dispatch<React.SetStateAction<boolean>>
) => {
    // Check if using any wallet
    if (!window.ethereum) {
        // TODO: Tell user that metamask is needed
        setDataLoaded(true);
        return;
    }

    // Check if using metamask
    if (!window.ethereum.isMetaMask) {
        setDataLoaded(true);
        return;
    }

    const metamask = window.ethereum;

    let accounts: any;

    try {
        accounts = await metamask.request({
            method: "eth_accounts",
        });
    } catch (e) {
        setDataLoaded(true);
        return;
    }

    // Check if any account is connected
    if (accounts.length === 0) {
        setDataLoaded(true);
        return;
    }

    // Get current chainID
    let chainId: any;
    try {
        chainId = await metamask.request({ method: "eth_chainId" });
    } catch (e) {
        setDataLoaded(true);
        return;
    }

    // Check chainID
    if (chainId !== process.env.REACT_APP_CHAIN_ID) {
        return;
    }

    const provider = new ethers.BrowserProvider(metamask);
    const signer = await provider.getSigner();

    setSigner(signer);
    setAddress(accounts[0]);
    setDisplayAddress(
        `0x${accounts[0].slice(2, 5).toUpperCase()}...${accounts[0]
            .slice(accounts[0].length - 4)
            .toUpperCase()}`
    );

    const constractUSDC = new ethers.Contract(
        process.env.REACT_APP_USDC_ADDRESS!,
        usdc_abi.abi,
        provider
    );

    const balance = await constractUSDC.balanceOf(accounts[0]);

    setBalanceUSDC(balance.toString());

    const trading = new ethers.Contract(
        process.env.REACT_APP_TRADING_ADDRESS!,
        trading_abi.abi,
        provider
    );

    const hasInvested =
        (await trading.getUserInvestments(accounts[0])).length !== 0;

    setHasInvested(hasInvested);

    setDataLoaded(true);
};

const metamaskListener = async () => {
    // Check if using any wallet
    if (!window.ethereum) {
        return;
    }

    // Check if using metamask
    if (!window.ethereum.isMetaMask) {
        return;
    }

    const metamask = window.ethereum;

    metamask.on("accountsChanged", () => {
        window.location.reload();
    });
    metamask.on("chainChanged", (chainId) => {
        if (chainId !== process.env.REACT_APP_CHAIN_ID) {
            window.location.reload();
        }
    });
};

const capitalizeString = (word: string): string => {
    return `${word.charAt(0).toUpperCase() + word.slice(1)}`;
};

const parseUSDCBalance = (amount: string): string => {
    const length = amount.length;

    if (length <= 4) {
        return "0";
    } else if (length === 5) {
        return `0.0${amount[0]}`;
    } else if (length === 6) {
        return `0.${amount.slice(0, length - 5)}`;
    } else {
        const decimalPoint = length - 6;

        return `${amount.slice(0, decimalPoint)}.${amount.slice(
            decimalPoint,
            decimalPoint + 2
        )}`;
    }
};

export {
    getTradingPairIcon,
    isSameYearAndMonth,
    formatBalanceString,
    formatPercentage,
    calculateROIEarnings,
    connectToWallet,
    metamaskConnectionCheck,
    metamaskListener,
    maxYpoint,
    filterUserData,
    capitalizeString,
    parseUSDCBalance,
};
