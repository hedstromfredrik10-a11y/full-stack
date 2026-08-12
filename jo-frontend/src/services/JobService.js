import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/joborganizer";

export const listJobs = () => axios.get(REST_API_BASE_URL + "/getalljobs");

export const createJob = (job) => axios.post(REST_API_BASE_URL + "/insertJob", job) 