import React from 'react'

const HeaderComponent = () => {
    return (
        <header className='app-header'>
            <div className='container-fluid page-wide'>
                <a className='app-brand' href="https:/www.joborganizer.se">
                    <span className='app-brand-icon' aria-hidden='true'>💼</span>
                    Job organizer
                </a>
            </div>
        </header>
    )
}

export default HeaderComponent
