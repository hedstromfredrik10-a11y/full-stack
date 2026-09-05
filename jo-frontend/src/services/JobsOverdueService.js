import axios from "axios";

const REST_API_OVERDUE_URL = "http://localhost:8080/api/joborganizer/overduejobs";

export const getListOfJobsOverdue = () => axios.get(REST_API_OVERDUE_URL + "/getalljobsoverdue")