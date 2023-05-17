import { Typography } from '@mui/material';
import React, { useState } from 'react';

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

export default TextSlider;
