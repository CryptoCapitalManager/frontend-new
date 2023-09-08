import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

import "./App.scss";

import Web from "./views/web/Web";
import Mobile from "./views/mobile/Mobile";

const App = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const ref = useRef<any>(null);
    const [appHeight, setAppHeigh] = useState<number>(0);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (ref.current) {
            setAppHeigh(ref.current.clientHeight);
        }
    }, [windowWidth]);

    return (
        <div className="App" ref={ref}>
            {isMobile ? (
                <Mobile />
            ) : (
                <Web appHeight={appHeight} windowWidth={windowWidth} />
            )}
        </div>
    );
};

export default App;
