import LoadingComponent from 'app/layout/LoadingComponents';
import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
import { Button, Card, Image } from 'semantic-ui-react'

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;
  if (!activity) return <LoadingComponent/>;
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
          <Button.Group widths="2" fluid>
            <Button color="blue" content="edit" onClick={() => openForm(activity.id)} />
            <Button color="red" content="cancel" onClick={cancelSelectedActivity}/>
          </Button.Group>
        </div>
      </Card.Content>
    </Card>
  )
})