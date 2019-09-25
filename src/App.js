import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PageNotFound from "./components/shared/pageNotFound";
import Customers from "./components/customers";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/register";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row mb-5">
        <Navbar />
        <ToastContainer />
      </div>
      <div className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies/new" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/page-not-found" component={PageNotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/page-not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
