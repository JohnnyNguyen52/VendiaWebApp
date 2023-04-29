import { Button, Container, Typography, createStyles, makeStyles } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';




function LandingPage() {
  return (
    <div>
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

        <TextSlider />
      </div>
    </div>
  );
}

function TextSlider() {
  const [currentText, setCurrentText] = useState('A Doctor');
  const [wordIndex, setWordIndex] = useState(1);

  const timer = setInterval(() => {
    setWordIndex(wordIndex + 1);
    if (wordIndex % 3 === 0) {
      setCurrentText('A Doctor');
    } else if (wordIndex % 3 === 1) {
      setCurrentText('FDA');
    } else {
      setCurrentText('Bavaria');
    }
  }, 2500);

  return (
    <Typography variant="h2" style={
      {
        fontWeight: 600,

      }}>Want to do a pharmaceutical study? Start here if you are <span style={{
        color: "rgb(99, 93, 255)",
        border: '1px solid black',
        borderRadius: 25, paddingLeft: 25, paddingRight: 25, paddingBottom: 5
      }}> {currentText}</span>
    </Typography>
  );
}



export default LandingPage;

