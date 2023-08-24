import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

const Mobile = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Mobile;
