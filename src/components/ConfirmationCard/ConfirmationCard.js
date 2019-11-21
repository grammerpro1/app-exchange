import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import './styles.css';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import swal from 'sweetalert';

class TransactionCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_name : "",
            user_firstname : "", 
            user_lastname : "",
        };
    }

    handleBuy(e) {
        e.preventDefault();

        let { user_username, user_firstname, user_lastname } = this.state;

        swal("¿Desea aceptar esta oferta?", {
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((value) => {
            if (value) {
                let apiUrlPost = `http://topicos.azurewebsites.net/api/Transactions/Accept?user_id=${this.props.transaction_user_id}&publication_id=${this.props.transaction_pub_id}`;
                Axios.get(apiUrlPost, {})
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                });

                //Mail user logueado
                let apiUrlPost2 = `http://topicos.azurewebsites.net/api/Generic/Notify?user_id=${localStorage.getItem("userId")}&subject=Transaccon confirmada&message=Se ha confirmado la compra de la transaccion de ${user_firstname} ${user_lastname}`;
                Axios.get(apiUrlPost, {})
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                });

                //Mail al otro guampudo
                let apiUrlPost3 = `http://topicos.azurewebsites.net/api/Generic/Notify?user_id=${this.props.transaction_user_id}&subject=Se ha aceptado su oferta&message=Se ha aceptado su oferta por la publicacion ${this.props.transaction_pub_id}`;
                Axios.get(apiUrlPost3, {})
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                });


              swal("Operacion confirmada", {
                icon: "success",
              });
            } else {
              swal("La operación se ha cancelado");
            }
        });
    }

    componentDidMount() {
        this.getTrUser();
    }
    
    getTrUser() {
        Axios.get(`http://topicos.azurewebsites.net/api/Users?user_id=${this.props.transaction_user_id}`)
        .then((response) => {
            let { user_username, user_firstname, user_lastname } = response.data;
            this.setState({ user_username, user_firstname, user_lastname })
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        
        const { transaction_user_id,
            transaction_pub_id,
            transaction_amount,
            transaction_accepted} = this.props;

        let { user_username, user_firstname, user_lastname } = this.state;

        return (
            <div>
                <Container className="confirmation-card-container">
                    <Card width>
                        <CardBody>
                            <CardTitle><h1>{transaction_user_id}</h1></CardTitle>
                            <CardSubtitle><h3>{user_username}</h3></CardSubtitle>
                            <CardText>{`${user_firstname} ${user_lastname} ofreció ${transaction_amount} UYU por la publicación ${transaction_pub_id}`}</CardText>
                            {transaction_accepted === false || transaction_accepted === null ? (<Button block onClick={this.handleBuy.bind(this)}>Aceptar</Button>) : 
                             (<Button outline block disabled>Comprado</Button>)}
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}


export default withRouter(TransactionCard);
