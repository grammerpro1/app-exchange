import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import './styles.css';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Axios from 'axios';




class CardTransaccionCalificar extends Component {

    handleBuy(e) {
            let { id, userName, amount, calificacion} = this.props;
            let Transaccion = { id, userName, amount, calificacion };
    }

    wrapperFunction = (e)=>{
        e.preventDefault();
        this.handleBuy(e);
        this.onCardTransaccionCalificarClick(e);
    }

    render() {
        const { id, userName, amount, calificacion } = this.props;
        return (
            <div>
                <Container className="card-container">
                    <Card width>
                        <CardBody>
                            <CardTitle><h1>{id}</h1></CardTitle>
                            <CardSubtitle><h3>{userName}</h3></CardSubtitle>
                            <CardText>{`Ofertado ${amount} del usurio: ${userName}`}</CardText>
                            {calificacion === 0 ? (<Button block onClick={this.wrapperFunction}>Calificar</Button>): 
                             (<Button outline block disabled>Calificado</Button>)}
                             
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }

    onCardTransaccionCalificarClick(event){
        event.preventDefault();
        swal({
            title: "Calificar Transaccion",
            text: "Transaccion del usuario: "+this.userName,
            buttons: ["Negativa", "Positiva"],
          })
          .then((resp)=>{
            if(resp===true){
                let urlPostCalification = `https://topicos.azurewebsites.net/api/Transactions/RatingVenta?user_id=${localStorage.getItem("userId")}&publication_id=${this.props.publicationId}&rating=1`;
                
                Axios.post(urlPostCalification,{})
                .then(resp=>{
                    console.log(resp);
                    console.log(resp.data);
                }); 
            }
            else{
                let urlPostCalification = `https://topicos.azurewebsites.net/api/Transactions/RatingVenta?user_id=${localStorage.getItem("userId")}&publication_id=${this.props.publicationId}&rating=-1`;
                
                Axios.post(urlPostCalification,{})
                .then(resp=>{
                    console.log(resp);
                    console.log(resp.data);
                });
            }
        });  
    }
}

CardTransaccionCalificar.propTypes = {

    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
};

export default withRouter(CardTransaccionCalificar);
