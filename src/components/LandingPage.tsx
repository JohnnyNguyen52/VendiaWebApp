import { Button, Container, Typography, createStyles, makeStyles } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import dynamic from 'next/dynamic';
import AppBar from './appbar';
import { useUser } from '@auth0/nextjs-auth0/client';

const DynamicTextSlider = dynamic(() => import('./TextSlider'), {
  ssr: false,
});

function LandingPage() {
  const { user, error, isLoading } = useUser();
  return (
    <div>
      {/* {user && <AppBar/>} */}
      <Navbar />

      <div style={
        {
          marginTop: 50,
          display: 'flex',
          height: '100%',
          width: '75%',
          flexDirection: 'column',
          marginLeft: 25,
        }}>

        <DynamicTextSlider />
      </div>
    </div>
  );
}
export default LandingPage;

