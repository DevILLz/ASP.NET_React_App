import agent from 'app/api/agent';
import { Activity } from 'app/models/activity'
import { format } from 'date-fns';
import { makeAutoObservable, runInAction } from 'mobx'

export default class ActivityStore {
    activities = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false
    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activities.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }
    get groupedActivitiesByDate() {
        return Object.entries(this.activitiesByDate.reduce((activities, activity) => {
            const date = format(activity.date!, 'dd MMM yyyy');
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as {[key : string]: Activity[]}))
    }
    loadActivities = async () => {
        this.setLoadingInitial(true);
        const activities = await agent.Activities.list();
        try {
            // Не пихать async\await внутрь
            activities.forEach(x => this.setActivity(x))
            this.setLoadingInitial(false);
        }
        catch (e) {
            console.log(e);
            this.setLoadingInitial(false);
        }
    }
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id)
                this.setActivity(activity);
                runInAction(() => { this.selectedActivity = activity; })                
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }

        }
    }
    private setActivity(activity: Activity) {
        activity.date = new Date(activity.date!)
        this.activities.set(activity.id, activity)
    }
    private getActivity = (id: string) => {
        return this.activities.get(id);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activities.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activities.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activities.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}