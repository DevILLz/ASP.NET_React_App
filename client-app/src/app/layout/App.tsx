import { Container } from 'semantic-ui-react';
import ActivityDashboard from 'features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage'
import ActivityForm from 'features/activities/form/ActivityForm'
import ActivityDetails from 'features/activities/details/ActivityDetails';
import TestErrors from 'features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from 'features/errors/NotFound';
import ServerError from 'features/errors/ServerError';
import LoginForm from 'features/users/LoginForm';
import { useStore } from 'app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponents';
import ModalContainer from 'app/common/modals/ModalContainer';
import ProfilePage from 'features/profiles/ProfilePage';
function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token)
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    else
      commonStore.setAppLoaded()
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading app..."/>

  return (
    <div>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer/>
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
                <Route path='/Profiles/:userName' component={ProfilePage} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )} />
    </div>
  );
}

export default observer(App);
