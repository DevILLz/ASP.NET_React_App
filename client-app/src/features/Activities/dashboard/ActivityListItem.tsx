import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Item, Image, Segment, Icon } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity'

interface Props {
    activity: Activity;
}

export default observer(function ActivityListItem({ activity }: Props) {
    return (
        <Segment.Group >
            <Segment>
                <Item.Group>
                    <Item id="itemHeader">
                        <Image src="/assets/user.png" size="tiny" circular />
                        <Item.Content >
                            <Item.Header content={activity.title} key={activity.id} as={Link} to={`/activities/${activity.id}`}/>
                            <Item.Description>
                                Temp blob
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {activity.date}
                    <Icon name='marker'/> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                comments?
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button icon='edit' size="mini" color='vk'
                                        floated="right"
                                        key={activity.id} as={Link} to={`/activities/${activity.id}`} />
            </Segment>
        </Segment.Group>
    )
})
