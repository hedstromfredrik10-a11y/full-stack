import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import JobsComponent from './components/JobsComponent'
import ListJobsComponent from './components/ListJobsComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UpdateCompanyComponent from './components/UpdateCompanyComponent'
import JobsOverdueComponent from './components/JobsOverdueComponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path='/' element={<ListJobsComponent />}> </Route>
          {/* // http://localhost:3000/getalljobs */}
          <Route path='/getalljobs' element={<ListJobsComponent />}></Route>
          {/* // http://localhost:3000/insertJob */}
          <Route path='insertJob' element={<JobsComponent />}></Route>
          {/* // http://localhost:3000/updatejobstatus */}
          <Route path='/updatejobstatus/:id' element={<JobsComponent />}></Route>
          {/* // http://localhost:3000/updatejobtitle */}
          <Route path='/updatejobtitle/:id' element={<UpdateCompanyComponent />}></Route>
          {/* // http://localhost:3000/overduejobs/getalljobsoverdue */}
          <Route path='/overduejobs/getalljobsoverdue' element={<JobsOverdueComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
