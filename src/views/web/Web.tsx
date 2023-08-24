import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Landing from "./componenets/Landing/Landing";

const Web = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Web;
