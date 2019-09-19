import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

import PageNotFound from "./components/shared/pageNotFound";
import Customers from "./components/customers";
import Movies from "./components/movies";
import Navbar from "./components/shared/navbar";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row mb-5">
        <Navbar />
      </div>
      <div className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
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
