import React, { useEffect, useState } from "react";
import { getListOfJobsOverdue, updateContacted } from '../services/JobsOverdueService'
import './OverdueCSS.css';
import { useNavigate, useParams } from "react-router-dom";

const JobsOverdueComponent = () => {

    const [jobsThatAreOverdue, setJobsOverdue] = useState([])

    const { id } = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        getListOfJobsOverdue()
            .then((response) => {
                setJobsOverdue(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function updateContactedStatus(id) {
        navigator(`/overduejobs/updateContactedStatus/${id}`)
    }

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
                            <th>Åtgärder</th>
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
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => updateContactedStatus(job.id)}>
                                            Ändra kontakstatus
                                        </button>
                                    </td>
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

