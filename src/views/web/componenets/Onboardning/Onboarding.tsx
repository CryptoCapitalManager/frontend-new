import { FC, useState } from "react";

import Welcome from "./Welcome/Welcome";
import Navbar from "./Navbar/Navbar";
import Deposit from "./Deposit/Deposit";

import "./Onboarding.scss";

import { onboardingProps } from "../../../../utils/props";
import { Navigate } from "react-router-dom";

const Onboarding: FC<onboardingProps> = ({
    displayAddress,
    setToCalc,
    balanceUSDC,
    hasInvested,
}) => {
    return (
        <div className="onboarding-web">
            <Navbar displayAddress={displayAddress} />
            {displayAddress === "Connect" ? (
                <Welcome setToCalc={setToCalc} />
            ) : hasInvested ? (
                <Navigate to={"/dashboard"} />
            ) : (
                <Deposit balanceUSDC={balanceUSDC} />
            )}
        </div>
    );
};

export default Onboarding;
