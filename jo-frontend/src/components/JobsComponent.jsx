import React, { useState } from 'react'
import { createJob, updateJobStatus } from '../services/JobService'
import { useNavigate, useParams } from 'react-router-dom'
import { createJob, updateJobStatus } from '../services/JobService'

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
            if (!jobStatus) {
                setErrors({ ...errors, jobStatus: 'Please select a status' });
                return;
            }

            updateJobStatus(id, jobStatus)
                .then((response) => {
                    console.log(response.data);
                    navigator('/getalljobs')
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

        if (applicationDate) {
            errorsCopy.applicationDate = '';
        } else {
            errorsCopy.applicationDate = 'Application date is required';
            valid = false;
        }

        if (jobListingLink.trim()) {
            errorsCopy.jobListingLink = '';
        } else {
            errorsCopy.jobListingLink = 'Job listing link is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    return (
        <div className='container-fluid page page-wide'>
            <button className='btn btn-link btn-back' onClick={() => navigator('/getalljobs')}>
                ← Tillbaka till start
            </button>

            <div className='surface-card form-card'>
                <h1 className='form-card-title'>
                    {id ? 'Uppdatera jobbstatus' : 'Lägg till ett nytt jobb'}
                </h1>
                <p className='form-card-subtitle'>
                    {id ? 'Välj var i processen ansökan befinner sig.' : 'Fyll i uppgifterna om ansökan du har skickat.'}
                </p>

                <form>

                    {id ? (

                        <div className='mb-3'>
                            <label className='form-label' htmlFor='jobStatus'>
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
                            <div className='mb-3'>
                                <label className='form-label' htmlFor='company'>
                                    Company
                                </label>

                                <input
                                    id='company'
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

                            <div className='row'>
                                <div className='col-sm-6 mb-3'>
                                    <label className='form-label' htmlFor='applicationDate'>
                                        Application date
                                    </label>

                                    <input
                                        id='applicationDate'
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

                                <div className='col-sm-6 mb-3'>
                                    <label className='form-label' htmlFor='companyPhoneNumber'>
                                        Company phone number
                                    </label>

                                    <input
                                        id='companyPhoneNumber'
                                        type='tel'
                                        placeholder='Enter company phone number'
                                        name='company phone number'
                                        value={companyPhoneNumber}
                                        className='form-control'
                                        onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor='jobListingLink'>
                                    Job listing link
                                </label>

                                <input
                                    id='jobListingLink'
                                    type='url'
                                    placeholder='https://...'
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
                        </>

                    )}

                    <div className='form-actions'>
                        <button className='btn btn-brand px-4' onClick={saveJob}>
                            {id ? 'Update status' : 'Submit'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default JobsComponent
