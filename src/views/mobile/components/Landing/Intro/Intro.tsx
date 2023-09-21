import { FC } from "react";

import "./Intro.scss";

import Calculator from "./Calculator/Calculator";
import Story from "./Story/Story";
import Transparency from "./Transparency/Transparency";
import Header from "./Header/Header";
import Us from "./Us/Us";
import Stats from "./Stats/Stats";
import How from "./How/How";

import { introMobileProps } from "../../../../../utils/props";
import Comparison from "./Comparison/Comparison";

const Intro: FC<introMobileProps> = ({ windowDimensions, data }) => {
    return (
        <div className="intro-mobile">
            <Header />
            <Us />
            <How />
            <Comparison />
            <Stats />
            <Transparency data={data} windowDimensions={windowDimensions} />
            <Story />
            <Calculator data={data} windowDimensions={windowDimensions} />
        </div>
    );
};

export default Intro;
