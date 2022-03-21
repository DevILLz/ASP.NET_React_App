import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

export default function HomePage() {
    return(
        <Container style={{ marginTop: '7em', color: '#CCCCCC' }}>
            <h1>Home</h1>
            <h3>Go to <Link to='/activities'>Activities</Link></h3>
        </Container>
    )
}