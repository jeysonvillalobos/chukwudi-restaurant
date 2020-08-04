import React, { Component } from 'react';

import shortRightArrow from '../assets/icons/118740.svg';

class Types extends Component {

    state = {
        selected:1
    }

    selected(el){
        this.setState({
            selected:el
        });
    }

    render(){
        return(
            <div className="types">
                <div className="group-type">
                    {
                        this.props.categories.map(data => (
                            <div key={ data.id } className="type" 
                            style={ this.state.selected === data.id ? { backgroundColor:'#ffd644' } : { backgroundColor:'white' }  }
                            onClick={ this.selected.bind(this,data.id) }
                            >
                                <div className="circleType">
                                    <img src={data.icon} alt="hat" width='25px'/>
                                </div>
                                <span>{ data.name }</span>
                            </div>
                        ))
                    }
                </div>
                <div className="arrowNextDiv">
                    <img className="arrowNextIcon" src={shortRightArrow} alt="icon"/>
                </div>
            </div>
        );
    }

}

export default Types;