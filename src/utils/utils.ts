import React from "react";
import { Provider, ethers } from "ethers";

import {
    ARBITRUM_GOERLI_CONFIGURATION,
    ARBITRUM_GOERLI_USDC_ADDRESS,
} from "./const";

import usdc_abi from "../abi/usdc_goerli.json";

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
    setAddress: React.Dispatch<string>,
    setProvider: React.Dispatch<React.SetStateAction<Provider | undefined>>,
    setBalanceUSDC: React.Dispatch<React.SetStateAction<string>>,
    setInvestedAmount: React.Dispatch<React.SetStateAction<string>>
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
        return;
    }

    // Get current chainID
    const chainId: any = await metamask.request({ method: "eth_chainId" });

    // Check chainID
    if (chainId !== ARBITRUM_GOERLI_CONFIGURATION.chainId) {
        return;
    }

    const proviver = new ethers.BrowserProvider(metamask);

    setProvider(proviver);
    setAddress(
        `0x${accounts[0].slice(2, 5).toUpperCase()}...${accounts[0]
            .slice(accounts[0].length - 4)
            .toUpperCase()}`
    );

    const constractUSDC = new ethers.Contract(
        ARBITRUM_GOERLI_USDC_ADDRESS,
        usdc_abi.abi,
        proviver
    );

    const balance = await constractUSDC.balanceOf(accounts[0]);

    setBalanceUSDC(balance.toString());

    // TODO: Calculate how much a user invested
    setInvestedAmount("0");
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
    connectToWallet,
    metamaskConnectionCheck,
    metamaskListener,
};
