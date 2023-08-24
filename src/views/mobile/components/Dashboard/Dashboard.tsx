import "./Dashboard.scss";

import Navbar from "./Navbar/Navbar";

const Dashboard = () => {
    return (
        <div className="dashboard-mobile">
            <Navbar />
            <div className="container-mobile">
                <p id="text">
                    Explore the complete DApp experience on your PC! Please be
                    aware that our DApp is exclusively available on desktop,
                    ensuring an optimized and seamless user experience.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
