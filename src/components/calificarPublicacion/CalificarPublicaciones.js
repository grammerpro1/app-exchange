import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../generics/navbar/NavBar';
import './styles.css';
import Axios from 'axios';
import { baseUrl as url } from '../../api/Methods';
import CardPublicacionCalificar from '../cardPublicacionCalificar/CardPublicacionCalificar';

class CalificarPublicaciones extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_puclicaciones_cerrada: [],
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

            this.setState({user_puclicaciones_cerrada:transaction_confirm});
        
            
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
        console.log(this.state);
        //let transaction_confirm = other_transactions.filter(other_transactions => other_transactions.offerer !== 2);
        return (
            <div>
                <NavBar />
                <div className="calificarPublicaciones-layout">
                    
                    <div className="cards-layout">
                        {
                            this.state.user_puclicaciones_cerrada.map(publicacion => {
                                return <CardPublicacionCalificar
                                    key={publicacion.id}
                                    id={publicacion.id}
                                    username={publicacion.username}
                                    amount={publicacion.amount}
                                    calificacion={publicacion.calificacion}
                                />;
                            })
                        }
                    </div>
                </div>  
            </div>    
        );
    }
    
}

CalificarPublicaciones.propTypes = {
    userId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
};

export default withRouter(CalificarPublicaciones);