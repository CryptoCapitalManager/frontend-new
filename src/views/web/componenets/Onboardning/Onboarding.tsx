import { FC, useEffect, useRef, useState } from "react";

import Welcome from "./Welcome/Welcome";
import Navbar from "./Navbar/Navbar";
import Deposit from "./Deposit/Deposit";

import "./Onboarding.scss";

import loading from "../../../../res/svg/loading-animation.svg";

import { onboardingProps } from "../../../../utils/props";
import { Navigate } from "react-router-dom";

const Onboarding: FC<onboardingProps> = ({
    signer,
    windowWidth,
    dataLoaded,
    displayAddress,
    setToCalc,
    balanceUSDC,
    hasInvested,
}) => {
    const [pageDimensions, setPageDimensions] = useState({
        width: 0,
        height: 0,
    });
    const pageRef = useRef<any>(null);

    useEffect(() => {
        if (pageRef.current) {
            setPageDimensions({
                width: pageRef.current.offsetWidth,
                height: pageRef.current.offsetHeight,
            });
        }
    }, [windowWidth]);

    return (
        <div className="onboarding-web" ref={pageRef}>
            <Navbar displayAddress={displayAddress} />
            {!dataLoaded ? (
                <div
                    className="loading-animation-container"
                    style={{
                        width: pageDimensions.width,
                        height: pageDimensions.height,
                    }}
                >
                    <img src={loading} id="loading-animation" />
                </div>
            ) : displayAddress === "Connect" ? (
                <Welcome setToCalc={setToCalc} />
            ) : hasInvested ? (
                <Navigate to={"/dashboard"} />
            ) : (
                <Deposit signer={signer} balanceUSDC={balanceUSDC} />
            )}
        </div>
    );
};

export default Onboarding;
