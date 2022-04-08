import PhotoUploadWidget from "app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "app/models/profile";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";
export default observer(function ProfileFollowings() {
    const {profileStore: {profile, followings, loadingFollowings, activeTab}} = useStore();

    return (
        <Tab.Pane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='user' 
                    content={activeTab === 3 ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`} />                    
                </Grid.Column>
                <Grid.Column width={16}>
                        <Card.Group itemPerRow={4}>
                            {followings.map(profile => (
                                <ProfileCard key ={profile.userName} profile={profile}/>
                            ))}
                        </Card.Group>
                    </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})