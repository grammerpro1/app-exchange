import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Jumbotron,
  Button
} from "reactstrap";
import "./styles.css";
import swal from "sweetalert";
import axios from "axios";

const baseUrl = "https://topicos.azurewebsites.net/api/";

class Login extends Component {
  constructor(props) {
    super(props);

    this.onInputKeyPress = this.onInputKeyPress.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onInputKeyPress(event) {
    if (event.key === "Enter") {
      this.onRegisterClick(event);
    }
  }

  onLoginClick(event) {
    event.preventDefault();
    if (
      this.userNameInput.value === "" ||
      this.emailInput.value === "" ||
      this.passwordInput.value === ""
    ) {
      swal(
        "Error",
        "Todos los campos del formulario deben de estar completos.",
        "error"
      );
    } else {
      console.log(`Intentando ingresar a usuario ${this.userNameInput.value}`);
      axios
        .post(baseUrl + "Sessions", {
          params: {
            user_name: this.userNameInput.value,
            pass: this.passwordInput.value
          }
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
          // const userId = 12345678;
          // this.props.history.push("/home", {
          //   userId: userId,
          //   username: this.userNameInput.value
          // });
        })
        .catch(error => {
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          console.log(error);
          swal("", "no", "error");
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
                />
                <Label for="userName">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese aquí su contraseña"
                  innerRef={input => (this.passwordInput = input)}
                />
              </FormGroup>
            </Form>
            <p className="lead">
              <Button size="lg" block onClick={this.onLoginClick}>
                Iniciar sesión
              </Button>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

export default Login;
