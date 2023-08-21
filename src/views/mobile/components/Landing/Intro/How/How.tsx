import { useState } from "react";

import "./How.scss";

import illustration_1 from "../../../../../../res/svg/first-step.svg";
import illustration_2 from "../../../../../../res/svg/second-step.svg";
import illustration_3 from "../../../../../../res/svg/third-step.svg";

const How = () => {
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
                break;
            case 2:
                setFirstSelection("unselected");
                setSecondSelection("selected");
                setThirdSelection("unselected");
                break;
            case 3:
                setFirstSelection("unselected");
                setSecondSelection("unselected");
                setThirdSelection("selected");
                break;
        }
    };

    return (
        <div className="how-mobile">
            <p id="question-header-mobile">How it works</p>
            <div className="container-mobile">
                <div
                    className="element"
                    id={firstSelection}
                    onClick={() => {
                        handleOptionSelection(1);
                    }}
                >
                    <p id="number-mobile">01</p>
                    <div className="line-mobile"></div>
                    <p id="description-mobile">
                        Client deposits USDC to smart
                        <br />
                        contract
                    </p>
                    <img src={illustration_1} alt="Protocol step" />
                </div>
                <div
                    className="element"
                    id={secondSelection}
                    onClick={() => {
                        handleOptionSelection(2);
                    }}
                >
                    <p id="number-mobile">02</p>
                    <div className="line-mobile"></div>
                    <p id="description-mobile">
                        Asset manager interacts with
                        <br />
                        smart contract and tells it what
                        <br />
                        to swap
                    </p>
                    <img src={illustration_2} alt="Protocol step" />
                </div>
                <div
                    className="element"
                    id={thirdSelection}
                    onClick={() => {
                        handleOptionSelection(3);
                    }}
                >
                    <p id="number-mobile">03</p>
                    <div className="line-mobile"></div>
                    <p id="description-mobile">
                        Swap is made on a DEX and funds
                        <br />
                        are available to the client at any
                        <br />
                        time
                    </p>
                    <img src={illustration_3} alt="Protocol step" />
                </div>
            </div>
        </div>
    );
};

export default How;
