import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const globalState = {
  url_profile: '',
  isLogin: false,
  user: '',
  user_key: ''

}

// Reducer
const rootReducer= (state = globalState, action) =>{

  if (action.type === 'ADD_USER') {
      return{
          ...state,
          url_profile: action.url_profile,
          isLogin: true,
          user: action.user,
          user_key:action.user_key
      }
  }
  else if (action.type === 'LOGOUT_USER') {
      localStorage.removeItem("token")
      localStorage.removeItem("profile_url")
      return{
          ...state,
          url_profile: '',
          isLogin: false,
          user: '',
          
      }
  }
  
return state
}

//Store
const storeRedux = createStore(rootReducer);

ReactDOM.render(
  <BrowserRouter >
    <Provider store={storeRedux}><App /></Provider>,
  </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
