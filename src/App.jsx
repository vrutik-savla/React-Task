import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import EmployeeData from "./pages/EmployeeData";
import EmployeeForm from "./pages/EmployeeForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="employee-data" />} />

          <Route path="employee-data" element={<EmployeeData />} />

          <Route path="employee-form" element={<EmployeeForm />} />
          <Route path="employee-form/:id" element={<EmployeeForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
