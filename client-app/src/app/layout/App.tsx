import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

import { Activity } from 'app/models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  function handleEditActivity(edit: boolean) {
    console.log(edit);
    setEditMode(edit === editMode ? false : edit);
  }

  function handleSelectActivity(id: string | undefined) {
    handleEditActivity(false);
    id ?
      setSelectedActivity(activities.find(x => x.id === id))
      :
      setSelectedActivity(undefined);
  }
  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        handleEditActivity(false);
        setSubmitting(false);
      })
    }
    else {
      activity.id = uuid(); agent.Activities.create(activity).then(() => { setActivities([...activities, { ...activity, id: uuid() }]); })
      setActivities([...activities, activity]);
      handleEditActivity(false);  
      setSubmitting(false);
    }
   
  }
  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => { 
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false);
    })    
  }
  useEffect(() => {
    agent.Activities.list().then(response => {
    let activities: Activity[] = response;
    activities.forEach(x => x.date = x.date.split('T')[0])
    setActivities(activities);
    setLoading(false);
  })}, [])

  if (loading) return <LoadingComponent content="Loading app" />
  return (
    <div>
      <NavBar openForm={handleEditActivity} cancelSelectedActivity={() => handleSelectActivity(undefined)}/>
      <Container style={{ marginTop: '65px' }}>
        <ActivityDashboard
          selectActivity={handleSelectActivity}
          beginEdit={handleEditActivity}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          selectedActivity={selectedActivity} activities={activities} editMode={editMode}
          submitting={submitting} />
      </Container>

    </div>
  );
}

export default App;
