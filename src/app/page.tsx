"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import MainDrawer from './components/common/drawer';
import { DrawerHeader } from './components/common/drawerheader';
import UserTable from './components/user/usertable';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function App() {

const { push } = useRouter();

function openForm(){
  push("/user/form");
}

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h3">
          Table Tutorial
        </Typography>
        <Button variant="contained" onClick={openForm}>New User</Button>
        <UserTable />
      </Box>
    </Box>
  );
}