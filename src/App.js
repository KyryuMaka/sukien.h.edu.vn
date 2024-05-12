import React from 'react';
import './App.css';
import Box from '@mui/material/Box';

import line73 from './images/line73.png'
import background from './images/bg.png'
import logo from './images/logo.png'

import Form from './components/Form';
import Spin from './components/Spin';
import SpinHEA from './components/SpinHEA'

function App() {
  const isSubmited = sessionStorage.getItem('submited');
  const isHEA = sessionStorage.getItem('isHEA');
  return (
  <>
    <Box sx={{backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <Box sx={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '96.4vh', display: 'flex'}}>
        <Box sx={{margin: '1rem'}}>
          <a href='https://h.edu.vn/'>
            <img src={logo} alt="" height="200px" />
          </a>
        </Box>
        <Box 
          sx={{
            backgroundColor: "#ffffff", 
            border: '1px solid #dee2e6', 
            borderRadius: '0.5rem', 
            borderColor: '#0d6efd', 
            width: {xs: '85%', md: '50%'}, 
            marginBottom: '45px'
          }}
        >
          <Box sx={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          {isSubmited?
            isHEA === "true"?
            <SpinHEA />:
            <Spin />:
            <Form />
          }
          </Box>
        </Box>
      </Box>
      <img src={line73} alt="" width="100%" height="30px"/>
    </Box>
    
  </>
  );
}

export default App;