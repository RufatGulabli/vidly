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
import FontAwesome from 'react-fontawesome';
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

    const bottom = {
      position: 'fixed',
      bottom: '0px',
      left: '0px',
      color: 'white',
      zIndex: '999'
    }

    return (
      <div className="container-fluid" style={{ backgroundColor: '#eee', height: '100vh' }}>
        <div className="row mb-2">
          <Navbar user={this.state.user} />
          <ToastContainer />
        </div>
        <div className="container d-flex justify-content-center" style={{ marginBottom: '80px' }}>
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

        <section className="row">
          <div className="bg-dark w-100" style={bottom}>
            <div className="d-flex justify-content-between align-items-center">

              <div className="w-100 text-center">
                <div>Contact</div>
                <div className="text-center">
                  <a href="https://www.facebook.com/rufet.gulabli" target="blank">
                    <span style={{ padding: '5px', margin: '5px' }}><FontAwesome name="facebook" size="2x" /></span>
                  </a>
                  <a href="https://github.com/RufatGulabli" target="blank">
                    <span style={{ padding: '5px', margin: '5px' }}> <FontAwesome name="github" size="2x" /></span>
                  </a>
                  <a href="https://www.linkedin.com/in/rufat-gulabli-8203b1b4" target="blank">
                    <span style={{ padding: '5px', margin: '5px' }}> <FontAwesome name="linkedin" size="2x" /> </span>
                  </a>
                </div>
              </div>

              <div className="w-100 text-center p-3">
                <div>
                  Created by <strong className="author">Rufat Gulabli</strong>
                </div>
                <div className="d-flex align-items-center justify-content-center ">
                  <FontAwesome name="envelope" className="mx-2" />
                  <strong>gulabli.rufat@gmail.com</strong>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
