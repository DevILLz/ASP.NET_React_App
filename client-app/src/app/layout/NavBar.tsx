import { useStore } from 'app/stores/store';
import { Button, Container, Menu } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

export default observer(function NavBar() {
    const {activityStore} = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 5 }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={() => activityStore.openForm()} />
                </Menu.Item>
            </Container>

        </Menu>
    )
})