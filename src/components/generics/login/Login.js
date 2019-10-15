import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Container, Jumbotron, Button } from 'reactstrap';
import './styles.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        if(this.userNameInput.value === 'phaller' && this.passwordInput.value === '1234') {
            console.log(this);
            //Se debería obtener el userId de alguna forma. Capaz que el login tendria que ser por cedula y que ese sea el Id.
            console.log(`${this.userNameInput.value}, ${this.passwordInput.value}, todo bien`);
            this.props.history.push('/home', {userId: 19640328, username: this.userNameInput.value});
        } else {
            console.log(`${this.userNameInput.value}, ${this.passwordInput.value}, todo mal, el Apa se la come`);
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
                                <Input id="userName" placeholder="Ingrese aquí su nombre de usuario" innerRef={userNameInput => this.userNameInput = userNameInput}/>
                                <Label for="userName">Contraseña</Label>
                                <Input id="password" type="password" placeholder="Ingrese aquí su contraseña" innerRef={passwordInput => this.passwordInput = passwordInput}/>
                            </FormGroup>
                        </Form>
                        <p className="lead">
                            <Button size="lg" block onClick={this.onClick}>Iniciar sesión</Button>
                        </p>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Login;