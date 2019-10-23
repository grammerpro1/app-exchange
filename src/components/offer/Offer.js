import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Label, Input, Jumbotron, Button } from 'reactstrap';
import NavBar from '../generics/navbar/NavBar';
import './styles.css';

class Offer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transaction_data : {},
        };
    }
    
    onClick(event) {
        event.preventDefault();
        console.log('pija chota');      
    }

    render() {
        let { from, to, amount, erate } = this.state.transaction_data;
        let hasData = false;
        let conversion = amount * erate; 

        amount = 10;
        erate = 50;
        from = 'UYU';
        to = 'CHL';

        if(from != null && to != null && amount != null && erate != null) {
            hasData = true;
            conversion = amount * erate; 
        }

        return (
            <div>
                <NavBar/>
                <div className="offer-layout">
                    <Container>
                        <Row>
                            <Col>
                                <Label>Monto</Label>
                                <Input type="number" innerRef={amountInput => this.amountInput = amountInput}/>
                            </Col>
                            <Col>
                                <Label>Moneda Origen</Label>
                                <Input type="select" innerRef={fromCurrencyInput => this.fromCurrencyInput = fromCurrencyInput}/>
                            </Col>
                            <Col>
                                <Label>Moneda Cambio</Label>
                                <Input type="select"  innerRef={toCurrencyInput => this.toCurrencyInput = toCurrencyInput}/>
                            </Col>
                            <Col>
                                <Label>Tasa de cambio</Label>
                                <Input type="number" innerRef={erateInput => this.erateInput = erateInput}/>
                            </Col>
                            <Col>
                                <Button className="buttonCalc" color="primary" size="lg" onClick={this.onClick.bind(this)}>Calcular</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <br/>
                                {
                                    hasData && 
                                    <Jumbotron>
                                        <h1>${amount} {from} -> ${conversion} {to}</h1>
                                        <hr/>
                                        <p>Se ha convertido el monto en base a una tasa de cambio de {erate}</p>
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

Offer.propTypes = {

};

export default Offer;