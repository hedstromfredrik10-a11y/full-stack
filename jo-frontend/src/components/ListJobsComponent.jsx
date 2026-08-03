import React, { useEffect, useState } from 'react'
import { listJobs } from '../services/JobService'

const ListJobsComponent = () => {

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        listJobs()
            .then((response) => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []); 

    // useEffect(() => {
    //     listJobs().then((response) => {
    //         setJobs(response.data);
    //     }).catch(error => {
    //         console.error(error);
    //     })
    // })

    return (
        <div className='container'>
            <h2 className='text-center'>List of jobs</h2>
            <table className='table table-striped-columns table-bordered'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Företag</th>
                        <th>Ansökningsdatum</th>
                        <th>Ansökningsstatus</th>
                        <th>Jobansökningslänk</th>
                        <th>Telefonnummer</th>
                        <th>Kontaktad</th>
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
                                <td>{job.contacted ? "Ja" : "Nej"}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListJobsComponent
