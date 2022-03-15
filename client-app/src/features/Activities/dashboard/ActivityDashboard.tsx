import React, { useEffect, useState } from 'react';
import {Grid} from 'semantic-ui-react';
import { Container, List } from 'semantic-ui-react';

import axios from 'axios';
import { Activity } from '../../../app/models/activity'

interface Props {
    activityes: Activity[]
}

// export default function ActivityDashboard({activityes}: Props){
export default function ActivityDashboard() {
    const [activities, setActivities] = useState<Activity[]>([]);

        useEffect(() => {
          axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
            setActivities(response.data);
          })
        }, [])

    return (
        
        <Grid>
            <Grid.Column width="10">
                <List>
                    {activities.map(activity => (
                        <List.Item key={activity.id} style={{ color: '#cccccc', fontSize: '18px', fontWeight: 'bold', fontFamily: 'Veranda' }}>

                            {activity.category}

                            <List.Item key={activity.id} style={{ color: '#aaaaaa', fontSize: '12px' }}>
                                {activity.city} / {activity.venue}
                            </List.Item>

                        </List.Item>
                    ))}

                </List>
            </Grid.Column>
        </Grid>
    )
}