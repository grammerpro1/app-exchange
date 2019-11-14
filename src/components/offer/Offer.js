import React, { Component } from 'react';
import { Container, Row, Col, Label, Input, Jumbotron, Button } from 'reactstrap';
import NavBar from '../generics/navbar/NavBar';
import './styles.css';
import swal from 'sweetalert';
import doApiPost from './../../api/Methods';

class Offer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleClickCalculate(event) {
        event.preventDefault();
        if (this.fromCurrencyInput.value !== "UYU" && this.toCurrencyInput.value !== "UYU") {
            swal("Error", "Por lo menos uno de los campos de moneda debe ser UYU", "error");
        } else {
            if (
                (this.amountInput.value === '' || this.amountInput.value === null) ||
                (this.fromCurrencyInput.value === '' || this.fromCurrencyInput.value === null) ||
                (this.toCurrencyInput.value === '' || this.toCurrencyInput.value === null) ||
                (this.erateInput.value === '' || this.erateInput.value === null)
            ) {
                swal("Error", "Todos los campos del formulario deben de estar completos", "error");
            } else {
                this.setState({
                    from: this.fromCurrencyInput.value,
                    to: this.toCurrencyInput.value,
                    erate: parseFloat(this.erateInput.value),
                    amount: parseFloat(this.amountInput.value)
                });
            }
        }
    }

    handleClickPublish(event) {
        event.preventDefault();
        swal({
            title: "¿Seguro desea publicar la oferta?",
            // text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
                if (willDelete) {
                    doApiPost({...this.state, state: 0, offerer: sessionStorage.getItem('username'),  calificationToBuyer : 0, calificationToOfferer: 0});
                    // doApiPost(chumingo);
                    swal("La operación se ha completado con exito!", {
                        icon: "success",
                    });
                } else {
                    swal("La operación se ha cancelado");
                }
            });
    }

    render() {
        let { from, to, amount, erate } = this.state;
        let hasData = false;
        let conversion = amount * erate;

        if (from != null && to != null && amount != null && erate != null) {
            hasData = true;
            conversion = amount * erate;
        }

        return (
            <div>
                <NavBar />
                <div className="offer-layout">
                    <Container>
                        <Row>
                            <Col>
                                <Label>Monto</Label>
                                <Input type="number" innerRef={amountInput => this.amountInput = amountInput} />
                            </Col>
                            <Col>
                                <Label>Moneda Origen</Label>
                                <Input type="select" innerRef={fromCurrencyInput => this.fromCurrencyInput = fromCurrencyInput}>
                                    <option value="UYU">UYU</option>
                                    <option value="USD">USD</option>
                                </Input>
                            </Col>
                            <Col>
                                <Label>Moneda Cambio</Label>
                                <Input type="select" innerRef={toCurrencyInput => this.toCurrencyInput = toCurrencyInput}>
                                    <option value="USD">USD</option>
                                    <option value="CHL">CHL</option>
                                    <option value="VLF">VLF</option>
                                    <option value="EUR">EUR</option>
                                    <option value="UYU">UYU</option>
                                </Input>
                            </Col>
                            <Col>
                                <Label>Tasa de cambio</Label>
                                <Input type="number" innerRef={erateInput => this.erateInput = erateInput} />
                            </Col>
                            <Col>
                                <Button className="buttonCalc" color="primary" size="lg" onClick={this.handleClickCalculate.bind(this)}>Calcular</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <br />
                                {
                                    hasData &&
                                    <Jumbotron>
                                        <h1>${amount} {from} -> ${conversion} {to}</h1>
                                        <hr />
                                        <p>Se ha convertido el monto en base a una tasa de cambio de {erate}</p>
                                        <p>¿Desea publicar la oferta?</p>
                                        <Button color="primary" block onClick={this.handleClickPublish.bind(this)}>Publicar</Button>
                                    </Jumbotron>
                                }
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Offer;