import "./Stats.scss";

const Stats = () => {
    return (
        <div className="stats-main-web">
            <div className="stats-web">
                <div className="stat-web">
                    <p id="numbers-web">80%</p>
                    <p id="description-web">average yearly ROI</p>
                </div>
                <div className="stat-web">
                    <p id="numbers-web">1000+</p>
                    <p id="description-web">Returning investors</p>
                </div>
                <div className="stat-web">
                    <p id="numbers-web">$14M</p>
                    <p id="description-web">Managed assets</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;
