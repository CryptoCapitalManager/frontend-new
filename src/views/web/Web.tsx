import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "ethers";

import Landing from "./componenets/Landing/Landing";
import Onboarding from "./componenets/Onboardning/Onboarding";
import Dashboard from "./componenets/Dashboard/Dashboard";

import { metamaskConnectionCheck, metamaskListener } from "../../utils/utils";

const Web = () => {
    const [toCalc, setToCalc] = useState<boolean>(false);

    const [provider, setProvider] = useState<Provider>();
    const [address, setAddress] = useState<string>("Connect");
    const [balanceUSDC, setBalanceUSDC] = useState<string>("0");

    useEffect(() => {
        metamaskConnectionCheck(setAddress, setProvider, setBalanceUSDC);
        metamaskListener();
    }, []);

    return (
        <BrowserRouter basename="frontend-new">
            <Routes>
                <Route
                    path="/"
                    element={<Landing toCalc={toCalc} setToCalc={setToCalc} />}
                />
                <Route
                    path="/onboarding"
                    element={
                        <Onboarding
                            address={address}
                            setToCalc={setToCalc}
                            balanceUSDC={balanceUSDC}
                        />
                    }
                />
                <Route
                    path="/dashboard"
                    element={<Dashboard wallet={provider} address={address} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Web;
