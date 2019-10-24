import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container
} from 'reactstrap';
import './styles.css';
import { withRouter, Link } from 'react-router-dom';


class TransactionCard extends Component {
    render() {
        const { transactionId, offerer, amount, erate, from, to, state } = this.props;
        return (
            <div>
                <Container className="card-container">
                    <Card width>
                        {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
                        <CardBody>
                            <CardTitle>{transactionId}</CardTitle>
                            <CardSubtitle>{offerer}</CardSubtitle>
                            <CardText>{`Ofreció ${amount} ${to} a ${erate} por ${amount * erate} ${from}`}</CardText>
                            {/* Redirige a coso */}
                            {
                                (state === 1)
                                    ? <Link className="disabledCursor" onClick={(event) => event.preventDefault()}>
                                        <Button block>Comprar</Button>
                                    </Link>
                                    : <Link to={`transaction/${transactionId}/confirm`}>
                                        <Button block>Comprar</Button>
                                    </Link>
                            }
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}

TransactionCard.propTypes = {
    transactionId: PropTypes.number.isRequired,
    offerer: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    erate: PropTypes.number.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default withRouter(TransactionCard);
