import React, { Component } from 'react';
import { Container, Row, Col, Label, Input, Jumbotron, Button } from 'reactstrap';
import NavBar from '../generics/navbar/NavBar';
import './styles.css';
import swal from 'sweetalert';
import * as Api from './../../api/Methods';
import Axios from 'axios';

class Offer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currencies: []
        };
    }

    handleClickPublish(event) {
        event.preventDefault();

        let amount = this.amountInput.value;
        let currencyIso = this.currencyInput.value.split("<cur>")[0];
        let currency = this.currencyInput.value.split("<cur>")[1];
        let publicationType = this.publicationTypeInput.value;
        let publication_selling = true;

        let infoText = "";
        let infoTitle = "";

        if(publicationType === "C") {
            infoTitle =  "¿Seguro desea publicar la oferta de compra?";
            infoText =  `Se hará una publicación de compra por ${amount} ${currencyIso}`;
            publication_selling = false;
        } else {
            infoTitle =  "¿Seguro desea publicar la oferta de venta?";
            infoText =  `Se hará una publicación de venta por ${amount} ${currencyIso}`;
        }

        let publication = {
            publication_main_currency: currency,
            publication_selling : publication_selling,
            publication_amount : amount,
            publication_user_id : 1,
        }

        swal({
            title: infoTitle,
            text: infoText,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willPublish) => {
            if (willPublish) {
                this.doPublishPost(publication);
                swal("La operación se ha completado con exito!", {
                    icon: "success",
                });
            } else {
                swal("La operación se ha cancelado");
            }
        });
    }

    doPublishPost(publication) {
        let apiUrlPost = Api.default.baseUrl + `Publications?currency_id=${publication.publication_main_currency}&selling=${publication.publication_selling}&price=${0}&amount=${publication.publication_amount}&user_id=${publication.publication_user_id}`;

        Axios.post(apiUrlPost, publication)
        .then(response => {
            console.log(response);
            console.log(response.data);
        });
    }

    componentDidMount() {
        Axios.get(Api.default.baseUrl + "Currencies")
            .then(response => {
                console.log(response.data);
                this.setState({ currencies: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="offer-layout">
                    <Container>
                        <Row>
                            <Col>
                                <Label>Monto</Label>
                                <Input type="number" innerRef={amountInput => this.amountInput = amountInput} />
                            </Col>
                            <Col>
                                <Label>Moneda</Label>
                                <Input type="select" innerRef={currencyInput => this.currencyInput = currencyInput}>
                                    {
                                        this.state.currencies.map(currencies => {
                                            let val = currencies.currency_iso + "<cur>" + currencies.currency_id;
                                            return <option key={currencies.currency_id} value={val}>{currencies.currency_iso}</option>;
                                        })
                                    }
                                </Input>
                            </Col>
                            <Col>
                                <Label>Tipo publicación</Label>
                                <Input type="select" innerRef={publicationTypeInput => this.publicationTypeInput = publicationTypeInput}>
                                    <option value="C">Compra</option>
                                    <option value="V">Venta</option>
                                </Input>
                            </Col>
                            <Col>
                                <Button className="buttonPublish" color="primary" size="lg" onClick={this.handleClickPublish.bind(this)}>Publicar</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Offer;
