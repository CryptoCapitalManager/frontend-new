import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

import "./App.scss";

import Web from "./views/web/Web";
import Mobile from "./views/mobile/Mobile";

const App = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: 0,
        height: 0,
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

    return (
        <div className="App">
            {isMobile ? (
                <Mobile />
            ) : (
                <Web windowDimensions={windowDimensions} />
            )}
        </div>
    );
};

export default App;
