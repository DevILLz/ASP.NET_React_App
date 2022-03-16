import { Activity } from 'app/models/activity';
import axios, { AxiosResponse } from 'axios';

const sleep =(delay: number) =>{
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';
// axios.interceptors.response.use(response => {
//     sleep(500).then(() => {
//         return response;
//     }).catch((err) => {
//         console.log(err);
//         return Promise.reject(err);
//     })
// })
const responseBody = <T> (response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}
const Activities ={
    list: () => requests.get<Activity[]>('/activities'),
}
const agent = {
    Activities
}
export default agent;
// useEffect(() => {
//     axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
//       setActivities(response.data);
//     })
//   }, [