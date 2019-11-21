import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../generics/navbar/NavBar';
import './styles.css';
import Axios from 'axios';
import { baseUrl as url } from '../../api/Methods';
import CardPublicacionCalificar from '../cardPublicacionCalificar/CardPublicacionCalificar';

class CalifcarPublicaciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            associated_transaction : [],
        };
    }

    componentDidMount() {
        Axios.get(`http://topicos.azurewebsites.net//api/Transactions/publicationOfMyTransaction?user_id=${localStorage.getItem("userId")}`)
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
                                return <CardPublicacionCalificar
                                key={transaction[0].publication_id}
                                publication_user_id={transaction[0].publication_user_id}
                                publication_id={transaction[0].publication_id}
                                />;
                            })
                        }
                    </div>
                </div>  
            </div>    
        );
    }
}

export default withRouter(CalifcarPublicaciones);