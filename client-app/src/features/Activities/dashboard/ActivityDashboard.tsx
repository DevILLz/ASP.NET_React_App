import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity'

import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';



interface Props {
    editMode : boolean;
    activities : Activity[];
    selectedActivity : Activity | undefined;
    beginEdit: (edit : boolean) => void;
    selectActivity: (id: string | undefined) => void;
    deleteActivity: (id: string) => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean; 
}

export default function ActivityDashboard({editMode, beginEdit, selectActivity, createOrEdit, deleteActivity, activities, selectedActivity, submitting} : Props) {
    
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities ={activities} select={selectActivity} deleteActivity={deleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width="6">
                {selectedActivity && !editMode && <ActivityDetails activity ={selectedActivity} CancelSelect={() => selectActivity(undefined)} BeginEdit={beginEdit}/>}
                {editMode && <ActivityForm activity ={selectedActivity} CancelEdit={beginEdit} CreateOrEdit={createOrEdit} submitting={submitting} />}                
            </Grid.Column>
        </Grid>
    )
}