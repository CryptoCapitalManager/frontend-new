import "./Transparency.scss";
import mock from "../../../../res/svg/mock-table.svg";

const Transparency = () => {
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
                <div className="table">
                    <img src={mock} alt="Mock table data" />
                </div>
            </div>
        </div>
    );
};

export default Transparency;
