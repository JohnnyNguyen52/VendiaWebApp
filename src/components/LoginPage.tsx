import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Add authentication logic here
  };

  return (
    <Container maxWidth="sm">
      <div style={{
        marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <a href="api/auth/login">Login</a>
        {/* <Button onClick={handleLogin}>Login</Button> */}
        <form style={{ width: '100%', marginTop: '1px' }} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Link href="/home" passHref>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </Link>
        </form>
      </div>
    </Container >
  );
}

export default LoginPage;
