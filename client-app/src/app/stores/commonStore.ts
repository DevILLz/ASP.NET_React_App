import { ServerError } from "app/models/ServerError";
import { makeAutoObservable } from "mobx";

export default class CommonStore{
    error: ServerError | null = null;
    constructor(){
        makeAutoObservable(this);
    }
    setServerError = (err: ServerError) => {
        this.error = err;
    }
}