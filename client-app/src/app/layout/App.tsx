import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import LoadingComponent from './LoadingComponents';
import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
function App() {
  const {activityStore} = useStore();
  useEffect(() => { activityStore.loadActivities(); }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" />
  return (
    <div>
      <NavBar/>
      <Container style={{ marginTop: '65px' }}>
        <ActivityDashboard/>
      </Container>
    </div>
  );
}

export default observer(App);
