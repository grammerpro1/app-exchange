import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Container, Jumbotron, Button } from 'reactstrap';
import './styles.css';
import swal from 'sweetalert';

class Signup extends Component {
    constructor(props) {
        super(props);

        // this.onAcceptClick = this.onAcceptClick.bind(this);
        this.onRegisterClick = this.onRegisterClick.bind(this);
    }

    // onAcceptClick(event) {
    //     // event.preventDefault();
    //     this.registerButton.disabled = !this.acceptTOS.checked;
    // }

    onRegisterClick(event) {
        event.preventDefault();
        if (this.passwordInput.value !== this.passwordInput2.value) {
            swal("Error", "Las contraseñas no coinciden.", "error");
        } else if(this.userNameInput.value === "" || this.emailInput.value === "" || this.passwordInput.value === "") {
            swal("Error", "Todos los campos del formulario deben de estar completos.", "error");
        } else if (!this.acceptTOS.checked) {
            swal("Error", "Debe aceptar los términos y condiciones.", "error");
        } else {
            console.log(`Intentando registrar a usuario ${this.userNameInput.value}`);
            //TODO: Registrar al usuario, o mostrar error si este ya existe
            // this.props.history.push('/home', { userId: userid, username: this.userNameInput.value });
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
                                <Input id="userName" placeholder="Ingrese aquí su nombre de usuario" innerRef={input => this.userNameInput = input} />
                                <Label for="userName">Nombre</Label>
                                <Input id="firstName" placeholder="Ingrese aquí su nombre real" innerRef={input => this.firstNameInput = input} />
                                <Label for="userName">Apellido</Label>
                                <Input id="lastName" placeholder="Ingrese aquí su apellido" innerRef={input => this.lastNameInput = input} />
                                <Label for="userName">E-mail</Label>
                                <Input id="email" placeholder="Ingrese aquí su correo electrónico" innerRef={input => this.emailInput = input} />
                                <Label for="userName">Contraseña</Label>
                                <Input id="password" type="password" placeholder="Ingrese aquí su contraseña" innerRef={input => this.passwordInput = input} />
                                <Label for="userName">Repetir contraseña</Label>
                                <Input id="password2" type="password" placeholder="Ingrese aquí su contraseña" innerRef={input => this.passwordInput2 = input} />
                                <Label><Input type="checkbox" defaultChecked={false} innerRef={input => this.acceptTOS = input}
                                    />Acepto los términos y condiciones</Label>
                            </FormGroup>
                        </Form>
                        <p className="lead">
                            <Button size="lg" block  innerRef={input => this.registerButton = input} onClick={this.onRegisterClick}>Registrarse</Button>
                        </p>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Signup;
