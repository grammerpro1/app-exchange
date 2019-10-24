import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../generics/navbar/NavBar';
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import './styles.css';
import Axios from 'axios';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import { url as apiUrl } from '../../api/Methods';

class ConfirmTransaction extends Component {
    onClick(event) {
        event.preventDefault();

        let { transactionId, offerer, amount, erate, from, to, state } = this.props.location.state;
        let transaction = { transactionId, offerer, amount, erate, from, to, state : 1};
        let url = apiUrl + '/' + transactionId;

        Axios.put(url, transaction)
        .then(response => {
            console.log(response);
            console.log(response.data);
        });

        swal("Exito", "La transacción ha sido completada", "success");

        this.props.history.push('/home/new');
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
                                <h1>Transacción {this.props.location.state.transactionId}</h1>
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

export default withRouter(ConfirmTransaction);
