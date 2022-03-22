import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'

export default function HomePage() {
    return(
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted >
                    <Image size='massive' src='/assets/Logo.png' alt='logo' style={{marginBottom:12}}/>
                    Reactiv
                </Header>
                <Header as='h2' inverted content='Welcome to Reactiv'/>
                <Button as={Link} to='/activities' size='huge' inverted content="Take me to the Activities!"/>
            </Container>
        </Segment>
    )
}