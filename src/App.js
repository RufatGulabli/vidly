import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// Components
import PageNotFound from "./components/shared/pageNotFound";
import Customers from "./components/customers";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/register";
import Logout from "./components/logout";
import ProtectedRoute from "./components/shared/protectedRoute";
//Services
import loginService from './services/loginService';
// Styling
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from "./components/shared/adminRoute";

class App extends Component {

  state = {};

  async componentDidMount() {
    const user = await loginService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mb-5">
          <Navbar user={this.state.user} />
          <ToastContainer />
        </div>
        <div className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" render={props => <Movies {...props} user={this.state.user} />} />
            <AdminRoute path="/customers" component={Customers} />
            <AdminRoute path="/rentals" component={Rentals} />
            <Route path="/page-not-found" component={PageNotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/page-not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
