import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../navbar/NavBar';
import './styles.css';
import TransactionCard from '../../transactionCard/TransactionCard';

//Por ahora como muestra vamos a usar un localStorage, después nos quemamos la cabeza con la API.
const PENDING_TRANSACTIONS = [
    {
        transactionId: 1000,
        offerer: 'Aparicio Baptista',
        amount: 10,
        erate: 37.00,
        from: 'UYU',
        to: 'USD',
    },
    {
        transactionId: 1001,
        offerer: 'Aparicio Baptista',
        amount: 15,
        erate: 37.08,
        from: 'UYU',
        to: 'USD',
    },
    {
        transactionId: 1002,
        offerer: 'Rodrigo Castro',
        amount: 10,
        erate: 11,
        from: 'UYU',
        to: 'BRL',
    },
    {
        transactionId: 1003,
        offerer: 'Francisco Bongiovanni',
        amount: 10000,
        erate: 0.100,
        from: 'CHL',
        to: 'UYU',
    }
];

localStorage.setItem('pending_transactions', JSON.stringify(PENDING_TRANSACTIONS));

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pending_transactions: [],
        };
    }


    componentDidMount() {
        let pending_transactions = JSON.parse(localStorage.getItem('pending_transactions'));
        this.setState({ pending_transactions });
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="home-layout">
                    <div className="cards-layout">
                        {
                            this.state.pending_transactions.map(transaction => {
                                return <TransactionCard
                                    key={transaction.transactionId}
                                    transactionId={transaction.transactionId}
                                    offerer={transaction.offerer}
                                    amount={transaction.amount}
                                    erate={transaction.erate}
                                    from={transaction.from}
                                    to={transaction.to}
                                />;
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    userId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
};

export default withRouter(Home);