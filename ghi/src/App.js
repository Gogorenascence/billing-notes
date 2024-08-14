import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from './Display/NavBar';
import MainPage from './Display/MainPage';
import PatientsPage from './Patients/PatientsPage';
import PatientCreatePage from './Patients/PatientCreatePage';
import CarrierCreatePage from './Carriers/CarrierCreatePage';
import CarriersPage from './Carriers/CarriersPage';
import BillCreatePage from './Bills/BillCreatePage';
import BillsPage from './Bills/BillsPage';
import PatientPage from './Patients/PatientPage';
import BillPage from './Bills/BillPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className="content">
          <Routes>
            <Route index element={<MainPage/>} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/patientcreate/:patient_id" element={<PatientCreatePage />} />
            <Route path="/patients/:patient_id" element={<PatientPage />} />
            <Route path="/carriers" element={<CarriersPage />} />
            <Route path="/carriercreate" element={<CarrierCreatePage />} />
            <Route path="/bills" element={<BillsPage />} />
            <Route path="/billcreate/:bill_id" element={<BillCreatePage />} />
            <Route path="/bills/:bill_id" element={<BillPage />} />
            {/* <Route path="/directory" element={<Directory
              applications={applications}/>} />
            <Route path="/directory/:app_id" element={<AppDetails
              applications={applications}/>} />
            <Route path="/conditions" element={<ConditionsPage/>} />
            <Route path="/conditions/:condition_id" element={<ConditionsDetail/>} />
            <Route path="/contact" element={<Contact/>} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
