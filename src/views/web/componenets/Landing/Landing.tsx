import React, { useEffect, useRef, useState } from "react";

import Navbar from "./Navbar/Navbar";
import Tag from "./Tag/Tag";
import Intro from "./Intro/Intro";
import Footer from "./Footer/Footer";

import "./Landing.scss";

import { tradingPairDTO, tradingPairDataDTO } from "../../../../utils/dto";

import mock from "../../../../res/mock.json";

const Landing = () => {
    const how = useRef(null);
    const about = useRef(null);
    const [data, setData] = useState<tradingPairDTO[]>([]);

    const scrollToSection = (ref: React.MutableRefObject<any>) => {
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: "smooth",
        });
    };

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
        <div className="Landing">
            <Navbar scrollToSection={scrollToSection} how={how} about={about} />
            <Tag />
            <Intro how={how} about={about} data={data} />
            <Footer />
        </div>
    );
};

export default Landing;
