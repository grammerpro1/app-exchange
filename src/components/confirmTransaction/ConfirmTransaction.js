import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../generics/navbar/NavBar';
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import './styles.css';
import Axios from 'axios';

class ConfirmTransaction extends Component {
    onClick(event) {
        event.preventDefault();

        let url = "http://localhost:3001/transactions/" + this.props.transactionId;
        //Lo mas facil seria mandarle los datos de la transaction, igual esto lo tendria que manejar
        //la api internamente, enviándole sólo un indicador que cambie el estado de la transaction

        Axios.put(url, {
            state: 1
        })
        .then(response => {
            console.log(response);
            console.log(response.data);
        });
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className="confirm-transaction-layout">
                    <Container>
                        <Row>
                            <Col>
                            <Jumbotron>
                                <h1>Transacción {this.props.transactionId}</h1>
                                <hr/>
                                <p>¿Está seguro que desea confirmar la transacción?</p>
                                <Button color="primary" onClick={this.onClick.bind(this)}>Confirmar</Button>
                            </Jumbotron>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

ConfirmTransaction.propTypes = {

};

export default ConfirmTransaction;