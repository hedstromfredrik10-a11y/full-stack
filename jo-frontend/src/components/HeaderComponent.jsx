import React from 'react'
import './HeaderCSS.css'

const HeaderComponent = () => {
    return (
        <div>
            <header className='header-component'>
                <nav className='navbar navbar-dark bg-dark'>
                    <a className="navbar-brand" href="https:/www.joborganizer.se">Job organizer</a>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent