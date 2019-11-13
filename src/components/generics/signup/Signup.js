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

class Signup extends Component {
  constructor(props) {
    super(props);

    this.onInputKeyPress = this.onInputKeyPress.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  }

  onInputKeyPress(event) {
      if (event.key === 'Enter') {
          this.onRegisterClick(event);
      }
  }

  onRegisterClick(event) {
    event.preventDefault();
    if (this.passwordInput.value !== this.passwordInput2.value) {
      swal("Error", "Las contraseñas no coinciden.", "error");
    } else if (
      this.userNameInput.value === "" ||
      this.emailInput.value === "" ||
      this.passwordInput.value === ""
    ) {
      swal(
        "Error",
        "Todos los campos del formulario deben de estar completos.",
        "error"
      );
    } else if(!this.emailInput.checkValidity()) {
        swal(
          "Error",
          "La dirección de correo electrónica ingresada no es válida.",
          "error"
        );
    } else if (!this.acceptTOS.checked) {
      swal("Error", "Debe aceptar los términos y condiciones.", "error");
    } else {
      console.log(`Intentando registrar a usuario ${this.userNameInput.value}`);

      axios
        .post(baseUrl + "Users", {
          params: {
            user_name: this.userNameInput.value,
            firstname: this.firstNameInput.value,
            lastname: this.lastNameInput.value,
            email: this.emailInput.value,
            pass: this.passwordInput.value
          }
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
        //   const newUserId = 12345678;
        //   this.props.history.push("/home", {
        //     userId: newUserId,
        //     username: this.userNameInput.value
        //   });
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
            <h1 className="display-3">Registrarse</h1>
            <Form>
              <FormGroup>
                <Label for="userName">Nombre de usuario</Label>
                <Input
                  id="userName"
                  placeholder="Ingrese aquí su nombre de usuario"
                  innerRef={input => (this.userNameInput = input)}
                  onKeyPress={this.onInputKeyPress}
                />
                <Label for="userName">Nombre</Label>
                <Input
                  id="firstName"
                  placeholder="Ingrese aquí su nombre real"
                  innerRef={input => (this.firstNameInput = input)}
                  onKeyPress={this.onInputKeyPress}
                />
                <Label for="userName">Apellido</Label>
                <Input
                  id="lastName"
                  placeholder="Ingrese aquí su apellido"
                  innerRef={input => (this.lastNameInput = input)}
                  onKeyPress={this.onInputKeyPress}
                />
                <Label for="userName">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingrese aquí su correo electrónico"
                  innerRef={input => (this.emailInput = input)}
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
                <Label for="userName">Repetir contraseña</Label>
                <Input
                  id="password2"
                  type="password"
                  placeholder="Repita su contraseña"
                  innerRef={input => (this.passwordInput2 = input)}
                  onKeyPress={this.onInputKeyPress}
                />
                <Label>
                  <Input
                    type="checkbox"
                    defaultChecked={false}
                    innerRef={input => (this.acceptTOS = input)}
                  />
                  Acepto los términos y condiciones
                </Label>
              </FormGroup>
            </Form>
            <p className="lead">
              <Button
                size="lg"
                block
                innerRef={input => (this.registerButton = input)}
                onClick={this.onRegisterClick}
              >
                Registrarse
              </Button>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

export default Signup;
