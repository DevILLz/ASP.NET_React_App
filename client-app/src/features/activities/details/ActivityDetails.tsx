import LoadingComponent from 'app/layout/LoadingComponents';
import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import ActivityDetailedHeader from './ActivityDetaliedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity} = activityStore;
  const {id} = useParams<{id: string}>();

useEffect(() => { 
  if (id) loadActivity(id);
  return () => clearSelectedActivity();
}, [id, loadActivity])
  if (loadingInitial || !activity) return <LoadingComponent/>;
  return (
    <Grid>
      <Grid.Column width={10}>
         <ActivityDetailedHeader activity={activity}/>
         <ActivityDetailedInfo activity={activity}/>
         <ActivityDetailedChat activityId={activity.id}/>
      </Grid.Column>
      <Grid.Column width={6}>
         <ActivityDetailedSidebar activity={activity}/>         
      </Grid.Column>
    </Grid>
  )
})