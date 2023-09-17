import React from "react";
import { tradingPairDTO } from "./dto";
import { Provider } from "ethers";

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
    wallet: Provider | undefined;
    address: string;
    displayAddress: string;
    balanceUSDC: string;
    hasInvested: boolean;
}

interface investProps {
    dashboardHeight: number;
    balanceUSDC: string;
    setInvestVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface withdrawProps {
    dashboardHeight: number;
    investedAmount: string;
    setWithdrawVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface transactionsTableProps {
    windowWidth: number;
    earliestDate: Date;
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
