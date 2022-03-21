import React from "react";
import logo from '../assets/img/404.gif';

const Four0Four: React.FC = () => {
    return (
        <body>
        <section className="overviewLayout">
            <div className="contentSection">
                <div className="center">
                    <img src={logo}/>
                    <h1>404</h1>
                    <h3 className="second-txt">Looks Like You're Lost in Space</h3>
                    <p>The page you are looking for is not available</p>
                    <a href="/" className="return-btn">Go Back</a>
                </div>
            </div>
        </section>
        </body>
    )
}

export default Four0Four;
