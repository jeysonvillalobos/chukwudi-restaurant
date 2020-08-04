import React, { Component } from 'react';


import star from '../assets/icons/149220.svg';

class Foods extends Component {

    addToCart(data){
        this.props.addToCart(data);
    }

    render(){
        return(
            <div className="foods">

                {
                    this.props.products.map(data => (
                        <div key={ data.id } className="food" onClick={ this.addToCart.bind(this,data) }>
                            <div className="foodImg" style={{backgroundImage:`url('${data.image}')`}}>
                                <div className="travelTime">
                                    <p>{data.time}</p>
                                </div>
                            </div>
                            <div className="foodDescription">
                                <h4>{data.name}</h4>
                                <div className="puntation">
                                    <img className="star" src={star} alt="icon"/>
                                    <span>{data.qualification}</span>
                                    <span>{data.type}</span>
                                    <span>{data.category}</span>
                                    <span>${data.price}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }

                



            </div>
        );
    }

}

export default Foods;