import { Button, Card, Image } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activity: Activity;
    CancelSelect:() => void;
    BeginEdit:(edit : boolean) => void;
}

export default function ActivityDetails({activity, CancelSelect, BeginEdit}: Props)
{
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header content={activity.title} />
        <Card.Meta content={activity.date} />
        <Card.Description content={activity.description} />
      </Card.Content>
      <Card.Content extra>
        <div>
          <Button.Group widths="2">
            <Button basic color="blue" content="edit" onClick={() => BeginEdit(true)} />
            <Button basic color="red" content="cancel" onClick={CancelSelect}/>
          </Button.Group>
        </div>
      </Card.Content>
    </Card>
  )
}