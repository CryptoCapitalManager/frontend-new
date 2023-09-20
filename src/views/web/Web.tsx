import { FC, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { JsonRpcSigner, Provider } from "ethers";

import Landing from "./componenets/Landing/Landing";
import Onboarding from "./componenets/Onboardning/Onboarding";
import Dashboard from "./componenets/Dashboard/Dashboard";

import { webProps } from "../../utils/props";

import { metamaskConnectionCheck, metamaskListener } from "../../utils/utils";

const Web: FC<webProps> = ({ windowWidth: width }) => {
    const [toCalc, setToCalc] = useState<boolean>(false);

    const [dataLoaded, setDataLoaded] = useState<boolean>(false);
    const [signer, setSigner] = useState<JsonRpcSigner>();
    const [address, setAddress] = useState<string>("");
    const [displayAddress, setDisplayAddress] = useState<string>("Connect");
    const [balanceUSDC, setBalanceUSDC] = useState<string>("0");
    const [hasInvested, setHasInvested] = useState<boolean>(false);

    useEffect(() => {
        metamaskConnectionCheck(
            setDataLoaded,
            setAddress,
            setDisplayAddress,
            setSigner,
            setBalanceUSDC,
            setHasInvested
        );
        metamaskListener();
    }, []);

    return (
        <BrowserRouter basename="frontend-new">
            <Routes>
                <Route
                    path="/"
                    element={
                        <Landing
                            toCalc={toCalc}
                            setToCalc={setToCalc}
                            windowWidth={width}
                        />
                    }
                />
                <Route
                    path="/onboarding"
                    element={
                        <Onboarding
                            signer={signer}
                            windowWidth={width}
                            dataLoaded={dataLoaded}
                            displayAddress={displayAddress}
                            setToCalc={setToCalc}
                            balanceUSDC={balanceUSDC}
                            hasInvested={hasInvested}
                        />
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard
                            windowWidth={width}
                            signer={signer}
                            address={address}
                            displayAddress={displayAddress}
                            balanceUSDC={balanceUSDC}
                            hasInvested={hasInvested}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Web;
