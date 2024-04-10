import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createEmployee,
  fetchEmployee,
  updateEmployee,
} from "../services/apiEmployee";

// generateId: Function to generate random unique IDs
function generateId() {
  const randomNumber = Math.floor(Math.random() * 1000);
  const timestamp = Date.now();
  const uniqueId = `${randomNumber}${timestamp}`;
  return uniqueId;
}

function EmployeeForm() {
  const navigate = useNavigate();
  const { id: updateUserId } = useParams();

  // States for form input
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");

  // Fetch data of user if id exists in url & update all states
  useEffect(
    function () {
      async function fetchData() {
        const data = await fetchEmployee(updateUserId);
        const {
          fullName,
          email,
          contactNumber,
          dateOfBirth,
          residentialAddress,
        } = data;
        setFullName(fullName);
        setEmail(email);
        setContactNumber(contactNumber);
        setDateOfBirth(dateOfBirth);
        setResidentialAddress(residentialAddress);
      }
      if (updateUserId) fetchData();
    },
    [updateUserId]
  );

  // Form submit function to create or to update an employee
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !fullName ||
      !email ||
      !contactNumber ||
      !dateOfBirth ||
      !residentialAddress
    )
      return;

    const id = updateUserId || generateId();

    const newEmployee = {
      id,
      fullName,
      email,
      contactNumber,
      dateOfBirth,
      residentialAddress,
    };

    if (updateUserId) updateEmployee(newEmployee);
    else createEmployee(newEmployee);

    navigate("/");
  }

  return (
    <Box component="div">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "50rem",
          margin: "2.4rem auto",
        }}
      >
        <TextField
          fullWidth
          id="fullName"
          label="FullName"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          id="contactNumber"
          label="Contact Number"
          variant="outlined"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <TextField
          fullWidth
          id="dateOfBirth"
          label="Date of birth"
          variant="outlined"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <TextField
          fullWidth
          id="residentialAddress"
          label="Residential address"
          variant="outlined"
          value={residentialAddress}
          onChange={(e) => setResidentialAddress(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default EmployeeForm;