// src/pages/register/RegisterAdmin.tsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { auth, firestore } from '../../firebase/firebaseConfig'; // Adjust path as necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f0f4f8',
});

const PaperStyled = styled(Paper)({
  padding: '20px',
  maxWidth: '400px',
  width: '100%',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const RegisterAdmin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save the user role in Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        role: 'admin', // Set role to admin
      });

      // Optionally, clear the form or redirect the user
      console.log('Admin registered successfully:', user.uid);
    } catch (err) {
      setError('Failed to register: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <Container>
      <PaperStyled>
        <Typography variant="h5" align="center" gutterBottom>
          Register Admin
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </PaperStyled>
    </Container>
  );
};

export default RegisterAdmin;
