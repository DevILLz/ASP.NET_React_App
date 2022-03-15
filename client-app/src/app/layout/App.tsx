import React from 'react';
import 'semantic-ui-css/semantic.css'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/Activities/dashboard/ActivityDashboard';
function App() {



  return (
    <div>
      <NavBar />
      <Container style={{marginTop: '15px'}}>
        <ActivityDashboard/>
      </Container> 

    </div>
  );
}

export default App;
