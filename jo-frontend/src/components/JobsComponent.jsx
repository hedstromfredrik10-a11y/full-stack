import React, { useState } from 'react'
import { createJob } from '../services/JobService'
import { useNavigate } from 'react-router-dom'

const JobsComponent = () => {

    const [company, setCompany] = useState('')
    const [applicationDate, setApplicationDate] = useState('')
    const [jobListingLink, setJobListingLink] = useState('')
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState('')

    const navigator = useNavigate();

    function saveJob(e) {
        e.preventDefault();

        const job = { company, applicationDate, jobListingLink, companyPhoneNumber }
        console.log(job)

        createJob(job).then((response) => {
            console.log(response.data);
            navigator('/getalljobs')
        })
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Add a new Job</h2>
                    <div className='card-body'></div>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Company</label>
                            <input
                                type='text'
                                placeholder='Enter company name'
                                name='company'
                                value={company}
                                className='form-control'
                                onChange={(e) => setCompany(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Application date</label>
                            <input
                                type='date'
                                placeholder='Enter application date'
                                name='application date'
                                value={applicationDate}
                                className='form-control'
                                onChange={(e) => setApplicationDate(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Job listing link</label>
                            <input
                                type='url'
                                placeholder='Enter job listing link'
                                name='Job listing link'
                                value={jobListingLink}
                                className='form-control'
                                onChange={(e) => setJobListingLink(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Company phone number</label>
                            <input
                                type='number'
                                placeholder='Enter compnay phone number'
                                name='company phone number'
                                value={companyPhoneNumber}
                                className='form-control'
                                onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                            >
                            </input>
                        </div>

                        <button className='btn btn-success' onClick={saveJob}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JobsComponent