import { FC } from "react";

import Header from "./Header/Header";
import Us from "./Us/Us";
import How from "./How/How";
import Comparison from "./Comparison/Comparison";
import Stats from "./Stats/Stats";
import Transparency from "./Transparency/Transparency";
import Story from "./Story/Story";
import Calculator from "./Calculator/Calculator";

import "./Intro.scss";

import { introWebProps } from "../../../../../utils/props";

const Intro: FC<introWebProps> = ({ how, about, data }) => {
    return (
        <div className="intro-web">
            <Header />
            <Us />
            <How how={how} />
            <Comparison />
            <Stats />
            <Transparency data={data} />
            <Story about={about} />
            <Calculator data={data} />
        </div>
    );
};

export default Intro;
