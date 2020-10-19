import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import App from './App';
// import Home from './screens/Home/Home';
// import Getstarted from './screens/Getstarted/Getstarted';
// import Register from './screens/Register/Register';
// import Login from './screens/Login/Login';
// import Forget from './screens/Forget/Forget';
// import Activate from './screens/Activate/Activate';
// import Reset from './screens/Reset/Reset';

import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(<BrowserRouter>
//   <Switch>
//     <Route path='/' exact render={props => <Home {...props} />} />
//     <Route path='/getstarted' exact render={props => <Getstarted {...props} />} />
//     <Route path='/register' exact render={props => <Register {...props} />} />
//     <Route path='/login' exact render={props => <Login {...props} />} />
//     <Route path='/users/password/forget' exact render={props => <Forget {...props} />} />
//     <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
//     <Route path='/users/password/reset/:token' exact render={props => <Reset {...props} />} />
//   </Switch>
// </BrowserRouter>,
//   document.getElementById('root')
// );