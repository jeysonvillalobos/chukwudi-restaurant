import React, { Component } from 'react';
import { message } from 'antd';

import burger from '../assets/icons/1046784.svg';
import whiteClock from '../assets/icons/whiteClock.svg';
import whiteShortRightArrow from '../assets/icons/whiteShortRightArrow.svg';

class Categories extends Component {

    delivertyTime(){
        message.warning('Delivery time cannot be changed at this time.');
    }

    render(){
        return(
            <div className="categories">
                <h1>
                    Restaurants
                    <span className="burger">
                        <img className="burger" src={burger} alt="hat" width='25px'/>
                    </span>
                </h1>

                <div className="delivery-time"onClick={ this.delivertyTime.bind(this) }>
                    <img src={whiteClock} className="clock" alt="clock"/>
                    <p>Delivery:<span className="time"> Now</span></p>
                    <img className="shortRightArrow" src={whiteShortRightArrow} alt="hat"/>
                </div>
            </div>
        );
    }
}

export default Categories;