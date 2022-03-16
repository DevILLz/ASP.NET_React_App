import { ChangeEvent } from 'react';
import { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activity: Activity | undefined;
    CancelEdit:(edit : boolean) => void;
    CreateOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({activity : selectedActivity, CancelEdit, CreateOrEdit}: Props)
{
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }
    const [activity, setActivity] = useState(initialState);

    function handleSubmit(){
        console.log(activity);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }
    return (
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete="off">

            <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange}/>
            <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange}/>
            <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange}/>
            <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange}/>
            <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange}/>
            <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange}/>

            <Button floated="right" positive type="submit" content="Submit" onClick={() => CreateOrEdit(activity)}/>
            <Button floated="right" type="button" content="Cancel" onClick={() => CancelEdit(false)}/>
        </Form>
    </Segment>
  )
}