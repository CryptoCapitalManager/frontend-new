import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

const Mobile = () => {
    return (
        <BrowserRouter basename="frontend-new">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/notice" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Mobile;
