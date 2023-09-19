import React from "react";
import { Provider, ethers } from "ethers";

import {
    ARBITRUM_GOERLI_CONFIGURATION,
    ARBITRUM_GOERLI_USDC_ADDRESS,
    TRADING_GOERLI_ADDRESS,
} from "./const";

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
        // Ako ne postoji
        return;
    }

    if (!window.ethereum.isMetaMask) {
        // Nije metamask
        return;
    }

    const provider = window.ethereum;

    // Povezi se sa sajtom
    try {
        // Pitaj da se poveze
        await provider.request({
            method: "eth_requestAccounts",
        });
    } catch (e: any) {
        // -32002 Ceka vec neku transakciju
        // 4001 korisnik odbio
        console.log(e.code);
        return;
    }

    const chainId: any = await provider.request({
        method: "eth_chainId",
    });

    // Proveri chain
    if (chainId !== ARBITRUM_GOERLI_CONFIGURATION.chainId) {
        // Nije na Arb mrezi

        // Predji na Arb
        await provider.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: ARBITRUM_GOERLI_CONFIGURATION.chainId,
                    rpcUrls: ARBITRUM_GOERLI_CONFIGURATION.rpcUrls,
                    chainName: ARBITRUM_GOERLI_CONFIGURATION.chainName,
                    nativeCurrency: {
                        name: ARBITRUM_GOERLI_CONFIGURATION.nativeCurrency.name,
                        symbol: ARBITRUM_GOERLI_CONFIGURATION.nativeCurrency
                            .symbol,
                        decimals:
                            ARBITRUM_GOERLI_CONFIGURATION.nativeCurrency
                                .decimals,
                    },
                    blockExplorerUrls:
                        ARBITRUM_GOERLI_CONFIGURATION.blockExplorerUrls,
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
    setProvider: React.Dispatch<React.SetStateAction<Provider | undefined>>,
    setBalanceUSDC: React.Dispatch<React.SetStateAction<string>>,
    setHasInvested: React.Dispatch<React.SetStateAction<boolean>>
) => {
    // Check if using any wallet
    if (!window.ethereum) {
        return;
    }

    // Check if using metamask
    if (!window.ethereum.isMetaMask) {
        return;
    }

    const metamask = window.ethereum;

    const accounts: any = await metamask.request({
        method: "eth_accounts",
    });

    // Check if any account is connected
    if (accounts.length === 0) {
        // TODO: Tell user to open up metamask

        return;
    }

    // Get current chainID
    const chainId: any = await metamask.request({ method: "eth_chainId" });

    // Check chainID
    if (chainId !== ARBITRUM_GOERLI_CONFIGURATION.chainId) {
        return;
    }

    const provider = new ethers.BrowserProvider(metamask);

    setProvider(provider);
    setAddress(accounts[0]);
    setDisplayAddress(
        `0x${accounts[0].slice(2, 5).toUpperCase()}...${accounts[0]
            .slice(accounts[0].length - 4)
            .toUpperCase()}`
    );

    const constractUSDC = new ethers.Contract(
        ARBITRUM_GOERLI_USDC_ADDRESS,
        usdc_abi.abi,
        provider
    );

    const balance = await constractUSDC.balanceOf(accounts[0]);

    setBalanceUSDC(balance.toString());

    const trading = new ethers.Contract(
        TRADING_GOERLI_ADDRESS,
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
        if (chainId !== ARBITRUM_GOERLI_CONFIGURATION.chainId) {
            window.location.reload();
        }
    });
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
};
