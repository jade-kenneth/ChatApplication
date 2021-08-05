import React from 'react';
import ReactDOM from 'react-dom';
// import {Provider } from 'react-redux';
// import {createStore, applyMiddleware, compose} from 'redux';
// import thunk from 'redux-thunk';
// import reducers from './ChatApplication/client/reducer';

import App from './App';

// const persistedState = loadState();
// const store = createStore(reducers,persistedState, compose(applyMiddleware(thunk)));


// store.subscribe(() => {
//   console.log(store.getState());
//   saveState(store.getState());
  
// })
ReactDOM.render(
  // <Provider store={store} >
  <React.StrictMode>
    <App />
    </React.StrictMode>
  // </Provider>,
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
