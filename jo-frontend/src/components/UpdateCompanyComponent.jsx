import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateJobTitle } from '../services/JobService'

const UpdateCompanyComponent = () => {

    const [company, setCompany] = useState('')

    const { id } = useParams();

    const navigator = useNavigate();

    function save(e) {
        e.preventDefault();

        updateJobTitle(id, company)
            .then((response) => {
                console.log(response.data);
                navigator('/getalljobs')
            })
            .catch(error => {
                console.error(error);
            });


    }

    return (
        <div className='card col-md-6 offset-md-3'>
            <h2 className='text-center'>Ändra företag</h2>
            <div className='card-body'>
                <div className='form-label'>
                    <form>
                        <input
                            type='text'
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        ></input>
                        <button
                            className='btn btn-success'
                            onClick={save}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateCompanyComponent