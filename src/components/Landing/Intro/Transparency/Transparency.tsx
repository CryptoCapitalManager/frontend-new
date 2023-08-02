import "./Transparency.scss";

import Table from "./Table/Table";
import { transparencyProps } from "../../../../utils/props";
import { FC } from "react";

const Transparency: FC<transparencyProps> = ({ data }) => {
    return (
        <div className="Transparency">
            <div className="container">
                <div className="text">
                    <p id="title">Our trades</p>
                    <p id="header">
                        Transparent &<br />
                        trustless track record
                    </p>
                </div>
                <Table data={data} />
            </div>
        </div>
    );
};

export default Transparency;
