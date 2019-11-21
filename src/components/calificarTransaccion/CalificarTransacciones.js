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
            user_transacciones_confirmadas: [],
        };
    }

    componentDidMount() {
            
            //let urlGetTransactionsConfirmTest = `https://topicos.azurewebsites.net/api/Transactions/Accept?user_id=1&publication_id=3`;
            let urlGetTransactionsConfirm = `https://topicos.azurewebsites.net/api/Transactions/Accept?user_id=${localStorage.getItem("userId")}&publication_id=${this.props.publicactionId}`;

            
            Axios.get(urlGetTransactionsConfirm)
            .then((resp)=>{
                this.setState({user_transacciones_confirmadas:urlGetTransactionsConfirm});
            })
            .catch((error)=>{
                console.log(error);
                console.log(error.data);
            });
            
            /*
            Axios.get(urlGetTransactionsConfirmTest)
            .then((resp)=>{
                this.setState({user_transacciones_confirmadas:urlGetTransactionsConfirmTest});
            })
            .catch((error)=>{
                console.log(error);
                console.log(error.data);
            });
            */
    }

    componentDidUpdate() {
        console.log('chorizo');
    }


    render() {
        return (
            <div>
                <NavBar />
                <div className="calificarTransacciones-layout">
                    
                    <div className="cards-layout">
                        {
                            this.state.user_transacciones_confirmadas.map(transaccion => {
                                return <CardTransaccionCalificar
                                    key={transaccion.id}
                                    id={transaccion.id}
                                    username={transaccion.username}
                                    amount={transaccion.amount}
                                    calificacion={transaccion.calificacion}
                                    publicactionId={transaccion.publicactionId}
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