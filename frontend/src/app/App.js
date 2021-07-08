import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Header from './shared/Header';
import Footer from './shared/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Landing from './pages/landing/landing';
import {connect} from 'react-redux';
// import API from '../services';
// import {Modal} from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);             
    }
    state = {
        show: false,
        
    }
    componentDidMount() {
        this.onRouteChanged();
        // let token = localStorage.getItem('token')
        // let profile_url = localStorage.getItem('profile_url')
        // let data = {
        //     access_token: token,
        // }
        // setTimeout(() => {
                      
        //     if(token && profile_url){
        //         this.setState({show:true})
        //         API.googleLogin(data).then((res)=>{  
        //             console.log('key form apps', res.data.key)            
                    
        //             API.getUser(res.data.key).then((result) =>{
        //                 this.props.handleAddUser(profile_url, result, res.data.key)
        //             })
        
        //         })
        //     }
        //     this.setState({show:false})
        // }, 1000);
    }
    handleClose (){
        this.setState({ show: false });
    };

    handleShow (){
        this.setState({ show: true });
    };
    render () {
        
        let headerComponent = !this.state.isFullPageLayout ? <Header/> : '';
        let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
        return (
            <Router>
                <Switch>
                <Fragment>
                    
                    {
                        !this.props.isLogin ?
                        <Fragment>
                            <Landing/>
                        </Fragment>
                        :
                        <Route path='/' render={()=> 
                        <div>
                            { headerComponent }
                            <div className="az-content-wrapper">
                                <AppRoutes/>
                            </div>
                            { footerComponent }
                        </div>
                        }/>
                    }
                
                </Fragment>
                </Switch>
            </Router>
        
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
        this.onRouteChanged();
        }
    }

    onRouteChanged() {
        if (this.props.isLogin !== false){

            console.log("ROUTE CHANGED");
            window.scrollTo(0, 0);
            const fullPageLayoutRoutes = ['/general-pages/signin', '/general-pages/signup', '/general-pages/page-404'];
            for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
            if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
                this.setState({
                isFullPageLayout: true
                })
                document.querySelector('.az-content-wrapper').classList.add('p-0');
                break;
            } else {
                this.setState({
                isFullPageLayout: false
                })
                document.querySelector('.az-content-wrapper').classList.remove('p-0');
            }
            }
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
