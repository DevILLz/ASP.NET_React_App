import LoadingComponent from 'app/layout/LoadingComponents';
import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm()
{
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadActivity, loading, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: "2022-03-18",
        description: '',
        category: '',
        city: '',
        venue: ''
    });
    useEffect(() => {
        if (id) loadActivity(id).then((activity) => setActivity(activity!))
    }, [id, loadActivity])
    
    function handleSubmit(){
        if (activity.id.length === 0) {
            activity.id = uuid();
            createActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
        else
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity..."/>
    return (
    <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete="off">

            <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange}/>
            <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange}/>
            <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange}/>
            <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange}/>
            <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange}/>
            <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange}/>

            <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
            <Button floated="right" negative type="button" content="Cancel" as={Link} to={`/activities/${activity.id}`}/>
        </Form>
    </Segment>
  )
})