import React, { Component } from 'react';
import "./landing.css";
import bsCustomFileInput from 'bs-custom-file-input';
import GoogleLogin from 'react-google-login';
import API from '../../../services';
import {connect} from 'react-redux'
import {Modal} from 'react-bootstrap';
import ReactLoading from 'react-loading';


export class Landing extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    
    this.handleShow = this.handleShow.bind(this);             
  }
    state = {        
        show: false,
    }
    componentDidMount() {
        bsCustomFileInput.init()    
        
    }

    handleClose (){
        this.setState({ show: false });
    };

    handleShow (){
        this.setState({ show: true });
    };

    render() {
        const responseGoogle = async(response) => {
            let data = {
                access_token: response.accessToken,
            }
            this.setState({show:true})
            await API.googleLogin(data).then((res)=>{  
                
                API.getUser(res.data.key).then((result) =>{
                    this.props.handleAddUser(response.profileObj.imageUrl, result, res.data.key)
                })


            })
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('profile_url', response.profileObj.imageUrl);
            this.setState({show:false})
        }
        return (
            <div className="loaded">
                <Modal dialogClassName="modal-reksis" centered backdrop="static" size="sm" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body id="modal_loading" > 
                    <div className="loading text-center">
                        <ReactLoading  className="loading-icon" type={'spin'} color={'#007BFF'} height={'80px'} width={'80px'} />
                        <p>Memuat...</p>
                    </div>
                    </Modal.Body>
                </Modal>
                {/* Navbar */}
                {/* Main content */}
                <section className="slice py-7">
                    <div className="container">
                        <div className="row row-grid align-items-center">
                            <div className="col-12 col-md-5 col-lg-6 order-md-2 text-center">
                            {/* Image */}
                            <figure className="w-100">
                                <img alt="reksis" src="assets/img/svg/illustrations/illustration-3.svg" className="img-fluid mw-md-120" />
                            </figure>
                            </div>
                            <div className="col-12 col-md-7 col-lg-6 order-md-1 pr-md-5">
                            {/* Heading */}
                            <h1 className="display-4 text-center text-md-left mb-3">
                                Bantuin kamu milih dosbing <strong className="text-primary">tugas akhir</strong>
                            </h1>
                            {/* Text */}
                            <p className="lead text-center text-md-left text-muted">
                            Silakan klik pilih dosbing dan login dengan akun Gmail kamu untuk melanjutkan, kalau kamu kepo sama aku silakan pilih kenalan ya.
                            </p>
                            {/* Buttons */}
                            <div className="text-center text-md-left mt-5">
                                <GoogleLogin
                                        clientId="800460949380-gdr6rlj4c2oclcdknt7n7h5h5dvq41g5.apps.googleusercontent.com"
                                        render={renderProps => (
                                            <button type="button" onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn_landing btn_landing-primary font-weight-bold title1">Pilih Dosbing &nbsp; &nbsp;<i className="fas fa-chevron-right"></i></button>
                                        )}
                                        buttonText="LOGIN WITH GOOGLE"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        isSignedIn={true}
                                    />
                                <a href="#kenalan" className="btn_landing btn_landing-outline-primary title2">Kenalan </a>
                            </div>

                            </div>
                        </div>
                    </div>
                </section>
                <section id="kenalan" className="slice slice-lg">
                    <div className="container">
                        <div className="py-6">
                            <div className="row row-grid justify-content-between align-items-center">
                            <div className="col-lg-6 order-lg-1">
                                <div className="card mb-0 mr-lg-5">
                                <div className="card-body p-2">
                                    <img alt="kenalan" src="assets/img/svg/illustrations/illustration-10.svg" className="img-fluid shadow rounded" />
                                </div>
                                </div>
                            </div>
                            <div className="col-lg-5 order-lg-2">
                                <h5 className="h3"><b>Kenalan</b></h5>
                                <p className="lead my-4">
                                Hi aku Reksis, aku rekomendasi sistem untuk memilih dosen pembimbing diprodi Informatika Universitas Muhammadiyah Surakarta. <br></br>Data yang aku gunakan berasal dari data publik, kalo kamu tertarik mau ngembangin aku, ini Repository aku, sekian salam kenal ya.
                                </p>
                                <ul className="list-unstyled mb-0">
                                <li className="py-2">
                                    <div className="d-flex align-items-center">
                                    <div>
                                        <div className="icon icon-shape bg-primary text-white icon-sm rounded-circle mr-3">
                                        <i className="fas fa-file-invoice" />
                                        </div>
                                    </div>
                                    <div>
                                    <a href="http://github.com" target="_blank" rel="noopener noreferrer"><span className="h6 mb-0">Github repository</span></a>
                                    </div>
                                    </div>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="position-relative" id="footer-main">
                    <div className="footer pt-lg-7">
                    {/* Footer */}
                    <div className="container pt-4">
                        <hr className="divider divider-fade divider-dark my-4" />
                        <div className="row align-items-center justify-content-md-between pb-4">
                        <div className="col-md-6">
                            <div className="copyright text-sm font-weight-bold text-center text-md-left">
                            © 2020 <a href="/#" className="font-weight-bold" target="_blank">Reksis</a>. All rights reserved
                            </div>
                        </div>
                        <div className="col-md-6">
                            <ul className="nav justify-content-center justify-content-md-end mt-3 mt-md-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/#">
                                Terms
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#">
                                Privacy
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#">
                                Cookies
                                </a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </footer>
            </div>
        
        )
    }
    }

    // subscription
    const mapStateToProps = (state) =>{
        return{
            url_profile:state.url_profile,
            isLogin:state.isLogin,
            user:state.user,
            user_key:state.user_key
        }

    }

    // dispatching action
    const mapDispatchToProps = (dispatch) =>{
        return{
            handleAddUser: (url_profile, dataUser, user_key) => dispatch({
                type: 'ADD_USER', 
                url_profile:url_profile,
                user:dataUser,
                user_key:user_key
            })        

        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
