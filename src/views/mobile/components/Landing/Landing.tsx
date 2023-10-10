import { FC, useEffect, useState } from "react";

import "./Landing.scss";

import Intro from "./Intro/Intro";
import Footer from "./Footer/Footer";

import { tradingPairDTO, tradingPairDataDTO } from "../../../../utils/dto";
import mock from "../../../../res/mock.json";
import { mobileLandingProps } from "../../../../utils/props";
import Navbar from "./Navbar/Navbar";

const MiniLanding: FC<mobileLandingProps> = ({ windowDimensions }) => {
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
            <Intro windowDimensions={windowDimensions} data={data} />
            <Footer />
        </div>
    );
};

export default MiniLanding;
