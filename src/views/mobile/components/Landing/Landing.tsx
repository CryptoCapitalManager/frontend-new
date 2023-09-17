import { useEffect, useState } from "react";

import "./Landing.scss";

import Intro from "./Intro/Intro";
import Footer from "./Footer/Footer";

import { tradingPairDTO, tradingPairDataDTO } from "../../../../utils/dto";
import mock from "../../../../res/mock.json";
import Navbar from "../Dashboard/Navbar/Navbar";

const Landing = () => {
    const [data, setData] = useState<tradingPairDTO[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                "https://investiva-test-api.onrender.com/data/trades"
            );
            const data = (await result.json()) as tradingPairDataDTO;

            setData(data.messages);
        };

        fetchData().catch(() => {
            setData((mock as tradingPairDataDTO).messages);
        });
    }, []);

    return (
        <div className="landing-mobile">
            <Navbar />
            <Intro data={data} />
            <Footer />
        </div>
    );
};

export default Landing;
