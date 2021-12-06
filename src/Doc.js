import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import Sample from './Pdf';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/nehal119/">
        Nehal Ahmad
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Simple Document Reader
          </Typography>
        </Box>
      </Container>
    <Container maxWidth="sm">
      <Sample />
    </Container>
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Copyright />
      </Box>
    </Container>
    </>
  );
}
