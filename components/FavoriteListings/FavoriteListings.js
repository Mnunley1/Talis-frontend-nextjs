import React from 'react';
import { Container, Col, Row, Form, Card, Input } from 'react-bootstrap'



class FavoriteListings extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Form className="w-100">
                        <Row className="m-0">
                            <h3>Favorite Listings</h3>
                            <Col className="ml-auto col-md-4">
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Control as="select" value="Choose...">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container>
        )
    }
}

export default FavoriteListings;