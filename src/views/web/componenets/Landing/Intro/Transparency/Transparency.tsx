import { FC } from "react";

import "./Transparency.scss";

import Table from "./Table/Table";

import { transparencyProps } from "../../../../../../utils/props";

const Transparency: FC<transparencyProps> = ({ windowDimensions, data }) => {
    return (
        <div className="transparency-web">
            <div className="container-web">
                <div className="text-web">
                    <p id="title-web">Our trades</p>
                    <p id="header-web">
                        Transparent &<br />
                        trustless track record
                    </p>
                </div>
                <Table data={data} windowDimensions={windowDimensions} />
            </div>
        </div>
    );
};

export default Transparency;
