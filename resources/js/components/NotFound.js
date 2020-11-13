import React from 'react';
import { Container } from 'react-bootstrap';
import Layout from '../hoc/Layout';

const notFound = () => {
    return(
        <Container>
            <h2 className="text-primary mt-4" style={{textAlign: "center"}}>Oops!</h2>
            <h5 className="text-secondary" style={{textAlign: "center"}}>404 Page is Not Found</h5>
        </Container>
    );
}

export default notFound;