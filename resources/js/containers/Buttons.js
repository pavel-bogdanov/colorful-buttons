import React, { Component } from 'react';
import { Container, Alert } from 'react-bootstrap';
import Layout from '../hoc/Layout';
import Button from '../components/Button/Button';
import axios from 'axios';

class Buttons extends Component {
    state = {
        buttons: [],
        errors: false
    }

    buttonClickHanlder = (url, position) => {
        if (url != '') {
            window.open(url, "_blank");

        } else {
            this.props.history.push({ pathname: '/link/modify/' + position });
        }
    }

    componentDidMount() {
        axios.get('/api/buttons', { withCredentials: true })
            .then(response => {
                this.setState({ buttons: response.data });
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

        return (
            <Layout>
                <Container>
                    <div className="col-10 offset-1 col-lg-8 offset-lg-2">
                        {errors}
                        <div className="row justify-content-md-center">
                            {this.state.buttons.map(btn => (
                                <Button
                                    key={btn.position}
                                    title={btn.title}
                                    backgroundColor={btn.background_color}
                                    textColor={btn.text_color}
                                    borderColor={btn.border_color}
                                    clicked={() => this.buttonClickHanlder(btn.url, btn.position)} />
                            ))}
                        </div>
                    </div>
                </Container>
            </Layout>
        )
    }
}

export default Buttons;