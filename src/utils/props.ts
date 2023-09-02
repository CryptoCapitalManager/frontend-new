import React from "react";
import { tradingPairDTO } from "./dto";
import { Provider } from "ethers";

interface landingProps {
    toCalc: boolean;
    setToCalc: React.Dispatch<React.SetStateAction<boolean>>;
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
    address: string;
    setToCalc: React.Dispatch<React.SetStateAction<boolean>>;
    balanceUSDC: string;
}

interface onboardingNavbarProps {
    address: string;
}

interface welcomeProps {
    setToCalc: React.Dispatch<React.SetStateAction<boolean>>;
}

interface depositProps {
    balanceUSDC: string;
}

interface dashboardProps {
    wallet: Provider | undefined;
    address: string;
}

export {
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
};
