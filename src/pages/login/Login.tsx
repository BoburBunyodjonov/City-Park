import React, { useState } from 'react';
import { TextField, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
});

const PaperStyled = styled(Paper)({
  padding: '20px',
  maxWidth: '400px',
  width: '100%',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); 
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'admin') {
          navigate('/dashboard'); 
        } else {
          setError('You do not have permission to access this area.'); 
        }
      } else {
        setError('User not found.');
      }
    } catch {
        setError('Invalid email or password');
    }
  };

  return (
    <Container>
      <PaperStyled>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg text-xl"

          >
            Login
          </button>
        </form>
      </PaperStyled>
    </Container>
  );
};

export default Login;
