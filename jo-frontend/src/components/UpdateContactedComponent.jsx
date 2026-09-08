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
        <div className="card col-md-6 offset-md-3">
            <br />
            <div className="card-body">
                <h2 className="text-center">
                    Ändra kontakstatus
                </h2>
                <form>
                    <div className="form-group mb-2">
                        <label className="form-label">
                            Välj status
                        </label>
                        <select
                            className="form-control"
                            value={status}
                            onChange={(e) => setContactedStatus(e.target.value)}>
                            <option value=''>
                                Välj kontakstatus
                            </option>
                            <option value='Ja'>
                                Ja
                            </option>
                            <option value='Nej'>
                                Nej
                            </option>
                        </select>
                        <br />
                        <button className='btn btn-success' onClick={submitChange}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateContactedComponent