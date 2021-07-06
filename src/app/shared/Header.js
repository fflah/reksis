import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Dropdown, Modal, Button, Row, Col, Container } from "react-bootstrap";
import { GoogleLogout } from 'react-google-login';
import {connect} from 'react-redux';
import API from '../../services';
import './Header.css';

export class Header extends Component {
    constructor(props) {
        super(props);
        
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);             
    }
    state = {        
        show: false,
    }
    closeMenu(e) {
        e.target.closest(".dropdown").classList.remove("show");
        e.target.closest(".dropdown .dropdown-menu").classList.remove("show");
    }

    toggleHeaderMenu(e) {
        e.preventDefault();
        document.querySelector("body").classList.toggle("az-header-menu-show");
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
        document.querySelector("body").classList.remove("az-header-menu-show");
        }
    }

    handleClose (){
        this.setState({ show: false });
    };

    
    handleShow = () =>{        
        
        this.setState({
            show: true
        })
        
    }

    render() {
        const logout = (response) => {
            API.logout().then(res =>{
            this.props.handleLogoutUser()

            })       
        }
        return (
            <div>
                <Modal centered show={this.state.show} onHide={this.handleClose} dialogClassName="modal-logout">
                    
                    <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12} md={12}>
                                <div className="text-center">
                                    <h3>Konfirmasi</h3>
                                    <p>Apakah kamu yakin ingin keluar dari aplikasi ini?</p>
                                </div>
                            </Col>                            
                        </Row>

                        <Row>
                            <Col xs={6} md={6}>
                                <Button className="btn-block" variant="outline-primary" onClick={this.handleClose}>
                                    Tidak
                                </Button>
                            </Col>
                            <Col xs={6} md={6}>
                                <GoogleLogout
                                    clientId="800460949380-gdr6rlj4c2oclcdknt7n7h5h5dvq41g5.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <Button className="btn-block" variant="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                            Ya
                                        </Button>
                                    )}
                                    onLogoutSuccess={logout}
                                    onFailure={logout}
                                >
                                </GoogleLogout>  
                                
                            </Col>                            
                        </Row>
                    </Container>
                </Modal.Body>
                </Modal>
                <div className="az-header">
                <div className="container">
                    <div className="az-header-left">
                    <a href="#/" className="az-logo">
                        <span></span> Reksis
                    </a>
                    <a
                        id="azMenuShow"
                        onClick={event => this.toggleHeaderMenu(event)}
                        className="az-header-menu-icon d-lg-none"
                        href="#/"
                    >
                        <span></span>
                    </a>
                    </div>
                    <div className="az-header-menu">
                    <div className="az-header-menu-header">
                        <Link to="/" className="az-logo">
                        <span></span> Reksis
                        </Link>
                        <a
                        href="#/"
                        onClick={event => this.toggleHeaderMenu(event)}
                        className="close"
                        >
                        &times;
                        </a>
                    </div>
                    <ul className="nav">
                        <li
                        className={
                            this.isPathActive("/reksis")
                            ? "nav-item active"
                            : "nav-item"
                        }
                        >
                        <Link to="/reksis" className="nav-link">
                            <i className="typcn typcn-chart-area-outline"></i> Pilih Dosbing
                        </Link>
                        </li>

                        <li
                        className={
                            this.isPathActive("/dosbing")
                            ? "nav-item active"
                            : "nav-item"
                        }
                        >
                        <Link to="/dosbing" className="nav-link">
                            <i className="typcn typcn-document"></i> Daftar Dosbing
                        </Link>
                        </li>

                        <li
                        className={
                            this.isPathActive("/about")
                            ? "nav-item active"
                            : "nav-item"
                        }
                        >
                        <Link to="/about" className="nav-link">
                            <i className="typcn typcn-book"></i> About
                        </Link>
                        </li>
                        
                        
                    </ul>
                    </div>
                    <div className="az-header-right">
                    
                    <Dropdown className="az-header-notification">
                        <Dropdown.Toggle as={"a"} className="new">
                        <i className="typcn typcn-bell"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="az-profile-menu">
                        <Dropdown.Toggle as={"a"} className="az-img-user">
                        <img
                            src={this.props.url_profile}
                            alt=""
                        ></img>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <div className="az-dropdown-header d-sm-none">
                            <a
                            href="#/"
                            onClick={event => this.closeMenu(event)}
                            className="az-header-arrow"
                            >
                            <i className="icon ion-md-arrow-back"></i>
                            </a>
                        </div>
                        <div className="az-header-profile">
                            <div className="az-img-user">
                            <img
                                src={this.props.url_profile}
                                alt=""
                            ></img>
                            </div>
                            <h6>{this.props.user.first_name} {this.props.user.last_name}</h6>
                            <span>Mahasiswa Akhir</span>
                        </div>
                        <button onClick={this.handleShow} className="dropdown-item">
                            <i className="typcn typcn-power-outline"></i> Sign Out
                        </button>
                        
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                </div>
                </div>
            </div>
        );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

// subscription
const mapStateToProps = (state) =>{
  return{
      url_profile:state.url_profile,
      isLogin:state.isLogin,
      user:state.user,
  }

}

// dispatching action
const mapDispatchToProps = (dispatch) =>{
  return{
      handleLogoutUser: () => dispatch({
          type: 'LOGOUT_USER',           
      })        

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
