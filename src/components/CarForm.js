import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Paper} from '@mui/material';
import {Container} from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendIcon from '@mui/icons-material/Send';

export default function CarForm() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [year, setYear] = React.useState('')
  const [brand, setBrand] = React.useState('')
  const [model, setModel] = React.useState('')
  const [licensePlate, setLicensePlate] = React.useState('')
  const [price, setPrice] = React.useState('')
  const handleClick = (e) => {
    e.preventDefault()
    const car = { brand, model, year, licensePlate, price }
    fetch('http://localhost:8080/api/v1/car/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    }).then(response=>{
      if(response.status==200) {
          fetch('http://localhost:8080/api/v1/car')
      .then(res => res.json())
      .then((result) => {
          setCars(result);
      });
          toast.success("Success");
      }
      else {
          toast.error("There has been an error processing the request.");
      }
  })
  }

  const handleDeleteEvent = (extId) => {
    const car = { extId }
    fetch('http://localhost:8080/api/v1/car', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    }).then(response=>{
      if(response.status==200) {
          fetch('http://localhost:8080/api/v1/car')
      .then(res => res.json())
      .then((result) => {
          setCars(result);
      });
          toast.success("Success");
      }
      else {
          toast.error("There has been an error processing the request.");
      }
  })
}
  const [cars, setCars] = React.useState([])

  React.useEffect(() => {
    fetch('http://localhost:8080/api/v1/car')
      .then(res => res.json())
      .then((result) => {
        setCars(result);
      })
  }, []);
  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Add Car</h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Brand" variant="outlined" fullWidth
            value={brand}
            onChange={(e) => setBrand(e.target.value)} />
          <TextField id="outlined-basic" label="Model" variant="outlined" fullWidth
            value={model}
            onChange={(e) => setModel(e.target.value)} />
          <TextField id="outlined-basic" label="Year" variant="outlined" fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)} />
          <TextField id="outlined-basic" label="License Plate" variant="outlined" fullWidth
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)} />
          <TextField id="outlined-basic" label="Price per hour" variant="outlined" fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button variant="outlined" endIcon={<SendIcon />} onClick={handleClick}>Submit</Button>
          <ToastContainer/>
        </Box>
      </Paper>
      <h1 style={{ "justify-content": "center", "display": "flex" }}>Cars</h1>

      <Paper elevation={3} style={paperStyle}>
        {cars.map(car =>
          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left", display: "flex", "align-items": "center", "justify-content": "space-between" }} key={car.extId}>
            ExtId: {car.extId} <br />
            Brand: {car.brand} <br />
            Model: {car.model} <br />
            Year: {car.year} <br />
            License Plate: {car.licensePlate} <br />
            Price: {car.price}$ / h <br />
            <Button style={{ "width": "auto", "height": "auto" }} variant="outlined" onClick={() => { handleDeleteEvent(car.extId) }} startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </Paper>
        )}
      </Paper>

    </Container>
  );
}