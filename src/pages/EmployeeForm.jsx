import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";

import styled from "@emotion/styled";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  createEmployee,
  fetchEmployee,
  updateEmployee,
} from "../services/apiEmployee";

const Form = styled.form`
  width: 50rem;
  margin: 2.4rem auto;
`;

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

    navigate("/employee-data");
  }

  function handleReset() {
    setFullName("");
    setEmail("");
    setContactNumber("");
    setDateOfBirth("");
    setResidentialAddress("");
  }

  return (
    <Box component="div">
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="fullName"
              label="Full Name"
              variant="outlined"
              fullWidth
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="contactNumber"
              label="Contact Number"
              variant="outlined"
              type="number"
              fullWidth
              required
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="dateOfBirth"
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="residentialAddress"
              label="Address"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
              value={residentialAddress}
              onChange={(e) => setResidentialAddress(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              type="reset"
              size="large"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              size="large"
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
}

export default EmployeeForm;
