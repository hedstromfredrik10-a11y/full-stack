import React, { useEffect, useState } from "react";
import { getListOfJobsOverdue } from '../services/JobsOverdueService'
import './OverdueCSS.css';

const JobsOverdueComponent = () => {

    const [jobsThatAreOverdue, setJobsOverdue] = useState([])

    useEffect(() => {
        getListOfJobsOverdue()
            .then((response) => {
                setJobsOverdue(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className='container'>
            <br />
            <h2 className="ListOfJobsOverdue">Lista av jobb om ska kontaktas</h2>
            <div className="table-container">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Företag</th>
                            <th>Telefonnummer</th>
                            <th>Ansökningsdatum</th>
                            <th>Dagar sedan ansökning</th>
                            <th>Kontaktad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobsThatAreOverdue.map(job =>
                                <tr key={job.id}>
                                    <td>{job.company}</td>
                                    <td>{job.phoneNumber}</td>
                                    <td>{job.applicationDate}</td>
                                    <td>{job.daysOverdue}</td>
                                    <td>{job.contacted ? "Ja" : "Nej"}</td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>


            </div>

        </div>
    )
}

export default JobsOverdueComponent;

