import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    // activity: Activity;
    openForm: (edit: boolean) => void;
    cancelSelectedActivity: () => void;
}

export default function NavBar(props: Props) {
    function CreateActivity() {
        props.cancelSelectedActivity();
        props.openForm(true);
    }
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 5 }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button color="vk" content="Create Activity" onClick={CreateActivity} />
                </Menu.Item>
            </Container>

        </Menu>
    )
}