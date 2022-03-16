import {Button,  Item, Segment, Label} from 'semantic-ui-react';

import { Activity } from '../../../app/models/activity'

interface Props {
    activities: Activity[];
    select:(id : string) => void;
    deleteActivity:(id : string) => void;
}

export default function ActivityList({activities, select, deleteActivity}: Props) {

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content >
                            <Item.Header as="a" content={activity.title}/>
                            <Item.Meta content={activity.date} format="yyyy-MM-dd"/>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>                                
                            </Item.Description>
                            <Item.Description>
                                <Item.Extra>
                                    <Button floated = "right" content="View" color="green" onClick={() => select(activity.id)}/>
                                    <Button floated = "right" content="Delete" color="red" onClick={() => deleteActivity(activity.id)}/>
                                    <Label>
                                        {activity.category}
                                        <Label.Detail content="" />
                                    </Label>
                                </Item.Extra>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
