import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Label, Input } from 'reactstrap';
import './styles.css';
import { withRouter, Link } from 'react-router-dom';


class TransactionCard extends Component {
    handleCalification(e) {
        e.preventDefault();
        let { id, offerer, amount, erate, from, to, state } = this.props;
        let transaction = { id, offerer, amount, erate, from, to, state, calificationToBuyer: this.calificationInput.value };
        console.log("calification for buyer");
        console.log(transaction);
        // this.props.history.push(`/transaction/${id}/confirm`, transaction);
    }

    render() {
        const { id, offerer, amount, erate, from, to, state, calificationToBuyer, calificationToOfferer, buyer } = this.props;
        
        let buyed = false;

        if(buyer) {
            buyed = true; 
        }

        console.log("buyer");
        console.log(buyer);
        console.log("calificationToOfferer");
        console.log(calificationToOfferer);

        return (
            <div>
                <Container className="card-container">
                    <Card width>
                        <CardBody>
                            <CardTitle><h1>{id}</h1></CardTitle>
                            <CardSubtitle><h3>{offerer}</h3></CardSubtitle>
                            <CardText>{`Ofreció ${amount} ${to} a ${erate} por ${amount * erate} ${from}`}</CardText>

                            {buyed && calificationToOfferer !== 0 ? (
                                <Label>Ha sido calificado con {calificationToOfferer}</Label>
                            ) : <Label>No ha sido califcado</Label>} 

                            {buyed && calificationToBuyer === 0 ? (
                                <Label>Calificar:</Label>
                            ) : ""} 

                            {buyed && calificationToBuyer === 0 ? (
                                <Input type="select" innerRef={calificationInput => this.calificationInput = calificationInput}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Input>
                            ) : ""} 
                            
                            <br/>
                            {buyed && calificationToBuyer === 0 ? (
                                <Button block onClick={this.handleCalification.bind(this)}>Calificar</Button>
                            ) :
                                (<Button outline block disabled>Pendiente</Button>)} 
                            
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}

TransactionCard.propTypes = {
    id: PropTypes.number.isRequired,
    offerer: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    erate: PropTypes.number.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default withRouter(TransactionCard);
