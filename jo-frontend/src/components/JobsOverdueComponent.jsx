import React, { useEffect, useState } from "react";
import { getListOfJobsOverdue, updateContacted } from '../services/JobsOverdueService'
import { useNavigate } from "react-router-dom";

const JobsOverdueComponent = () => {

    const [jobsThatAreOverdue, setJobsOverdue] = useState([])

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
        updateContacted(id, true)
            .then((response) => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function backToStart() {
        navigator("/getalljobs")
    }

    return (
        <div className='container-fluid page page-wide'>
            <button className="btn btn-link btn-back" onClick={backToStart}>
                ← Tillbaka till start
            </button>

            <div className='page-header'>
                <div>
                    <h1 className="page-title">Företag som ska kontaktas</h1>
                    <p className='page-subtitle'>Ansökningar som skickades för mer än 14 dagar sedan</p>
                </div>
            </div>

            <div className="surface-card">
                <div className="table-container">
                    <table className="table app-table">
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
                                        <td className='cell-strong'>{job.company}</td>
                                        <td className='cell-muted'>{job.phoneNumber}</td>
                                        <td className='cell-muted'>{job.applicationDate}</td>
                                        <td><span className='days-pill'>{job.daysOverdue}</span></td>
                                        <td>
                                            <span className={`status-badge ${job.contacted ? 'status-accepted' : 'status-neutral'}`}>
                                                {job.contacted ? "Ja" : "Nej"}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-soft"
                                                onClick={() => updateContactedStatus(job.id)}>
                                                Ändra kontaktstatus
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {jobsThatAreOverdue.length === 0 &&
                        <div className='empty-state'>Inga företag behöver kontaktas just nu 🎉</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default JobsOverdueComponent;
