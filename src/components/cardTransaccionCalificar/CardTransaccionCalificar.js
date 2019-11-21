import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import './styles.css';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Axios from 'axios';




class CardTransaccionCalificar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name : "",
            user_firstname : "", 
            user_lastname : "",
        };
    }
    
    onCardTransaccionCalificarClick(event){
        event.preventDefault();
        swal({
            title: "Calificar Transaccion",
            text: "Transaccion del usuario",
            buttons: ["Negativa", "Positiva"],
          })
          .then((resp)=>{
            if(resp===true){
                let urlPostCalification = `https://topicos.azurewebsites.net/api/Transactions/RatingCompra?user_id=${this.props.transaction_user_id}&publication_id=${this.props.transaction_pub_id}&rating=1`;
                
                Axios.post(urlPostCalification,{})
                .then(resp=>{
                    console.log(resp);
                    console.log(resp.data);
                }); 
            }
            else{
                let urlPostCalification = `https://topicos.azurewebsites.net/api/Transactions/RatingCompra?user_id=${this.props.transaction_user_id}&publication_id=${this.props.transaction_pub_id}&rating=-1`;
                
                Axios.post(urlPostCalification,{})
                .then(resp=>{
                    console.log(resp);
                    console.log(resp.data);
                });
            }
        });  
    }
    
    getTrUser() {
        console.log('verga')
        console.log(`http://topicos.azurewebsites.net/api/Users?user_id=${this.props.transaction_user_id}`)
        Axios.get(`http://topicos.azurewebsites.net/api/Users?user_id=${this.props.transaction_user_id}`)
        .then((response) => {
            let { user_username, user_firstname, user_lastname } = response.data;
            this.setState({ user_username, user_firstname, user_lastname })
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getTrUser();
    }

    render() {
        const { transaction_user_id,
            transaction_rating_compra} = this.props;

        let { user_username, user_firstname, user_lastname } = this.state;

        let chingolo = "negativa"
        if(transaction_rating_compra) {
            if(transaction_rating_compra == 1) {
                chingolo = "positiva";
            } 
        }

        return (
            <div>
                <Container className="card-container">
                    <Card width>
                        <CardBody>
                            <CardTitle><h1>{transaction_user_id}</h1></CardTitle>
                            <CardSubtitle><h3>{user_username}</h3></CardSubtitle>
                            {transaction_rating_compra == null ? ( <CardText>{`${user_firstname} ${user_lastname} no ha sido calificado`}</CardText>): 
                             (<CardText>{`${user_firstname} ${user_lastname} ha sido calificado de forma ${chingolo} `}</CardText>)}
                            {transaction_rating_compra == null ? (<Button block onClick={this.onCardTransaccionCalificarClick.bind(this)}>Calificar</Button>): 
                             (<Button outline block disabled>Calificado</Button>)}
                             
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}

CardTransaccionCalificar.propTypes = {

    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
};

export default withRouter(CardTransaccionCalificar);
