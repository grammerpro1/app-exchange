import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../../components/generics/navbar/NavBar';
import './styles.css';
import TransactionCard from '../../components/ConfirmationCard/ConfirmationCard';
import Axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pending_publications: [],
        };
    }

    componentDidMount() {
        Axios.get("http://topicos.azurewebsites.net/api/Publications")
            .then((response) => {
                this.setState({ pending_publications: response.data })
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidUpdate() {
        console.log('chorizo');
    }

    render() {
        let other_publications = this.state.pending_publications;
        let non_user_publications = other_publications.filter(other_publications => other_publications.publication_user_id != localStorage.getItem("userId"));

        return (
            <div>
                <NavBar />
                <div className="home-layout">
                    <div className="cards-layout">
                        {
                            non_user_publications.map(publication => {
                                return <TransactionCard
                                    key={publication.publication_id}
                                    publication_id={publication.publication_id}
                                    publication_main_currency={publication.publication_main_currency}
                                    publication_selling={publication.publication_selling} //Se usa como vendido o no
                                    publication_amount={publication.publication_amount}
                                    publication_user_id={publication.publication_user_id}
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
