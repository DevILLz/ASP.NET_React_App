import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage'
import ActivityForm from 'features/activities/form/ActivityForm';
import ActivityDetails from 'features/activities/details/ActivityDetails';
function App() {
  const location = useLocation();
  return (
    <div>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '65px' }}>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
            </Container>
          </>
        )}/>
    </div>
  );
}

export default observer(App);
