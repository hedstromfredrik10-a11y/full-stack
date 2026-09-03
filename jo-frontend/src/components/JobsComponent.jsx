import React, { useState } from 'react'
import { createJob, updateJobStatus } from '../services/JobService'
import { useNavigate, useParams } from 'react-router-dom'

const JobsComponent = () => {

    const [company, setCompany] = useState('')
    const [applicationDate, setApplicationDate] = useState('')
    const [jobListingLink, setJobListingLink] = useState('')
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState('')
    const [jobStatus, setJobStatus] = useState('')

    const { id } = useParams();

    const [errors, setErrors] = useState({
        company: '',
        applicationDate: '',
        jobListingLink: '',
        companyPhoneNumber: ''
    })

    const navigator = useNavigate();

    function saveJob(e) {
        e.preventDefault();

        if (id) {
            updateJobStatus(id, jobStatus)
                .then((response) => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            if (validateForm()) {
                const job = { company, applicationDate, jobListingLink, companyPhoneNumber }
                console.log(job)

                createJob(job)
                    .then((response) => {
                        console.log(response.data);
                        navigator('/getalljobs')
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }

        }

    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...errors }

        if (company.trim()) {
            errorsCopy.company = '';
        } else {
            errorsCopy.company = 'Company name is required';
            valid = false;
        }

        if (company.trim()) {
            errorsCopy.applicationDate = '';
        } else {
            errorsCopy.applicationDate = 'Application date is required';
            valid = false;
        }

        if (company.trim()) {
            errorsCopy.jobListingLink = '';
        } else {
            errorsCopy.jobListingLink = 'Job listing link is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    return (

        <div className='container'>

            <br />
            <br />

            <div className='row'>

                <div className='card col-md-6 offset-md-3'>

                    <h2 className='text-center'>
                        {id ? 'Update job status' : 'Add a new Job'}
                    </h2>

                    <div className='card-body'>

                        <form>


                            {id ? (

                                <div className='form-group mb-2'>

                                    <label className='form-label'>
                                        Job status
                                    </label>

                                    <select
                                        className='form-control'
                                        value={jobStatus}
                                        onChange={(e) => setJobStatus(e.target.value)}
                                    >

                                        <option value=''>
                                            Select status
                                        </option>

                                        <option value='APPLIED'>
                                            APPLIED
                                        </option>

                                        <option value='ACCEPTED'>
                                            ACCEPTED
                                        </option>

                                        <option value='REJECTED'>
                                            REJECTED
                                        </option>

                                        <option value='INTERVIEWING'>
                                            INTERVIEWING
                                        </option>

                                    </select>

                                </div>

                            ) : (

                                <>

                                    <div className='form-group mb-2'>

                                        <label className='form-label'>
                                            Company
                                        </label>

                                        <input
                                            type='text'
                                            placeholder='Enter company name'
                                            name='company'
                                            value={company}
                                            className={`form-control ${errors.company ? 'is-invalid' : ''}`}
                                            onChange={(e) => setCompany(e.target.value)}
                                        />

                                        {errors.company &&
                                            <div className='invalid-feedback'>
                                                {errors.company}
                                            </div>
                                        }

                                    </div>


                                    <div className='form-group mb-2'>

                                        <label className='form-label'>
                                            Application date
                                        </label>

                                        <input
                                            type='date'
                                            placeholder='Enter application date'
                                            name='application date'
                                            value={applicationDate}
                                            className={`form-control ${errors.applicationDate ? 'is-invalid' : ''}`}
                                            onChange={(e) => setApplicationDate(e.target.value)}
                                        />

                                        {errors.applicationDate &&
                                            <div className='invalid-feedback'>
                                                {errors.applicationDate}
                                            </div>
                                        }

                                    </div>


                                    <div className='form-group mb-2'>

                                        <label className='form-label'>
                                            Job listing link
                                        </label>

                                        <input
                                            type='url'
                                            placeholder='Enter job listing link'
                                            name='Job listing link'
                                            value={jobListingLink}
                                            className={`form-control ${errors.jobListingLink ? 'is-invalid' : ''}`}
                                            onChange={(e) => setJobListingLink(e.target.value)}
                                        />

                                        {errors.jobListingLink &&
                                            <div className='invalid-feedback'>
                                                {errors.jobListingLink}
                                            </div>
                                        }

                                    </div>


                                    <div className='form-group mb-2'>

                                        <label className='form-label'>
                                            Company phone number
                                        </label>

                                        <input
                                            type='number'
                                            placeholder='Enter company phone number'
                                            name='company phone number'
                                            value={companyPhoneNumber}
                                            className='form-control'
                                            onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                                        />

                                    </div>

                                </>

                            )}


                            <button
                                className='btn btn-success'
                                onClick={saveJob}
                            >

                                {id ? 'Update status' : 'Submit'}

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default JobsComponent