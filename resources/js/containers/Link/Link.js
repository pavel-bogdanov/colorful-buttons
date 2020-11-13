import React, { Component } from 'react';
import { Container, Table, Button, Modal, Alert } from 'react-bootstrap';
import Layout from '../../hoc/Layout';
import Spinner from '../../UI/Spinner';
import { withRouter } from 'react-router';

class Link extends Component {
    state = {
        links: [],
        show: false,
        choosenLink: false,
        loading: true,
        errors: false
    }

    componentDidMount() {
        this.getLinks();
    }

    getLinks = () => {

        this.setState({ ...this.state, loading: true });

        axios.get('/api/buttons', { withCredentials: true })
            .then(response => {
                this.setState({ links: response.data });
                this.setState({ ...this.state, loading: false });
            })
            .catch(error => {
                if (error.response.status == 401) {
                    localStorage.removeItem('isLogged');
                    this.props.history.push({ pathname: '/login', });
                } else {
                    this.setState({ errors: error.response.data, loading: false });
                }
            });
    }

    handleClose = (confirm) => {
        if (confirm) {
            axios.delete('/api/buttons/' + this.state.choosenLink,
                {
                    withCredentials: true
                })
                .then(response => {
                    this.getLinks();
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

        this.setState({ ...this.state, show: false, choosenLink: false });
    }

    handleOpen = (position) => {
        this.setState({ ...this.state, show: true, choosenLink: position });
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
            render =
                <Container>
                    {errors}
                    <Table striped bordered hover className="table-responsive-md">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>URL</th>
                                <th>Title</th>
                                <th>Color</th>
                                <th>Background</th>
                                <th>Edit</th>
                                <th>Clear</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.links.map(link => (
                                <tr key={link.position}>
                                    <td>{link.position}</td>
                                    <td>{link.url}</td>
                                    <td>{link.title}</td>
                                    <td style={{ verticalAlign: "middle" }}>
                                        <div style={{ backgroundColor: link.text_color, height: 20 }}></div>
                                    </td>
                                    <td style={{ verticalAlign: "middle" }}>
                                        <div style={{ backgroundColor: link.background_color, height: 20 }}></div>
                                    </td>
                                    <td><Button variant="info" onClick={() => this.props.history.push({ pathname: '/link/modify/' + link.position, })}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={() => this.handleOpen(link.position)} >Clear</Button>{' '}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Modal show={this.state.show} onHide={() => this.handleClose(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Clear Link</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose(false)}>
                                No
                            </Button>
                            <Button variant="danger" onClick={() => this.handleClose(true)}>
                                Clear
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
        }

        return (
            <Layout>
                {render}
            </Layout>
        )
    }
}

export default withRouter(Link);