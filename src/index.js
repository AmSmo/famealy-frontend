import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
// import { Provider } from 'react-redux';
// import { createStore/*, applyMiddleware*/ } from 'redux';
// import thunk from 'redux-thunk';
// import { combineReducers } from 'redux'
// import userReducer  from './reducers/user.js'
// import recipeReducer from './reducers/recipe.js'
import 'semantic-ui-css/semantic.min.css'

// const rootReducer = combineReducers({
//   user: userReducer,
//   recipes: recipeReducer
// })

// const store = createStore(rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider > */}
        <App />
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
