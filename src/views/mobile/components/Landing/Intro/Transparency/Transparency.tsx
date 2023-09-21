import { FC } from "react";

import "./Transparency.scss";

import Table from "./Table/Table";

import { transparencyProps } from "../../../../../../utils/props";

const Transparency: FC<transparencyProps> = ({ data, windowDimensions }) => {
    return (
        <div className="transparency-mobile">
            <div className="container-mobile">
                <div className="text-mobile">
                    <p id="title-mobile">Our trades</p>
                    <p id="header-mobile">
                        Transparent & trustless track record
                    </p>
                </div>
                <Table data={data} windowDimensions={windowDimensions} />
            </div>
        </div>
    );
};

export default Transparency;
