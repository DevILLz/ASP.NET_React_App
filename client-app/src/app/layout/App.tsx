import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage'
import ActivityForm from 'features/activities/form/ActivityForm';
import ActivityDetails from 'features/activities/details/ActivityDetails';
import TestErrors from 'features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from 'features/errors/NotFound';
function App() {
  const location = useLocation();
  return (
    <div>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '65px' }}>
              <Switch>
                <Route exact path='/activities' component={ActivityDashboard} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route path='/errors' component={TestErrors} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )} />
    </div>
  );
}

export default observer(App);
