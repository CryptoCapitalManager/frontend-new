import React from "react";
import { tradingPairDTO } from "./dto";
import { JsonRpcSigner, Provider } from "ethers";

interface webProps {
    windowWidth: number;
}

interface landingProps {
    toCalc: boolean;
    setToCalc: React.Dispatch<React.SetStateAction<boolean>>;
    windowWidth: number;
}

interface navbarProps {
    scrollToSection: (ref: React.MutableRefObject<any>) => void;
    how: React.MutableRefObject<null>;
    about: React.MutableRefObject<null>;
}

interface introWebProps {
    how: React.MutableRefObject<null>;
    about: React.MutableRefObject<null>;
    data: tradingPairDTO[];
}

interface introMobileProps {
    data: tradingPairDTO[];
}

interface howProps {
    how: React.MutableRefObject<null>;
}

interface storyProps {
    about: React.MutableRefObject<null>;
}

interface calculatorProps {
    data: tradingPairDTO[];
}

interface transparencyProps {
    data: tradingPairDTO[];
}

interface tableProps {
    data: tradingPairDTO[];
}

interface onboardingProps {
    windowWidth: number;
    dataLoaded: boolean;
    displayAddress: string;
    setToCalc: React.Dispatch<React.SetStateAction<boolean>>;
    balanceUSDC: string;
    hasInvested: boolean;
}

interface onboardingNavbarProps {
    displayAddress: string;
}

interface welcomeProps {
    setToCalc: React.Dispatch<React.SetStateAction<boolean>>;
}

interface depositProps {
    balanceUSDC: string;
}

interface dashboardProps {
    windowWidth: number;
    signer: JsonRpcSigner | undefined;
    address: string;
    displayAddress: string;
    balanceUSDC: string;
    hasInvested: boolean;
}

interface investProps {
    signer: JsonRpcSigner | undefined;
    dashboardHeight: number;
    balanceUSDC: string;
    setInvestVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface withdrawProps {
    signer: JsonRpcSigner | undefined;
    address: string;
    dashboardHeight: number;
    investedAmount: string;
    setWithdrawVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface transactionsTableProps {
    windowWidth: number;
    userTrades: tradingPairDTO[];
}

export {
    type webProps,
    type landingProps,
    type navbarProps,
    type introWebProps,
    type introMobileProps,
    type howProps,
    type storyProps,
    type calculatorProps,
    type transparencyProps,
    type tableProps,
    type onboardingProps,
    type onboardingNavbarProps,
    type depositProps,
    type welcomeProps,
    type dashboardProps,
    type investProps,
    type withdrawProps,
    type transactionsTableProps,
};
