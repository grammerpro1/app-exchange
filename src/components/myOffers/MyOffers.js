import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { url } from './../../api/Methods'; 
import NavBar from '../generics/navbar/NavBar';
import { withRouter } from 'react-router-dom';
import TransactionCard from '../transactionCard/TransactionCard';
import OfferedTransactionCard from '../offeredTransactionCard/OfferedTransactionCard';
import './styles.css';

class MyOffers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
        };
    }

    componentDidMount() {
        Axios.get(url)
            .then((response) => {
                this.setState({ transactions: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let other_transactions = this.state.transactions;
        let user_transactions = other_transactions.filter(other_transactions => other_transactions.offerer === sessionStorage.getItem('username'));

        return (
            <div>
                <NavBar />
                <div className="myoffers-layout">
                    <div className="cards-layout">
                        {
                            user_transactions.map(transaction => {
                                return <OfferedTransactionCard
                                    key={transaction.id}
                                    id={transaction.id}
                                    offerer={transaction.offerer}
                                    amount={transaction.amount}
                                    erate={transaction.erate}
                                    from={transaction.from}
                                    to={transaction.to}
                                    state={transaction.state}
                                    buyer={transaction.buyer}
                                    calificationToBuyer={transaction.calificationToBuyer}
                                    calificationToOfferer={transaction.calificationToOfferer}
                                />;
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

MyOffers.propTypes = {

};

export default MyOffers;