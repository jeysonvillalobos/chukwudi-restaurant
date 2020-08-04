import React from 'react';

import hat from '../assets/images/d.png';

const Banner = () => (
    <div className="banner">
        <div className="banner-img"></div>
        <div className="banner-text">
            <h1>
                $0 delivery for 30 days!
                <span className="hat">
                    <img className="hatIcon" src={hat} alt="hat"/>
                </span>
            </h1>
            <p>$0 delivery free for orders over $10 for 30 days</p>
        </div>
        <div className="banner-more">
            <a href="https://imaginamos.com/">Learn more →</a>
        </div>
    </div>
);

export default Banner;