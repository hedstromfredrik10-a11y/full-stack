import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/joborganizer";

export const listJobs = () => axios.get(REST_API_BASE_URL + "/getalljobs");

export const createJob = (job) => axios.post(REST_API_BASE_URL + "/insertJob", job)

export const deleteJob = (id) => {
    return axios.post(
        REST_API_BASE_URL + "/deletejob",
        null,
        {
            params: {
                Id: id
            }
        }
    )
}

export const updateJobStatus = (id, jobStatus) => {
    return axios.post(
        REST_API_BASE_URL + "/updatejobstatus",
        null,
        {
            params: {
                Id: id,
                jobStatus: jobStatus
            }
        }
    )
}

export const updateJobTitle = (id, Name) => {
    return axios.post(
        REST_API_BASE_URL + "/updatejobtitle",
        null,
        {
            params: {
                Id: id,
                Name: Name
            }
        }
    )
}

