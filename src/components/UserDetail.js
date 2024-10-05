// components/UserDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';

function UserDetail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]); // id is now the only dependency

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Container>
      <Paper style={{ padding: '2rem', marginTop: '2rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button onClick={() => navigate('/')} variant="outlined">
              Back to Users
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">User Details</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Name</Typography>
            <Typography>{user.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Email</Typography>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Phone</Typography>
            <Typography>{user.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Username</Typography>
            <Typography>{user.username}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Website</Typography>
            <Typography>{user.website || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Company</Typography>
            <Typography>{user.company?.name || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Address</Typography>
            <Typography>Street: {user.address?.street || 'N/A'}</Typography>
            <Typography>City: {user.address?.city || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserDetail;