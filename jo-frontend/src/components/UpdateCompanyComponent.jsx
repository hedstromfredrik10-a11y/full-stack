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
        <div className='container-fluid page page-wide'>
            <button className='btn btn-link btn-back' onClick={() => navigator('/getalljobs')}>
                ← Tillbaka till start
            </button>

            <div className='surface-card form-card'>
                <h1 className='form-card-title'>Ändra företag</h1>
                <p className='form-card-subtitle'>Ange det nya företagsnamnet för ansökan.</p>

                <form>
                    <div className='mb-3'>
                        <label className='form-label' htmlFor='company'>Företag</label>
                        <input
                            id='company'
                            type='text'
                            className='form-control'
                            placeholder='Företagsnamn'
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <div className='form-actions'>
                        <button className='btn btn-brand px-4' onClick={save}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateCompanyComponent
