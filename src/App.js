import logo from "./logo.svg";
import "./App.css";
import Movie from "./movies";
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./customers";
import Rentals from "./rentals";
import NotFound from "./notFound";
import NavBar from "./navBar";
import MovieForm from "./movieForm";
import Login from "./loginForm";
import Register from "./register";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./logout";
import auth from "./services/authService";
import ProtectedRoute from "./protectedRoute";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      //   const jwt = localStorage.getItem("token");
      //   const user = jwtDecode(jwt);
      //   this.setState({ user });
      // } catch (ex) {}

      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />

        <main className="container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route path="/register" component={Register} />

            <ProtectedRoute
              path="/movies/:id"
              // render={props => {
              //   if (!this.state.user) return <Redirect to="/login" />;
              //   return <MovieForm {...props} />;
              // }}
              component={MovieForm}
            />

            <Route
              path="/movies"
              render={props => <Movie {...props} user={this.state.user} />}
              //component={Movie}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-Found" component={NotFound} />
            <Redirect from="/" exact to="/movies"></Redirect>

            <Redirect to="/not-Found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
