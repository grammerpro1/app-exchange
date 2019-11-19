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

        swal("¿Cuantos pesos uruguayos desea ofrecer por esta publicación?", {
            content: "input",
          }).then((value) => {
            swal({
                title: `¿Seguro desea ofrecer ${value} por esta publicación?`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    let apiUrlPost = `https://topicos.azurewebsites.net/api/Transactions?user_id=${localStorage.getItem("userId")}&publication_id=${this.props.publication_id}&amount=${value}`;

                    Axios.post(apiUrlPost, {})
                    .then(response => {
                        console.log(response);
                        console.log(response.data);
                    });

                  swal("La oferta se ha enviado con éxito al propietario", {
                    icon: "success",
                  });
                } else {
                  swal("La operación se ha cancelado");
                }
              });
        });
    }

    componentDidMount() {
        this.getPublicationUser();
    }
    
    getPublicationUser() {
        Axios.get(`http://topicos.azurewebsites.net/api/Users?user_id=${this.props.publication_user_id}`)
        .then((response) => {
            let { user_username, user_firstname, user_lastname } = response.data;
            this.setState({ user_username, user_firstname, user_lastname })
        })
        .catch(error => {
            console.log(error);
        });

        console.log("el state");
        console.log(this.state);
    }

    render() {
        
        const { publication_id,
            publication_main_currency,
            publication_selling,
            publication_amount,
            publication_user_id } = this.props;

        let { user_username, user_firstname, user_lastname } = this.state;

        return (
            <div>
                <Container className="card-container">
                    <Card width>
                        <CardBody>
                            <CardTitle><h1>{publication_id}</h1></CardTitle>
                            <CardSubtitle><h3>{user_username}</h3></CardSubtitle>
                            <CardText>{`${user_firstname} ${user_lastname} vende ${publication_amount} a ${publication_main_currency}`}</CardText>
                            {publication_selling === false  ? (<Button block onClick={this.handleBuy.bind(this)}>Comprar</Button>) : 
                             (<Button outline block disabled>Comprado</Button>)}
                        </CardBody>
                    </Card>
                </Container>
            </div>
        );
    }
}


export default withRouter(TransactionCard);
