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

        let transaction_confirm = [
            {
              "id": 1000,
              "userName": "Aparicio Baptista",
              "amount": 10000,
              "calificacion": 0
            }];

            this.setState({user_transacciones_confirmadas:transaction_confirm});
        
            
        /*   
        Axios.get(url + "Publications")
            .then((response) => {
                this.setState({user_puclicaciones_cerrada: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
        */
    }

    componentDidUpdate() {
        console.log('chorizo');
    }


    render() {
       // let all_publications_confirm = this.state.publications_confirm;
        //let transaction_confirm = other_transactions.filter(other_transactions => other_transactions.offerer !== 2);
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