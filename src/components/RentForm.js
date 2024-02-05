import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Grid, Paper} from '@mui/material';
import {Container} from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import './muiButton.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RentForm() {
    const paperStyle = { padding: '50px 20px', width: 800, "margin": "auto" }
    const formStyle = { padding: '50px 20px 30px', width: 800, margin: "auto" }
    const [driverName, setDriverName] = React.useState('')
    const [driverEmail, setDriverEmail] = React.useState('')
    const [driverPhone, setDriverPhone] = React.useState('')
    const [carLicensePlate, setCarLicensePlate] = React.useState('')
    const [rentExtId, setRentExtId] = React.useState('')

    const handleClick = (e) => {
        e.preventDefault()
        const rent = { driverName, driverEmail, driverPhone, carLicensePlate }
        fetch('http://localhost:8080/api/v1/rents/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rent)
        }).then(response=>{
            if(response.status==200) {
            fetch('http://localhost:8080/api/v1/rents')
            .then(res => res.json())
            .then((result) => {
                setCurrentRents(result);
            });
                toast.success("Success");
            }
            else {
                toast.error("There has been an error processing the request.");
            }
        })
    }
    const handleEndRentEvent = (e) => {
        e.preventDefault()
        const rent = { rentExtId }
        fetch('http://localhost:8080/api/v1/rents/end-rent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rent)
        }).then(response=>{
            if(response.status==200) {
                fetch('http://localhost:8080/api/v1/rents/finished')
            .then(res => res.json())
            .then((result) => {
                setFinishedRents(result);
            });
                toast.success("Success");
                fetch('http://localhost:8080/api/v1/rents')
                .then(res => res.json())
                .then((result) => {
                    setCurrentRents(result);
                });
            }
            else {
                toast.error("There has been an error processing the request.");
            }
        })
    }

    const handleDeleteEvent = (rentExtId) => {
        const rent = { rentExtId }
        fetch('http://localhost:8080/api/v1/rents', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rent)
        }).then(response=>{
            if(response.status==200) {
            fetch('http://localhost:8080/api/v1/rents/finished')
            .then(res => res.json())
            .then((result) => {
                setFinishedRents(result);
            });

            fetch('http://localhost:8080/api/v1/rents')
            .then(res => res.json())
            .then((result) => {
                setCurrentRents(result);
            })

                toast.success("Success");
            }
            else {
                toast.error("There has been an error.");
            }
        })
    }
    const [currentRents, setCurrentRents] = React.useState([])
    const [finishedRents, setFinishedRents] = React.useState([])

    React.useEffect(() => {
        fetch('http://localhost:8080/api/v1/rents')
            .then(res => res.json())
            .then((result) => {
                setCurrentRents(result);
            })
    }, []);

    React.useEffect(() => {
        fetch('http://localhost:8080/api/v1/rents/finished')
            .then(res => res.json())
            .then((result) => {
                setFinishedRents(result);
            })
    }, []);
    return (
        <Container style={{"maxWidth":"2000px"}}>
            <Grid container rowSpacing={4} direction="row" justifyContent="center" >
                <Grid item xs={6}>
                    <Paper elevation={1} style={formStyle}>
                        <h1 >Register Rent</h1>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 },
                            }}
                            noValidate
                            autoComplete="off">
                            <TextField id="outlined-basic" label="Driver Name" variant="outlined" fullWidth
                                value={driverName}
                                onChange={(e) => setDriverName(e.target.value)}
                            />

                            <TextField id="outlined-basic" label="Driver Email" variant="outlined" fullWidth
                                value={driverEmail}
                                onChange={(e) => setDriverEmail(e.target.value)}
                            />
                            <TextField id="outlined-basic" label="Driver Phone Number" variant="outlined" fullWidth
                                value={driverPhone}
                                onChange={(e) => setDriverPhone(e.target.value)}
                            />
                            <TextField id="outlined-basic" label="Car License Plate" variant="outlined" fullWidth
                                value={carLicensePlate}
                                onChange={(e) => setCarLicensePlate(e.target.value)}
                            />
                            <Button variant="outlined" endIcon={<SendIcon />} onClick={handleClick}>Submit</Button>
                           <ToastContainer/>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={1} style={formStyle}>
                        <h1>End Rent</h1>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="Rent External Id" variant="outlined" fullWidth
                                value={rentExtId}
                                onChange={(e) => setRentExtId(e.target.value)}
                            />
                            <Button variant="outlined" endIcon={<SendIcon />} onClick={handleEndRentEvent}>Submit</Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} style={paperStyle}>
                        <h1>Current Rents</h1>
                        {currentRents.map(rent =>
                            <Paper elevation={6} style={{ margin: "20px", padding: "10px", textAlign: "left", display: "flex", "align-items": "center", "justify-content": "space-between" }} key={rent.rentExtId}>
                                Rent Ext Id: {rent.rentExtId} <br />
                                Driver name: {rent.driverName} <br />
                                Driver email: {rent.driverEmail} <br />
                                Driver phone: {rent.driverPhone} <br />
                                Car brand: {rent.carBrand} <br />
                                License plate: {rent.carLicensePlate} <br />
                                Start Time: {rent.startTime} <br />
                                End Time: {rent.endTime} <br />
                                Duration: {rent.duration}h  <br />
                                Amount Due: {rent.amountDue}<br />
                                <Button style={{ "width": "auto", "height": "auto" }} variant="outlined" onClick={() => { handleDeleteEvent(rent.rentExtId) }} startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Paper>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} style={paperStyle}>
                        <h1>Finished Rents</h1>
                        {finishedRents.map(rent =>
                            <Paper elevation={6} style={{ margin: "20px", padding: "10px", textAlign: "left", display: "flex", "align-items": "center", "justify-content": "space-between" }} key={rent.rentExtId}>
                                Rent Ext Id: {rent.rentExtId} <br />
                                Driver name: {rent.driverName} <br />
                                Driver email: {rent.driverEmail} <br />
                                Driver phone: {rent.driverPhone} <br />
                                Car brand: {rent.carBrand} <br />
                                License plate: {rent.carLicensePlate} <br />
                                Start Time: {rent.startTime} <br />
                                End Time: {rent.endTime} <br />
                                Duration: {rent.duration}h  <br />
                                Amount Due: {rent.amountDue}  <br />
                                <Button style={{ "width": "auto", "height": "auto" }} variant="outlined" onClick={() => { handleDeleteEvent(rent.rentExtId) }} startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </Paper>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}