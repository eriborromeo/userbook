import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

const App = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const editUser = (user) => {
        setEditingUser(user);
    };

    const updateUser = async (updatedUser) => {
        try {
            await axios.put(`http://localhost:5000/api/users/${updatedUser._id}`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="App">
            <h1>User Management</h1>
            <UserForm fetchUsers={fetchUsers} editingUser={editingUser} updateUser={updateUser} />
            <UserTable users={users} deleteUser={deleteUser} editUser={editUser} />
        </div>
    );
};

export default App;
