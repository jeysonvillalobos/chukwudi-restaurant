import React, { Component } from 'react';
import { message } from 'antd';

import seeker from '../assets/icons/126474.svg';



class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalLogin:false,
        };
    }

    showSectionOrder(){
        this.props.togleSectionOrder();
    }

    inputMessage(){
        message.warning('The search function is not available at this time.');
    }


    render(){
        return(
            <header className="bodyHeader">
                <div className="groupDivHeader">
                    <div className="two-lines">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <h4 className="headerTitle">Chukwudi</h4>
                </div>
                <div className="input" onClick={ this.inputMessage.bind(this) }>
                    <img src={seeker} alt="right arrow" width='20px'/>
                    <input type="text" className="inputSearch" placeholder="Search"/>
                </div>
                <div className="more" onClick={this.showSectionOrder.bind(this)}></div>
            </header>
        );
    }

}

export default Header;