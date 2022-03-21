import { Container, Menu } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

export default observer(function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item exact as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 5 }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities" />
                <Menu.Item as={NavLink} to='/createActivity' content="Create Activity"/>
            </Container>

        </Menu>
    )
})