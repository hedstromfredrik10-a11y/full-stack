import React, { useEffect, useState } from 'react'
import { listJobs, deleteJob, updateJobTitle } from '../services/JobService'
import { useNavigate } from 'react-router-dom'
import './ListJobsCSS.css';

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

    function deleteJobById(id) {
        if (!window.confirm("Är du säker på att du vill radera detta jobb? Åtgärden går inte att ångra")) {
            return;
        }

        deleteJob(id)
            .then((response) => {
                console.log(response.data);

                setJobs(jobs.filter(job => job.id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    }

    function updateJobStatus(id) {
        navigator(`/updatejobstatus/${id}`)
    }

    function updateJobTitle(id) {
        navigator(`/updatejobtitle/${id}`)
    }

    function seeListOfJobsOverdue() {
        navigator("/overduejobs/getalljobsoverdue")
    }

    return (
        <div className='container page'>
            <br />
            <h2 className="ListOfJobs">Lista av jobb</h2>
            <div className='table-container'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Företag</th>
                            <th>Ansökningsdatum</th>
                            <th>Ansökningsstatus</th>
                            <th>Jobansökningslänk</th>
                            <th>Telefonnummer</th>
                            <th>Åtgärder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map(job =>
                                <tr key={job.id}>
                                    <td>{job.company}</td>
                                    <td>{job.applicationDate}</td>
                                    <td>{job.jobStatus}</td>
                                    <td>{job.jobListingLink}</td>
                                    <td>{job.companyPhoneNumber}</td>
                                    <td>
                                        <div className="buttons">
                                            <button
                                                className='btn btn-secondary'
                                                onClick={() => updateJobStatus(job.id)}>Uppdatera jobbstatus</button>
                                            <button
                                                className='btn btn-secondary'
                                                onClick={() => deleteJobById(job.id)}>Ta bort jobb</button>
                                            <button
                                                className='btn btn-secondary'
                                                onClick={() => updateJobTitle(job.id)}>Uppdatera jobbtitel</button>
                                        </div>
                                    </td>

                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className="mb-3">
                <br />
                <button
                    className="btn btn-outline-dark me-2"
                    onClick={addNewJob}
                >
                    Lägg till ett nytt jobb 💰
                </button>
                <br />
                <button
                    className='btn btn-outline-dark me-2'
                    onClick={seeListOfJobsOverdue}
                >
                    Se lista av företag som ska kontaktas
                </button>
            </div>
        </div>
    )
}

export default ListJobsComponent
