import { FC, useState } from "react";

import Welcome from "./Welcome/Welcome";
import Navbar from "./Navbar/Navbar";
import Deposit from "./Deposit/Deposit";

import "./Onboarding.scss";

import { onboardingProps } from "../../../../utils/props";
import { Navigate } from "react-router-dom";

const Onboarding: FC<onboardingProps> = ({
    address,
    setToCalc,
    balanceUSDC,
}) => {
    // Use later to see if user invested in the platform
    const [hasInvested, setHasInvested] = useState(false);

    return (
        <div className="onboarding-web">
            <Navbar address={address} />
            {address === "Connect" ? (
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
