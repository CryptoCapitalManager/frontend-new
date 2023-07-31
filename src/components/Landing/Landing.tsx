import React, { useRef } from "react";

import Navbar from "./Navbar/Navbar";
import Tag from "./Tag/Tag";
import Intro from "./Intro/Intro";
import Footer from "./Footer/Footer";

import "./Landing.scss";

const Landing = () => {
    const how = useRef(null);
    const about = useRef(null);

    const scrollToSection = (ref: React.MutableRefObject<any>) => {
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: "smooth",
        });
    };

    return (
        <div className="Landing">
            <Navbar scrollToSection={scrollToSection} how={how} about={about} />
            <Tag />
            <Intro how={how} about={about} />
            <Footer />
        </div>
    );
};

export default Landing;
