"use client";

import * as React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import MainDrawer from '../../components/common/drawer';
import { DrawerHeader } from '../../components/common/drawerheader';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import config from "../../appconfig.json";
  
export default function App() {
  
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const userID = searchParams.get("id");

  useEffect(() => {
    if(loading === true){
      if(userID !== null){
        axios.get(config.api.url+userID).then((response) => {
          if(response.status == 200){
            let data = response.data.data;
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setAge(data.age);
            setLoading(false);
          }else{
            alert("Invalid ID");
            back();
          }
        });
      }
    }
  }); 

  function onSaved(){
    alert(`User data has Saved.`);
    back();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(userID !== null){
      //update
      axios
        .patch(config.api.url+userID, {
          firstName: firstName,
          lastName: lastName,
          age: age
        })
        .then(() => { onSaved(); })
        .catch((error) => { console.log(error.response); });
    }else{
      //create
      axios
        .post(config.api.url, {
          firstName: firstName,
          lastName: lastName,
          age: age
        })
        .then(() => { onSaved(); })
        .catch((error) => { console.log(error.response); });
    }
  }

  const onBack = (event) => {
    event.preventDefault();
    back();
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h3">
          User Form
        </Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              required
              id="firstName"
              label="FirstName"
              placeholder='Adam'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
              id="lastName"
              label="LastName"
              placeholder='Godson'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              required
              id="age"
              label="Age"
              placeholder='25'
              value={age}
              type="number"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={onBack}>Back</Button>
            <Button type="submit" variant="contained">Submit</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}