import "./Tag.scss";

import tag from "../../../../../res/svg/tag.svg";
import { Link } from "react-router-dom";

const Tag = () => {
    return (
        <div className="tag-web">
            <Link id="tag-web" to="https://attic42.com" target="_blank">
                <img src={tag} alt="Powered by Attic42" />
            </Link>
        </div>
    );
};

export default Tag;
