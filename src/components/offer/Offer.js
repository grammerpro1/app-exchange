import React, { Component } from 'react';
import { Container, Row, Col, Label, Input, Jumbotron, Button } from 'reactstrap';
import NavBar from '../generics/navbar/NavBar';
import './styles.css';
import swal from 'sweetalert';
import doApiPost from './../../api/Methods';
import TransactionCard from '../transactionCard/TransactionCard';

class Offer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    handleClickCalculate(event) {
        event.preventDefault();
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
                    doApiPost({...this.state, state: 0, id: 1010, offerer: "phaller"});
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
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
                                    <option>UYU</option>
                                </Input>
                            </Col>
                            <Col>
                                <Label>Moneda Cambio</Label>
                                <Input type="select" innerRef={toCurrencyInput => this.toCurrencyInput = toCurrencyInput}>
                                    <option>USD</option>
                                    <option>CHL</option>
                                    <option>VLF</option>
                                    <option>EUR</option>
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