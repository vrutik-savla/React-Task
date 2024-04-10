import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeData from "./pages/EmployeeData";
import EmployeeForm from "./pages/EmployeeForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<EmployeeData />} />

        <Route path="employee-data" element={<EmployeeData />} />

        <Route path="employee-form" element={<EmployeeForm />} />
        <Route path="employee-form/:id" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
