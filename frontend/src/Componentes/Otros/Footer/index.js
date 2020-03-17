import React, { Component } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import './styles.css'

export default class Footer extends Component {
    render() {
        return (
            <Container fluid className="footer">
               <Row>
                <Col>
                <h1 style={{ paddingTop: 50, textAlign: "center"}}> Footer</h1>
                </Col>
               </Row> 
            </Container>
        )
    }
}
