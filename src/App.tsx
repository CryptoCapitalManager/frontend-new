import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

import "./App.scss";

import Web from "./views/web/Web";
import Mobile from "./views/mobile/Mobile";

const App = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="App">
            {isMobile ? <Mobile /> : <Web windowWidth={windowWidth} />}
        </div>
    );
};

export default App;
