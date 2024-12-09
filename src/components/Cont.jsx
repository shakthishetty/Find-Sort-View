import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Cont() {
  let navigate = useNavigate()
  let {id,login,avatar_url} = useParams()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
      <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0066CC',
          },
        },
      }}
    >
 <Box
        sx={{
          display:'flex',
          flexDirection:"column",
          gap:4,
          width: 500,
          height: 500,
          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        <Box sx={{width:400,alignItems:"center",height:50,marginLeft:4}}>
           <h3 style={{textAlign:'center'}}>{id}</h3>
        </Box>
        <Box sx={{width:200,alignItems:"center",height:150 ,marginLeft:17,borderRadius:50}}>
           <img src={decodeURIComponent(avatar_url)} alt={login} style={{width:200,height:200}} />
        </Box>
        <Box sx={{width:400,alignItems:"center",height:50,marginLeft:4}}>
           <h3 style={{textAlign:'center'}}>{login}</h3>
        </Box>
        <button style={{color:'white',backgroundColor:'red'}} onClick={()=>navigate("/")}>Back</button>

      </Box>
    </ThemeProvider>
        
      </Container>
    </React.Fragment>
  );
}
