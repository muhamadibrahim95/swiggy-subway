import React, { Component } from 'react'
import Menu from './svg/bars-solid.svg'
import Logo from './img/logo.png'
import LogoTop from './img/logo-top.png'
import Close from './svg/times-solid.svg'
import CartIcon from './svg/shopping-cart-solid.svg'
import {Link} from 'react-router-dom'
import './css/Header.css'
import {DataContext} from './Context'



export class Header extends Component {
    static contextType = DataContext;

    state = {
        toggle: false
    }

    menuToggle = () =>{
        this.setState({toggle: !this.state.toggle})
    }


    render() {
        const {toggle} = this.state;
        const {cart} = this.context;
        return (
            <div>
            <header>
                <div className="menu" onClick={this.menuToggle}>
                    <img src={Menu} alt="" width="20"/>
                </div>
                <div className="logo">
                    <Link to="/"> <img src={LogoTop} alt="" width="50"/></Link>
                   
                </div>
                <nav>
                    <ul className={toggle ? "toggle" : ""}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">Offers</Link></li>
                        <li><Link to="/">Help</Link></li>
                        <li><Link to="/">Login / Register</Link></li>
                        <li className="close" onClick={this.menuToggle}>
                            <img src={Close} alt="" width="20"/>
                        </li>
                    </ul>
                    <div className="nav-cart">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={CartIcon} alt="" width="20"/>
                        </Link>
                    </div>
                </nav>
            </header>
            <div className="banner">
                <div className="logo-img">
                <img src={Logo} alt="" width="100"/>
                </div>
                <div className="content1">
                   <div className="subway">Subway</div>
                   <div className="sub-content">Fast Food, Healthy Food, Salads, Snacks, Desserts, Beverages
Talwandi, Talwandi</div>
                  <div class="ratings-con">
                    <div className="rating">*4</div>
                    <div className="time">40min</div>
                    <div className="price">$200</div>

                  </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Header
