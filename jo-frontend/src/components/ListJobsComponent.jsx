import React, { useEffect, useState } from 'react'
import { listJobs } from '../services/JobService'
import { useNavigate } from 'react-router-dom'

const ListJobsComponent = () => {

    const [jobs, setJobs] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        listJobs()
            .then((response) => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function addNewJob() {
        navigator('/insertJob')
    }

    function deleteJob() {
        navigator('/deletejob')
    }

    function updateJobStatus(id) {
        navigator(`/updatejobstatus/${id}`)
    }

    return (
        <div className='container page'>
            <br/>
            <h2 className="text-center">List of jobs</h2>

            <div className="mb-3">
                <button
                    className="btn btn-outline-dark me-2"
                    onClick={addNewJob}
                >
                    INSERT A NEW JOB
                </button>

                <button
                    className="btn btn-outline-dark"
                    onClick={deleteJob}
                >
                    DELETE JOB
                </button>
            </div>

            <div className='table-container'>
                <table className='table table-striped-columns table-bordered'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Företag</th>
                            <th>Ansökningsdatum</th>
                            <th>Ansökningsstatus</th>
                            <th>Jobansökningslänk</th>
                            <th>Telefonnummer</th>
                            <th>Åtgärder</th>
                            {/* <th>Kontaktad</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map(job =>
                                <tr key={job.id}>
                                    <td>{job.id}</td>
                                    <td>{job.company}</td>
                                    <td>{job.applicationDate}</td>
                                    <td>{job.jobStatus}</td>
                                    <td>{job.jobListingLink}</td>
                                    <td>{job.companyPhoneNumber}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateJobStatus(job.id)}>Uppdatera jobbstatus</button>
                                    </td>
                                    {/* <td>{job.contacted ? "Ja" : "Nej"}</td> */}
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListJobsComponent
