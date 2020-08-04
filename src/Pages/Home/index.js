import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { message } from 'antd';
import './Home.css';
import './HomeResponsive.css';

import Header from '../../Components/Header';
import Banner from '../../Components/Banner';
import Categories from '../../Components/Categories';
import Types from '../../Components/Types';
import Foods from '../../Components/Foods';
import Order from '../../Components/Order';

firebase.initializeApp({
    apiKey: "AIzaSyAKieptJuAgORwcEx0lIM3L9kQO3S3cZxQ",
    authDomain: "chukwudi-5b4d8.firebaseapp.com",
    databaseURL: "https://chukwudi-5b4d8.firebaseio.com",
    projectId: "chukwudi-5b4d8",
    storageBucket: "chukwudi-5b4d8.appspot.com",
    messagingSenderId: "354709183632",
    appId: "1:354709183632:web:217c9f12b65bc9a605cc15"
});


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            user:null,
            products:[],
            categories:[],
            cart:[],
            sectionOrderClass:'',
            AppOverflow:'',
            time:0
        };
    }

    componentDidMount(){
        this.getData('categories');
        this.getData('products');

        firebase.auth().onAuthStateChanged(user =>{
            if(user)
            {
                this.setState({user:user});
            }
            else{
                this.setState({user:null});
            }
        });

    }

    getData(file){
        fetch(`${process.env.PUBLIC_URL}/api/${file}.json`)
            .then(rel => rel.json())
            .then(rel => this.setState({ [file]:rel }));
    }

    togleSectionOrder(){
        if(this.state.sectionOrderClass === '')
        {
            this.setState({sectionOrderClass:'showSectionOrder'});
            this.setState({AppOverflow:'AppOverflow'});
        }
        else{
            this.setState({sectionOrderClass:''});
            this.setState({AppOverflow:''});
        }
    }

    addToCart(data){
        const find = this.state.cart.find(el => el.id === data.id);

        if(find){
            message.warning('The product is already added to the cart');
        }
        else{
            message.success('Added to cart');
            this.setState(state=>({ time:state.time + 15 }));
            this.setState(state=>({ cart:[...state.cart,data] }));
        }
    }

    onAuth(){
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(rel => message.success(`Welcome ${rel.user.displayName}`));
    }
    onLogout(){
        firebase.auth().signOut();
    }

    buy(){
        message.success('The purchase was successful');
        this.setState({
            cart:[]
        });
    }


    render(){
        return(
            <div className={`App ${this.state.AppOverflow}`}>
                <div className="main">
                    <section className="section-body">
                        <div className="section-body-container">
                            <Header togleSectionOrder = { this.togleSectionOrder.bind(this) }/>            
                            <Banner />
                            <Categories />
                            <Types categories = { this.state.categories } />
                            <Foods products = { this.state.products } addToCart = { this.addToCart.bind(this) } />
                        </div>
                    </section>
                    <section className={ `section-order ${this.state.sectionOrderClass}` }>
                        <Order 
                            cart={this.state.cart}  
                            togleSectionOrder={ this.togleSectionOrder.bind(this) } 
                            onAuth = { this.onAuth.bind(this) }    
                            onLogout = { this.onLogout.bind(this) }
                            user = { this.state.user }
                            time = { this.state.time }
                            buy = { this.buy.bind(this) }
                        />            
                    </section>
                </div>
            </div>
        );
    }
}

export default App;