import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container, Button, Card, Row, Col, Form, Alert } from 'react-bootstrap';
import Layout from '../../hoc/Layout';
import Spinner from '../../UI/Spinner';

class ModifyLink extends Component {

    state = {
        id: '',
        url: '',
        title: '',
        background_color: '',
        text_color: '',
        loading: true,
        errors: false
    }

    saveHandler = () => {
        let url = '/api/buttons';

        if (this.state.id != '') {
            url = url + '/' + this.state.id;
        }

        axios.post(url,
            {
                url: this.state.url,
                title: this.state.title,
                background_color: this.state.background_color,
                text_color: this.state.text_color,
                position: this.props.match.params.position
            },
            {
                withCredentials: true
            })
            .then(response => {
                this.props.history.push({ pathname: '/buttons', });
            })
            .catch(error => {
                if (error.response.status == 401) {
                    localStorage.removeItem('isLogged');
                    this.props.history.push({ pathname: '/login', });
                } else {
                    this.setState({ errors: error.response.data });
                }
            });
    }

    componentDidMount() {
        axios.get('/api/buttons/' + this.props.match.params.position, { withCredentials: true })
            .then(response => {

                if (response.data.length > 0) {
                    this.setState({
                        id: response.data[0].id,
                        url: response.data[0].url,
                        title: response.data[0].title,
                        background_color: response.data[0].background_color,
                        text_color: response.data[0].text_color,
                    });
                }

                this.setState({ links: response.data });
                this.setState({ ...this.state, loading: false });
            })
            .catch(error => {
                if (error.response.status == 401) {
                    localStorage.removeItem('isLogged');
                    this.props.history.push({ pathname: '/login', });
                } else {
                    this.setState({ errors: error.response.data });
                }
            });
    }

    render() {
        let errors = "";

        if (this.state.errors) {
            errors = <Alert variant="danger">
                <Alert.Heading>Errors</Alert.Heading>
                {Object.keys(this.state.errors).map((k) => {
                    return <p key={k}>{this.state.errors[k][0]}</p>;
                })}
            </Alert>
        }

        let render = <Spinner />

        if (!this.state.loading) {
            render = <Container className="py-4">
                <div className="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <Card md="justify-content-md-center">
                        <Card.Header>
                            <Row className="justify-content-md-center">
                                <Col md="12">
                                    <h2 style={{textAlign: "center", color: "#007bff"}}>Modify URL</h2>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    {errors}
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="url">
                                        <Form.Label>URL</Form.Label>
                                        <Form.Control type="text" placeholder="URL..." value={this.state.url} onChange={(event) => this.setState({ url: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" placeholder="Title..." value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="text_color">
                                        <Form.Label>Text Color</Form.Label>
                                        <Form.Control type="color" placeholder="Choose color" value={this.state.text_color} onChange={(event) => this.setState({ text_color: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Form.Group controlId="background_color">
                                        <Form.Label>Background Color</Form.Label>
                                        <Form.Control type="color" placeholder="Choose color..." value={this.state.background_color} onChange={(event) => this.setState({ background_color: event.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="6">
                                    <Button className="btn-block" variant="success" type="submit" onClick={this.saveHandler}>Save</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        }

        return (
            <Layout>
                {render}
            </Layout>

        )
    }
}

export default withRouter(ModifyLink);