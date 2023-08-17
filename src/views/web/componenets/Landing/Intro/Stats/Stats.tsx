import "./Stats.scss";

const Stats = () => {
    return (
        <div className="Stats">
            <div className="stats">
                <div className="stat">
                    <p id="numbers">80%</p>
                    <p id="description">average yearly ROI</p>
                </div>
                <div className="stat">
                    <p id="numbers">1000+</p>
                    <p id="description">Returning investors</p>
                </div>
                <div className="stat">
                    <p id="numbers">$14M</p>
                    <p id="description">Managed assets</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;
