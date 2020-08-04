import React, { Component,Fragment } from 'react';
import { Modal,Button,Drawer,Table,message } from 'antd';

import yellowClock from '../assets/icons/yellowClock.svg';
import face from '../assets/images/face.png';
import rightArrow from '../assets/icons/109617.svg';
import car from '../assets/icons/car.svg';

class Order extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalLogin:false,
            modalCheckout:false,
            total:0,
            persons:1,
            quantity:0
        };
    }

    componentDidUpdate(prevProps){
        if (this.props.cart !== prevProps.cart) {
            let totalPrice = this.props.cart.reduce((ac,el) => ac + el.price,0);
            let quantityProducts = this.props.cart.length;
            this.setState({
                total:totalPrice,
                quantity:quantityProducts
            });
        }
    }

    showModalLogin(){
        this.setState(state => ({
            modalLogin: !state.modalLogin
        }));
    }

    closeSectionOrder(){
        this.props.togleSectionOrder();
    }

    onAuth(){
        this.props.onAuth();
    }

    onLogout(){
        this.setState(state => ({ modalLogin: !state.modalLogin }));
        this.props.onLogout();
        message.success('Bye.');
    }

    checkout(){
        this.setState(state => ({
            modalCheckout: !state.modalCheckout
        }));
    }

    min(){
        if(this.state.persons === 0) return;
         this.setState(state => ({ persons:state.persons - 1 }));
    }
    sum(){
        this.setState(state => ({ persons:state.persons + 1 }));
    }

    buy(){
        this.setState(state => ({ modalCheckout: !state.modalCheckout }));
        this.props.buy();
    }

    error(type){
        if(type=== 'edit') message.error('The address cannot be edited.');
        if(type=== 'chooseTime') message.error('Time cannot be changed.');
    }

    render() {
        var renderLogin = '';
        var renderCheckout = '';

        if(this.props.user !== null)
        {
            var { displayName,email,photoURL } = this.props.user;
            renderLogin = (
                <div className="logged" onClick={this.showModalLogin.bind(this)}>
                    <span>{ displayName.split(' ')[0] }</span>
                    <img src={ photoURL } className="user" alt="user" />  
                </div>
            );
            renderCheckout = (
                <div className="buy">
                    <span className="buy-total">Total: ${this.state.total}</span>
                    { this.state.total > 0 ? <Button onClick={this.buy.bind(this)} type="primary" className="buyButton" >Buy</Button> : '' }
                </div>
            );
        }
        else{
            renderLogin = (<Button type="text" className="orderLogin" onClick={this.onAuth.bind(this)}>Login with Google</Button>);
            renderCheckout = ( <Button type="default" className="checkoutButton" onClick={this.onAuth.bind(this)}>Login with Google</Button>);
        }
          
        const columns = [
            {
                title: 'Image',
                dataIndex: 'image',
                key:'image',
                render:theImageURL => <img alt={theImageURL} src={theImageURL} width='200px'/> 
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
        ];

        
        return (
            <Fragment>
            <div className="section-order-container">
                <header className="orderHeader">
                     <div className="back" onClick={ this.closeSectionOrder.bind(this) }>
                        <img className="backArrow" src={rightArrow} alt="" width='25px'/>
                     </div>
                     <div className="otherButtons">
                         { renderLogin }
                        <div className="quantityProducts">
                            <span>{this.state.quantity}</span>
                        </div>
                    </div>
                </header>
                <div className="orderBody">
                    <div className="orderTitle">
                        <h2>My <span><img src={face} alt="icon" width='25px'/></span> Order</h2>
                    </div>

                    <div className="orderInformation">
                        <div className="info1">
                            <span>625 Marks Ave</span>
                            <span onClick={ this.error.bind(this,'edit') } style={{cursor:'pointer'}}>Edit</span>
                        </div>
                        <div className="info2">
                            <div className="iconClockInfo2">
                                <img src={yellowClock} className="yellowClock" alt="icon"/>
                            </div>
                            <span className="info2-min">{this.props.time} min</span>
                            <span className="info2-chooseTime" onClick={ this.error.bind(this,'chooseTime') } style={{cursor:'pointer'}} >Choose time</span>
                        </div>
                    </div>

                    <div className="orderProducts">
                        {
                            this.props.cart.map(data => (
                                <div key={data.id} className="product">
                                    <div className="productImg" style={{backgroundImage:`url('${data.image}')`}}></div>
                                    <span className="nameQuantity">1 x {data.name.split(' ')[0]}</span>
                                    <span className="totalPrice">${data.price}</span>
                                </div>
                            ))
                        }
                        <div className="product">
                            <div className="productImgDelivery">
                                <img src={car} alt="icon" width='35px'/>
                            </div>
                            <span className="nameQuantity">Delivery</span>
                            <span className="totalPrice">$0.00</span>
                        </div>
                    </div>
                    <p className="scrollDown">Scroll down</p>
                </div>
            </div>

            <div className="orderFooter">
                <div className="total">
                    <h4>Total:</h4>
                    <h4>${this.state.total}</h4>
                </div>

                <div className="quantity">
                    <div className="persons">
                        <span className="subtitlePerson">Persons</span>
                        <div className="quantityPersons">
                            <div className="less" onClick={this.min.bind(this)}>-</div>
                            <div className="number">{this.state.persons}</div>
                            <div className="sum" onClick={this.sum.bind(this) }>+</div>
                        </div>
                    </div> 
                    <div className="checkout" onClick={ this.checkout.bind(this) }>
                        <span>Checkout</span>
                        <img src={rightArrow} className="rightArrow" alt="icon"/>
                    </div>
                </div>
            </div>

            <Modal 
                title="My account" 
                visible={this.state.modalLogin}
                okButtonProps={{ style: { display: 'none' } }}
                onCancel={this.showModalLogin.bind(this)}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div className="myAccount">
                    <img className="profilePhoto" src={ photoURL } alt="" width='30px'/>
                    <p>Name: { displayName }</p>
                    <p>Email: { email }</p>
                    <Button type="default" onClick={this.onLogout.bind(this)}>Logout</Button>
                </div>
            </Modal>

            <Drawer
                title="Checkout"
                placement="right"
                width='100%'
                closable={this.checkout.bind(this)}
                onClose={this.checkout.bind(this)}
                visible={this.state.modalCheckout}
            >
                <div className="checkoutPage">
                    <Table dataSource={ this.props.cart } columns={columns} rowKey='id' />
                    {renderCheckout}
                </div>
            </Drawer>
            
            </Fragment>
        );
    }
}

export default Order;