import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../generics/navbar/NavBar';
import './styles.css';
import Axios from 'axios';
import { baseUrl as url } from '../../api/Methods';
import CardTransaccionCalificar from '../cardTransaccionCalificar/CardTransaccionCalificar';

class CalificarTransacciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
        };
    }

    componentDidMount() {
        Axios.get(`http://topicos.azurewebsites.net/api/Transactions/transAcceptUserPublication?user_id=${localStorage.getItem("userId")}`)
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
        const { transactions } = this.state;

        return (
            <div>
                <NavBar />
                <div className="calificarTransacciones-layout">
                    
                    <div className="cards-layout">
                        {
                            transactions.map(transaction => {
                                console.log(transaction);
                                return <CardTransaccionCalificar
                                key={transaction[0].transaction_user_id}
                                transaction_user_id={transaction[0].transaction_user_id}
                                transaction_pub_id={transaction[0].transaction_pub_id}
                                transaction_amount={transaction[0].transaction_amount}
                                transaction_accepted={transaction[0].transaction_accepted}
                                transaction_rating_compra={transaction[0].transaction_rating_compra}
                                transaction_rating_venta={transaction[0].transaction_rating_venta}
                                transaction_ahorro={transaction[0].transaction_ahorro}
                                />;
                            })
                        }
                    </div>
                </div>  
            </div>    
        );
    }
}

CalificarTransacciones.propTypes = {
    userId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
};

export default withRouter(CalificarTransacciones);