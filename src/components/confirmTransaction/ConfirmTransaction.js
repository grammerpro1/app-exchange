import React, { Component, useState } from './node_modules/react';
import { withRouter } from './node_modules/react-router-dom';
import PropTypes from './node_modules/prop-types';
import NavBar from '../generics/navbar/NavBar';
import './styles.css';
import TransactionCard from '../ConfirmationCard/ConfirmationCard';
import Axios from './node_modules/axios';
import ConfirmationCard from '../ConfirmationCard/ConfirmationCard';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            publications: [],
            my_publications: [],
            transactions: [],
            transactions_for_me: [],
        };
    }

    componentDidMount() {
        Axios.get("http://topicos.azurewebsites.net/api/Publications")
        .then((response) => {
            this.setState({publications: response.data})
        })
        .catch(error => {
            console.log(error);
        });

        Axios.get(`http://topicos.azurewebsites.net/api/Transactions`)
            .then((response) => {
                this.setState({transactions: response.data})
            })
            .catch(error => {
                console.log(error);
            });
            
    }

    componentDidUpdate() {
        // console.log('chorizo');
    }

    render() {
        const { publications, transactions } = this.state;
        const filteredPublications = publications.filter(publication => publication.publication_user_id == localStorage.getItem("userId") && publication.publication_selling == false);
        const myPublicationsIds = filteredPublications.map(publication => publication.publication_id);
        const transactionsByOthers = transactions.filter(transaction => myPublicationsIds.includes(transaction.transaction_pub_id));
        
        return (
            <div>
                <NavBar />
                <div className="home-layout">
                    <div className="cards-layout">
                        {
                            transactionsByOthers.map(transaction => {
                                console.log("transaction")
                                console.log(transaction);
                                return <ConfirmationCard
                                transaction_user_id={transaction.transaction_user_id}
                                transaction_pub_id={transaction.transaction_pub_id}
                                transaction_amount={transaction.transaction_amount}
                                transaction_accepted={transaction.transaction_accepted}
                                transaction_rating_compra={transaction.transaction_rating_compra}
                                transaction_rating_venta={transaction.transaction_rating_venta}
                                transaction_ahorro={transaction.transaction_ahorro}
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
