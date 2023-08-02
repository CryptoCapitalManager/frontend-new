import { FC, useState } from "react";

import "./How.scss";

import first from "../../../../res/svg/first-step.svg";
import second from "../../../../res/svg/second-step.svg";
import third from "../../../../res/svg/third-step.svg";

import { howProps } from "../../../../utils/props";

const How: FC<howProps> = ({ how }) => {
    const [illustration, setIllustration] = useState<string>(first);

    const [firstSelection, setFirstSelection] = useState<string>("selected");
    const [secondSelection, setSecondSelection] =
        useState<string>("unselected");
    const [thirdSelection, setThirdSelection] = useState<string>("unselected");

    const handleOptionSelection = (option: number) => {
        switch (option) {
            case 1:
                setFirstSelection("selected");
                setSecondSelection("unselected");
                setThirdSelection("unselected");
                setIllustration(first);
                break;
            case 2:
                setFirstSelection("unselected");
                setSecondSelection("selected");
                setThirdSelection("unselected");
                setIllustration(second);
                break;
            case 3:
                setFirstSelection("unselected");
                setSecondSelection("unselected");
                setThirdSelection("selected");
                setIllustration(third);
                break;
        }
    };

    return (
        <div className="How" ref={how}>
            <div className="container">
                <p id="header">How it works</p>
                <img src={illustration} alt="Protocol step" />
            </div>
            <div className="options">
                <div
                    className="option"
                    id={firstSelection}
                    onClick={() => {
                        handleOptionSelection(1);
                    }}
                >
                    <p id="number">01</p>
                    <div className="line"></div>
                    <p id="description">
                        Client deposits USDC to smart
                        <br />
                        contract
                    </p>
                </div>
                <div
                    className="option"
                    id={secondSelection}
                    onClick={() => {
                        handleOptionSelection(2);
                    }}
                >
                    <p id="number">02</p>
                    <div className="line"></div>
                    <p id="description">
                        Asset manager interacts with smart
                        <br />
                        contract and tells it what position to open
                    </p>
                </div>
                <div
                    className="option"
                    id={thirdSelection}
                    onClick={() => {
                        handleOptionSelection(3);
                    }}
                >
                    <p id="number">03</p>
                    <div className="line"></div>
                    <p id="description">
                        Position is open on a DEX and funds are
                        <br />
                        available to the client at any time{" "}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default How;
