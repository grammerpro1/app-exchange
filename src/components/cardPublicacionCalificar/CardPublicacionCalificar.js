import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import './styles.css';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';


class CardPublicacionCalificar extends Component {
    handleBuy(e) {
        e.preventDefault();
            let { id, userName, amount, calificacion} = this.props;
            let publicacion = { id, userName, amount, calificacion };
    
            //this.props.history.push(`/califiacarPublicacion/${id}/confirm`, publicacion);
    }

    wrapperFunction = (e)=>{
        e.preventDefault();
        this.handleBuy(e);
        this.onCardPublicacionCalificarClick(e);
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
                            <CardText>{`Ofertado ${amount} al usurio: ${userName}`}</CardText>
                            {calificacion === 0 ? (<Button block onClick={this.wrapperFunction}>Calificar</Button>) : 
                             (<Button outline block disabled>Calificado</Button>)}
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }


    onCardPublicacionCalificarClick(event){
        event.preventDefault();
        swal({
            title: "Calificar Publicacion",
            text: "Publicacion del usuario: "+this.userName,
            buttons: ["Negativa", "Positiva"],
          })
    }
}

CardPublicacionCalificar.propTypes = {

    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
};

export default withRouter(CardPublicacionCalificar);
