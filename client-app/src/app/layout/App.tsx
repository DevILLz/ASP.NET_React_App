import {v4 as uuid} from 'uuid';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

import { Activity } from 'app/models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import agent from '../api/agent';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  function handleEditActivity(edit: boolean) {
    setEditMode(edit === editMode ? false : edit);
  }
  function handleSelectActivity(id: string | undefined) {
    setEditMode(false);
    id ?
      setSelectedActivity(activities.find(x => x.id === id))
      :
      setSelectedActivity(undefined);
  }
  function handleCreateOrEditActivity(activity: Activity) {
    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) 
    : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
function handleDeleteActivity(id: string) {
  setActivities([...activities.filter(x => x.id !== id)])
}

  useEffect(() => {
    
    agent.Activities.list().then(response => 
      { 
        let activities: Activity[] =response;
        activities.forEach(x => x.date = x.date.split('T')[0])
        setActivities(activities);
      })
  }, [])
  return (
    <div>
      <NavBar openForm={handleEditActivity} cancelSelectedActivity={() => handleSelectActivity(undefined)} />
      <Container style={{ marginTop: '65px' }}>
        <ActivityDashboard 
        selectActivity={handleSelectActivity} 
        beginEdit={handleEditActivity} 
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        selectedActivity={selectedActivity} activities={activities} editMode={editMode} />
      </Container>

    </div>
  );
}

export default App;
