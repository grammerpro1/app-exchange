import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import Login from "./components/generics/login/Login";
import Signup from "./components/generics/signup/Signup";
import Home from "./components/generics/home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Offer from "./components/offer/Offer";
import ConfirmTransaction from "./components/confirmTransaction/ConfirmTransaction";
import CalificarTransacciones from "./components/calificarTransaccion/CalificarTransacciones";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            userId: 19640328,
            userName: "phaller"
        };
    }

    render() {
        //Desconocería si esta es la forma más correcta de hacerlo. Tendría que ir viendo y modificarlo; por mientras que quede este chanchullo.
        //La verdad es que está todo mal hecho, pero voy a ver como arreglarlo, don't worry, ticket for me.
        const { AUTHENTICATED, USERID, USERNAME } = this.state;
        return (
            <Router>
                <div>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Plata Exchange</title>
                    </Helmet>

                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/home/new" component={Home} />
                    <Route exact path="/buy" component={Home} />
                    <Route exact path="/search" component={Home} />
                    <Route exact path="/offer" component={Offer} />
                    <Route exact path="/calificarTransaccion" component={CalificarTransacciones} />
                    {/* <Route exact path="/transaction/:transactionId/confirm" render={(props) => console.log(props)>}/> */}
                    <Route exact path="/transaction/:transactionId/confirm" render={props => <ConfirmTransaction {...props} />} />
                </div>
            </Router>
        );
    }
}

App.propTypes = {};

export default App;
