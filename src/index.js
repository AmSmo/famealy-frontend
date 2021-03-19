import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setAuthToken, getUser } from './actions/session_actions'
import configureStore from './store/store'
import 'semantic-ui-css/semantic.min.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'

let store

if (localStorage.token) {
  setAuthToken(localStorage.token);
  let user = getUser()
  store = configureStore({ user, message: "" })
} else {
  store = configureStore({ message: "" })
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <App />

      </BrowserRouter>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
