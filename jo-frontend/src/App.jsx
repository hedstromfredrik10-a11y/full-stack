import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import JobsComponent from './components/JobsComponent'
import ListJobsComponent from './components/ListJobsComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
