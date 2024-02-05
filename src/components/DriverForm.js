import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Paper} from '@mui/material';
import {Container} from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendIcon from '@mui/icons-material/Send';

export default function DriverForm() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const handleClick = (e) => {
    e.preventDefault()
    const driver = { name, email, phone }
    fetch('http://localhost:8080/api/v1/driver/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(driver)
    }).then(response=>{
      if(response.status==200) {
          fetch('http://localhost:8080/api/v1/driver')
      .then(res => res.json())
      .then((result) => {
          setDrivers(result);
      });
          toast.success("Success");
      }
      else {
          toast.error("There has been an error processing the request.");
      }
  })
  }

  const handleDeleteEvent = (extId) => {
    const driver = { extId }
    fetch('http://localhost:8080/api/v1/driver', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(driver)
    }).then(response=>{
      if(response.status==200) {
          fetch('http://localhost:8080/api/v1/driver')
      .then(res => res.json())
      .then((result) => {
          setDrivers(result);
      });
          toast.success("Success");
      }
      else {
          toast.error("There has been an error processing the request.");
      }
  })
  }
  const [drivers, setDrivers] = React.useState([])

  React.useEffect(() => {
    fetch('http://localhost:8080/api/v1/driver')
      .then(res => res.json())
      .then((result) => {
        setDrivers(result);
      })
  }, []);
  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Add Driver</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField id="outlined-basic" label="Phone" variant="outlined" fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button variant="outlined" endIcon={<SendIcon />} onClick={handleClick}>Submit</Button>
        </Box>
        <ToastContainer/>
      </Paper>
      <h1 style={{ "justify-content": "center", "display": "flex" }}>Drivers</h1>
      <Paper elevation={3} style={paperStyle}>
        {drivers.map(driver =>
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left", display: "flex", "align-items": "center", "justify-content": "space-between" }} key={driver.extId}>
            ExtId: {driver.extId} <br />
            Name: {driver.name} <br />
            Email: {driver.email} <br />
            Phone: {driver.phone} <br />
            <Button style={{ "width": "auto", "height": "auto" }} variant="outlined" onClick={() => { handleDeleteEvent(driver.extId) }} startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Paper>
        )}
      </Paper>

    </Container>
  );
}