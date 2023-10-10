import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FC } from "react";

import { mobileProps } from "../../utils/props";

import MiniLanding from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

const Mobile: FC<mobileProps> = ({ windowDimensions }) => {
    return (
        <BrowserRouter basename="frontend-new">
            <Routes>
                <Route
                    path="/"
                    element={
                        <MiniLanding windowDimensions={windowDimensions} />
                    }
                />
                <Route path="/notice" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Mobile;
