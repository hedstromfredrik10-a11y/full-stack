import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateContacted } from "../services/JobsOverdueService";

const UpdateContactedComponent = () => {

    const [status, setContactedStatus] = useState('')

    const { id } = useParams();

    const navigator = useNavigate('');

    function submitChange(e) {
        e.preventDefault();

        if (status == "Ja") {
            save(id, true);
        } else {
            save(id, false);
        }

    }

    function save(id, status) {
        updateContacted(id, status)
            .then((response) => {
                console.log(response.data);
                navigator('/overduejobs/getalljobsoverdue')
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="container-fluid page page-wide">
            <button className="btn btn-link btn-back" onClick={() => navigator('/overduejobs/getalljobsoverdue')}>
                ← Tillbaka till listan
            </button>

            <div className="surface-card form-card">
                <h1 className="form-card-title">Ändra kontaktstatus</h1>
                <p className="form-card-subtitle">Har du hört av dig till företaget?</p>

                <form>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="contactedStatus">
                            Välj status
                        </label>
                        <select
                            id="contactedStatus"
                            className="form-select"
                            value={status}
                            onChange={(e) => setContactedStatus(e.target.value)}>
                            <option value=''>Välj kontaktstatus</option>
                            <option value='Ja'>Ja</option>
                            <option value='Nej'>Nej</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button className='btn btn-brand px-4' onClick={submitChange}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateContactedComponent
