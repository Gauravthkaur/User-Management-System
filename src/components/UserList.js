import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import UserForm from './UserForm';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        showSnackbar('Failed to fetch users', 'error');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const newUser = await response.json();
      setUsers([{ ...newUser, id: users.length + 1 },...users ]);
      showSnackbar('User created successfully');
    } catch (error) {
      showSnackbar('Failed to create user', 'error');
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userData.id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json',
        },
      });
      setUsers(users.map(user => user.id === userData.id ? userData : user));
      showSnackbar('User updated successfully');
    } catch (error) {
      showSnackbar('Failed to update user', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user.id !== userId));
      showSnackbar('User deleted successfully');
    } catch (error) {
      showSnackbar('Failed to delete user', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h1>User Management System</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <TextField
          label="Search users"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Add User
        </Button>
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={user.id} sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Button onClick={() => { setSelectedUser(user); setOpenDialog(true); }}>
                      Edit
                    </Button>
                    <Button 
                      color="error" 
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                    <Link to={`/user/${user.id}`}>
                      <Button>View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <UserForm 
            user={selectedUser} 
            onSubmit={(userData) => {
              if (selectedUser) {
                handleUpdateUser(userData);
              } else {
                handleCreateUser(userData);
              }
              setOpenDialog(false);
              setSelectedUser(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UserList;