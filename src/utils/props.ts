import React from "react";
import { tradingPairDTO } from "./dto";
import { JsonRpcSigner } from "ethers";

interface webProps {
    windowDimensions: windowDimensions;
}

interface mobileProps {
    windowDimensions: windowDimensions;
}

interface windowDimensions {
    width: number;
    height: number;
}

interface landingProps {
    toCalc: boolean;
    setToCalc: React.Dispatch<React.SetStateAction<boolean>>;
    windowDimensions: windowDimensions;
}

interface mobileLandingProps {
    windowDimensions: windowDimensions;
}

interface navbarProps {
    scrollToSection: (ref: React.MutableRefObject<any>) => void;
    how: React.MutableRefObject<null>;
    about: React.MutableRefObject<null>;
}

interface introWebProps {
    windowDimensions: windowDimensions;
    how: React.MutableRefObject<null>;
    about: React.MutableRefObject<null>;
    data: tradingPairDTO[];
}

interface introMobileProps {
    data: tradingPairDTO[];
    windowDimensions: windowDimensions;
}

interface howProps {
    how: React.MutableRefObject<null>;
}

interface storyProps {
    about: React.MutableRefObject<null>;
}

interface calculatorProps {
    data: tradingPairDTO[];
    windowDimensions: windowDimensions;
}

interface transparencyProps {
    data: tradingPairDTO[];
    windowDimensions: windowDimensions;
}

interface tableProps {
    data: tradingPairDTO[];
    windowDimensions: windowDimensions;
}

interface onboardingProps {
    signer: JsonRpcSigner | undefined;
    windowDimensions: windowDimensions;
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
    signer: JsonRpcSigner | undefined;
    balanceUSDC: string;
}

interface dashboardProps {
    windowDimensions: windowDimensions;
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
    windowDimensions: windowDimensions;
    userTrades: tradingPairDTO[];
}

export {
    type webProps,
    type mobileProps,
    type mobileLandingProps,
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
