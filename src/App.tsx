import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

import "./App.scss";

import Web from "./views/web/Web";
import Mobile from "./views/mobile/Mobile";

const App = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        console.log(windowDimensions);
    }, [windowDimensions]);

    return (
        <div className="App">
            {isMobile ? (
                <Mobile windowDimensions={windowDimensions} />
            ) : (
                <Web windowDimensions={windowDimensions} />
            )}
        </div>
    );
};

export default App;
