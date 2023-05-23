import React from 'react';
import Navbar from './Navbar';
import dynamic from 'next/dynamic';

const DynamicTextSlider = dynamic(() => import('./TextSlider'), {
  ssr: false,
});

function LandingPage() {
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

