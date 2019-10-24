import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../navbar/NavBar';
import './styles.css';
import TransactionCard from '../../transactionCard/TransactionCard';
import Axios from 'axios';
import { url } from './../../../api/Methods';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pending_transactions: [],
        };
    }

    componentDidMount() {
        Axios.get(url)
            .then((response) => {
                this.setState({ pending_transactions: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate() {
        console.log('pepino');
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
                                    state={transaction.state}
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