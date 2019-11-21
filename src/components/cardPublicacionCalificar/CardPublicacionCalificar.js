import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import './styles.css';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Axios from 'axios';

class CardPublicacionCalificar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name : "",
            user_firstname : "", 
            user_lastname : "",
            transaction : {},
        };
    }
    
    onCardTransaccionCalificarClick(event){
        swal({
            title: "Calificar Transaccion",
            text: "Transaccion del usuario ",
            buttons: ["Negativa", "Positiva"],
          })
          .then((resp)=>{
              console.log(this.state);
            if(resp===true){
                let urlPostCalification = `https://topicos.azurewebsites.net/api/Transactions/RatingVenta?user_id=${this.state.transaction.transaction_user_id}&publication_id=${this.props.publication_id}&rating=1`;
                
                Axios.post(urlPostCalification,{})
                .then(resp=>{
                    console.log(resp);
                    console.log(resp.data);
                }); 
            }
            else{
                let urlPostCalification = `https://topicos.azurewebsites.net/api/Transactions/RatingVenta?user_id=${this.state.transaction.transaction_user_id}&publication_id=${this.props.publication_id}&rating=-1`;
                
                Axios.post(urlPostCalification,{})
                .then(resp=>{
                    console.log(resp);
                    console.log(resp.data);
                });
            }
        });  
    }

    
    getTrUser() {
        Axios.get(`http://topicos.azurewebsites.net/api/Users?user_id=${this.props.publication_user_id}`)
        .then((response) => {
            let { user_username, user_firstname, user_lastname } = response.data;
            this.setState({ user_username, user_firstname, user_lastname })
        })
        .catch(error => {
            console.log(error);
        });
    }

    getTrData() {
        Axios.get(`http://topicos.azurewebsites.net/api/Transactions/ByPublication?publication_id=${this.props.publication_id}`)
        .then((response) => {
            this.setState({ transaction: response.data[0] });
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getTrUser();
        this.getTrData();
    }

    render() {
        const { publication_user_id } = this.props;
        let { user_username, user_firstname, user_lastname, transaction } = this.state;

       let transactionData = transaction;
       console.log('transactionData');
       console.log(transactionData)

        let chingolo = "negativa"
        if(transaction.transaction_rating_venta) {
            if(transaction.transaction_rating_venta == 1) {
                chingolo = "positiva";
            } 
        }

        return (
            <div>
                <Container className="card-container">
                    <Card width>
                        <CardBody>
                            <CardTitle><h1>{publication_user_id}</h1></CardTitle>
                            <CardSubtitle><h3>{user_username}</h3></CardSubtitle>
                            {transaction.transaction_rating_venta == null ? ( <CardText>{`${user_firstname} ${user_lastname} no ha sido calificado`}</CardText>): 
                             (<CardText>{`${user_firstname} ${user_lastname} ha sido calificado de forma ${chingolo} `}</CardText>)}
                            {transaction.transaction_rating_venta == null ? (<Button block onClick={this.onCardTransaccionCalificarClick.bind(this)}>Calificar</Button>): 
                             (<Button outline block disabled>Calificado</Button>)}
                             
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default withRouter(CardPublicacionCalificar);
