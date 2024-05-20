import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { TextField, Box } from '@mui/material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function ProfileCard() {

  const [trips, setTrips] = useState([]);

  useEffect(()=>{

    const fetchTrips = async ()=>{
        try{
           const response = await fetch("http://localhost:8080/trips/getAll",{

            headers:{"Content-Type":"application/json",
            Authorization: 'Bearer ' + localStorage.getItem('token')}
        }).then(res=>res.json()).then((result)=>{setTrips(result);})
        }
        catch(error){
            console.log(error);
        }
    }
        fetchTrips();
        console.log(trips);
}, []);

  return (
    <>

    <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: "32px 64px",
      gap: "16px",
    }}
    >
    {trips.map((trip) =>(
    <Card style={{ width: '18rem' }} className='shadow'>
    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    <Card.Body>
      <Card.Title>{trip.name}</Card.Title>
      <Card.Text>
        {trip.description}
      </Card.Text>
        <Link className="btn btn-primary" to="/trips/ID/:ID">View Trip Profile</Link>
    </Card.Body>
  </Card>
))}
    </Box>
    </>
  )
}
