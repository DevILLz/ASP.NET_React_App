import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import {Button,  Item, Segment, Label, Image, Grid} from 'semantic-ui-react';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { deleteActivity, activitiesByDate : activities, loading } = activityStore;

    const [target, setTarget] = useState('');
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content >
                            <Grid columns={2} divided >
                                <Grid.Column width={6}>
                                    <Image src={`/assets/categoryImages/${activity.category}.jpg`} verticalAlign="bottom" />
                                </Grid.Column>
                                <Grid.Column width={10} >
                                    <Button name={activity.id}
                                        size="mini"
                                        negative floated="right"
                                        loading={loading && target === activity.id}
                                        content="X" 
                                        onClick={(e) => handleActivityDelete(e, activity.id)} />
                                    <Item.Header as="a" content={activity.title} />
                                    <Item.Meta content={activity.date} format="yyyy-MM-dd" />
                                    <Item.Description>
                                        <div>{activity.description}</div>
                                        <div>{activity.city}, {activity.venue}</div>
                                    </Item.Description>
                                    <Item.Description>
                                        <Item.Extra>
                                            <Button floated="right" content="View" positive onClick={() => activityStore.selectActivity(activity.id)} />
                                            <Label content={activity.category}/>
                                        </Item.Extra>
                                    </Item.Description>
                                </Grid.Column>
                            </Grid>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
