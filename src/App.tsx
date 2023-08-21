import { useEffect, useState } from "react";

import "./App.scss";

import Web from "./views/web/Web";
import Mobile from "./views/mobile/Mobile";

const App = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <div className="App">{width > 1350 ? <Web /> : <Mobile />}</div>;
};

export default App;
