import React, { FC, useEffect, useRef, useState } from "react";

import Navbar from "./Navbar/Navbar";
import Tag from "./Tag/Tag";
import Intro from "./Intro/Intro";
import Footer from "./Footer/Footer";

import MiniLanding from "../../../mobile/components/Landing/Landing";

import "./Landing.scss";

import { tradingPairDTO, tradingPairDataDTO } from "../../../../utils/dto";

import { landingProps } from "../../../../utils/props";

const Landing: FC<landingProps> = ({ toCalc, setToCalc, windowDimensions }) => {
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
            setData([]);
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

    return windowDimensions.width < 1360 ? (
        <div className="landing-web-mini">
            <MiniLanding windowDimensions={windowDimensions} />
        </div>
    ) : (
        <div className="landing-web">
            <Navbar scrollToSection={scrollToSection} how={how} about={about} />
            <Tag />
            <Intro
                windowDimensions={windowDimensions}
                how={how}
                about={about}
                data={data}
            />
            <Footer />
        </div>
    );
};

export default Landing;
