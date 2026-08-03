import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/joborganizer";

export const listJobs = () => axios.get(REST_API_BASE_URL + "/getalljobs");
