import React, { FC, useEffect, useRef, useState } from "react";

import Navbar from "./Navbar/Navbar";
import Tag from "./Tag/Tag";
import Intro from "./Intro/Intro";
import Footer from "./Footer/Footer";

import "./Landing.scss";

import { tradingPairDTO, tradingPairDataDTO } from "../../../../utils/dto";

import mock from "../../../../res/mock.json";
import { landingProps } from "../../../../utils/props";

const Landing: FC<landingProps> = ({ toCalc, setToCalc }) => {
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

    useEffect(() => {
        if (toCalc) {
            const location = document.getElementsByClassName("calculator-web");
            if (location) {
                location[0].scrollIntoView({ behavior: "smooth" });
                setToCalc(false);
            }
        }
    }, [toCalc]);

    return (
        <div className="landing-web">
            <Navbar scrollToSection={scrollToSection} how={how} about={about} />
            <Tag />
            <Intro how={how} about={about} data={data} />
            <Footer />
        </div>
    );
};

export default Landing;
