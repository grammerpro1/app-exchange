import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, Label, Input, Container, Jumbotron, Button } from "reactstrap";
import "./styles.css";
import swal from "sweetalert";
import * as Api from "../../../api/Methods.js";

class Login extends Component {
    constructor(props) {
        super(props);

        this.onInputKeyPress = this.onInputKeyPress.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onInputKeyPress(event) {
        if (event.key === "Enter") {
            this.onRegisterClick(event);
        }
    }

    onLoginClick(event) {
        event.preventDefault();
        if (this.userNameInput.value === "" || this.passwordInput.value === "") {
            swal("Error", "Todos los campos del formulario deben de estar completos.", "error");
        } else {
            console.log(`Intentando ingresar a usuario ${this.userNameInput.value}`);
            Api.default
                .doApiGet("Users", {
                    params: {
                        user_name: this.userNameInput.value,
                        pass: this.passwordInput.value
                    }
                })
                .then(response => {
                    localStorage.setItem("userId", response.data.user_id);
                    localStorage.setItem("username", this.userNameInput.value);
                    this.props.history.push("/home", {});
                })
                .catch(error => {
                    console.log(error);
                    if (error.response) {
                        const status = error.response.status.toString();
                        if (status === "400" || status === "500") {
                            swal("Error", "Usuario o contraseña incorrectos.", "error");
                            return;
                        }
                    }
                    swal("Error", "Hubo un error accediendo al servidor.", "error");
                    //Para debug: https://github.com/axios/axios#handling-errors
                });
        }
    }

    render() {
        return (
            <div>
                <Container className="centered">
                    <div className="centered login-layout">
                        <h1 className="display-3">¡Bienvenido!</h1>
                        <Form>
                            <FormGroup>
                                <Label for="userName">Nombre de usuario</Label>
                                <Input
                                    id="userName"
                                    placeholder="Ingrese aquí su nombre de usuario"
                                    innerRef={input => (this.userNameInput = input)}
                                    onKeyPress={this.onInputKeyPress}
                                />
                                <Label for="userName">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Ingrese aquí su contraseña"
                                    innerRef={input => (this.passwordInput = input)}
                                    onKeyPress={this.onInputKeyPress}
                                />
                            </FormGroup>
                        </Form>
                        <p className="lead">
                            <Button size="lg" block onClick={this.onLoginClick}>
                                Iniciar sesión
                            </Button>
                        </p>
                        <p className="centered-link">
                            ¿No tienes cuenta? <a href="/signup">Regístrate en Plata Exchange</a>.
                        </p>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Login;
