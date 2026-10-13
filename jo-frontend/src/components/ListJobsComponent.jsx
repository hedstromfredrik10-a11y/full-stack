import React, { useEffect, useState } from 'react'
import { listJobs, deleteJob } from '../services/JobService'
import { useNavigate } from 'react-router-dom'

const STATUS_CLASSES = {
    APPLIED: 'status-applied',
    INTERVIEWING: 'status-interviewing',
    ACCEPTED: 'status-accepted',
    REJECTED: 'status-rejected'
}

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
        <div className='container-fluid page page-wide'>
            <div className='page-header'>
                <div>
                    <h1 className='page-title'>Lista av jobb</h1>
                    <p className='page-subtitle'>
                        {jobs.length} {jobs.length === 1 ? 'ansökan' : 'ansökningar'}
                    </p>
                </div>
                <div className='page-actions'>
                    <button className='btn btn-soft' onClick={seeListOfJobsOverdue}>
                        Se lista av företag som ska kontaktas
                    </button>
                    <button className='btn btn-brand' onClick={addNewJob}>
                        + Lägg till ett nytt jobb
                    </button>
                </div>
            </div>

            <div className='surface-card'>
                <div className='table-container'>
                    <table className='table app-table'>
                        <thead>
                            <tr>
                                <th>Företag</th>
                                <th>Ansökningsdatum</th>
                                <th>Ansökningsstatus</th>
                                <th>Jobbansökningslänk</th>
                                <th>Telefonnummer</th>
                                <th>Åtgärder</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobs.map(job =>
                                    <tr key={job.id}>
                                        <td className='cell-strong'>{job.company}</td>
                                        <td className='cell-muted'>{job.applicationDate}</td>
                                        <td>
                                            <span className={`status-badge ${STATUS_CLASSES[job.jobStatus] || 'status-neutral'}`}>
                                                {job.jobStatus}
                                            </span>
                                        </td>
                                        <td className='cell-link' title={job.jobListingLink}>{job.jobListingLink}</td>
                                        <td className='cell-muted'>{job.companyPhoneNumber}</td>
                                        <td>
                                            <div className='row-actions'>
                                                <button
                                                    className='btn btn-sm btn-soft'
                                                    onClick={() => updateJobStatus(job.id)}>Uppdatera jobbstatus</button>
                                                <button
                                                    className='btn btn-sm btn-soft'
                                                    onClick={() => updateJobTitle(job.id)}>Uppdatera jobbtitel</button>
                                                <button
                                                    className='btn btn-sm btn-soft btn-soft-danger'
                                                    onClick={() => deleteJobById(job.id)}>Ta bort jobb</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {jobs.length === 0 &&
                        <div className='empty-state'>Inga jobb ännu. Lägg till din första ansökan!</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ListJobsComponent
