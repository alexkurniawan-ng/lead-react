import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBNavbarBrand, MDBFormInline
} from "mdbreact";// MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,MDBDropdown,
import '../assets/css/navbar.css'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import RegisPopUp from './registerPopUp'
import LoginPopUp from './loginPopUp'
import UserDropdown from './headerDropdown'
import CartNotif from './cartNotif'

class NavbarPage extends Component {
    state = {
        isOpen: false,
        cartNotif: []
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <div className='fluid'>
                <MDBNavbar className="navbarBG" dark expand="md" >
                    <MDBNavbarBrand style={{ marginLeft: "2%" }}>
                        <Link to='/'>
                            <img src={require('../image/logowhiteB.png')} alt='logo' height='40'></img>
                        </Link>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar style={{ padding: 0 }}>
                        <MDBNavbarNav style={{ marginLeft: "2%" }} left>
                            <MDBNavItem className="navItem" >
                                <MDBNavLink to='/Collection' style={{ fontWeight: 'bold' }}>Our Collection</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className="navItem">
                                <MDBNavLink to='/HowToOrder' style={{ fontWeight: 'bold' }}>Order</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className="navItem">
                                <MDBNavLink to='/AboutPage' style={{ fontWeight: 'bold' }}>About</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                        <MDBNavbarNav right>
                            {/* <MDBNavItem>
                                <MDBFormInline waves>
                                    <div className="md-form my-0">
                                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                                    </div>
                                </MDBFormInline>
                            </MDBNavItem> */}
                            <MDBNavItem>
                                <CartNotif></CartNotif>
                            </MDBNavItem>
                            <MDBNavItem style={{ padding: 8 }}>
                                {this.props.username
                                    ?
                                    <UserDropdown></UserDropdown>
                                    :
                                    <div id="sidesBt-navbar" style={{ width: 130 }}>
                                        <LoginPopUp ></LoginPopUp>
                                        <RegisPopUp ></RegisPopUp>
                                    </div>
                                }
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        id: state.user.id,
        username: state.user.username,
        role: state.user.role
    }
}
export default connect(mapStatetoProps)(NavbarPage);