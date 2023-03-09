import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Check if the username and password fields are empty
    if (username === '' || password === '') {
      alert('Please fill in all fields.');
    }

    // If the fields are not empty, submit the form
    else {
      alert('Login successful!');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} /><br />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} /><br />

      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginPage;
