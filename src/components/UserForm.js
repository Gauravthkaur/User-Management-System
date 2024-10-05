import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
} from '@mui/material';

function UserForm({ user, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    website: '',
    address: {
      street: '',
      city: '',
    },
    company: {
      name: '',
    },
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name is required and must be at least 3 characters';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!formData.phone || !/^\+?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required';
    }
    
    if (!formData.address.street) {
      newErrors['address.street'] = 'Street is required';
    }
    
    if (!formData.address.city) {
      newErrors['address.city'] = 'City is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        username: user?.username || `USER-${formData.name.split(' ')[0]}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            value={user?.username || `USER-${formData.name.split(' ')[0]}`}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street"
            value={formData.address.street}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, street: e.target.value }
            })}
            error={!!errors['address.street']}
            helperText={errors['address.street']}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            value={formData.address.city}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, city: e.target.value }
            })}
            error={!!errors['address.city']}
            helperText={errors['address.city']}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Company Name (Optional)"
            value={formData.company.name}
            onChange={(e) => setFormData({
              ...formData,
              company: { name: e.target.value }
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Website (Optional)"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {user ? 'Update User' : 'Create User'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default UserForm;