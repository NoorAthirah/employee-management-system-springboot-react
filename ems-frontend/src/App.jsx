import './App.css'
import HeaderComponents from './components/HeaderComponents'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponents from './components/FooterComponents'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <HeaderComponents />
      
      <Routes>
        {/* http://localhost:3000/ */}
        <Route path="/" element={<ListEmployeeComponent />} />
        {/* http://localhost:3000/employees */}
        <Route path="/employees" element={<ListEmployeeComponent />} />

        <Route path="/add-employee" element={<EmployeeComponent />} />

        <Route path="/update-employee/:id" element={<EmployeeComponent />} />
      </Routes>
      <FooterComponents />
      </BrowserRouter>
    </div>
  )
}

export default App