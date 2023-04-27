import { Button, Container, Typography, createStyles, makeStyles } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';




function LandingPage() {
return (
<div>
    <Navbar/>

    <div style={
      {
      marginTop: 50, 
      display: 'flex', 
      height: '100%', 
      width: '75%',
      flexDirection: 'column',
      marginLeft:25, 
      }}>

      <Typography><TextSlider/></Typography>
    </div>
  </div>
  );
}

function TextSlider() {
  const [currentText, setCurrentText] = useState('Text');
  const words = currentText.split(' ');
  useEffect(() => {
    let wordIndex = -1;
    const timer = setInterval(() => {
      wordIndex++;
      const newWords = [...words];
      if (wordIndex % 3 === 0) {
        newWords[newWords.length - 1] = 'Doctor';
      } else if (wordIndex % 3 === 1) {
        newWords[newWords.length - 1] = 'Company';
      } else {
        newWords[newWords.length - 1] = 'Patient';
      }
      setCurrentText(newWords.join(' '));
    }, 2500);
    return () => clearInterval(timer);
  }, [words]);

  return (
    <Typography variant="h2"style={
      {
      fontWeight:600, 
      
      }}>Want to do a pharmaceutical study? Start here if you are a <span style={{color: "rgb(99, 93, 255)",
      border: '1px solid black', 
      borderRadius: 25, paddingLeft: 25, paddingRight: 25, paddingBottom: 5
      }}> {currentText}</span>
      </Typography>
  );
}



export default LandingPage;

