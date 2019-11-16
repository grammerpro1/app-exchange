import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import './styles.css';
import { withRouter, Link } from 'react-router-dom';


class TransactionCard extends Component {
    handleBuy(e) {
        e.preventDefault();
            let { id, offerer, amount, erate, from, to, state } = this.props;
            let transaction = { id, offerer, amount, erate, from, to, state };
    
            this.props.history.push(`/transaction/${id}/confirm`, transaction);
    }

    render() {
        const { id, offerer, amount, erate, from, to, state } = this.props;
        return (
            <div>
                <Container className="card-container">
                    <Card width>
                        <CardBody>
                            <CardTitle><h1>{id}</h1></CardTitle>
                            <CardSubtitle><h3>{offerer}</h3></CardSubtitle>
                            <CardText>{`Ofreció ${amount} ${to} a ${erate} por ${amount * erate} ${from}`}</CardText>
                            {state === 0 ? (<Button block onClick={this.handleBuy.bind(this)}>Comprar</Button>) : 
                             (<Button outline block disabled>Comprado</Button>)}
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
