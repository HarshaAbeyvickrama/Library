import React, {FC} from "react";
import WelcomeImage from "../../assets/img/hero.jpg";

const Welcome: FC = () => {
    return (
        <React.Fragment>
            <h1 className="page-title py-2 fs-">My Library</h1>
            <img src={WelcomeImage} className="img-fluid" alt="hero"/>
            <h5 className="photo-credits pe-md-5 pe-2 py-md-1 py-1">
                Photo by
                <a
                    href="https://unsplash.com/@annahunko?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                    {" "}Anna Hunko
                </a> on{" "}
                <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                    Unsplash
                </a>
            </h5>
        </React.Fragment>
    );
}

export default Welcome;
