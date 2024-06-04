import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ fetchUsers, editingUser, updateUser }) => {
    const [user, setUser] = useState({ firstName: '', lastName: '', email: '', role: '', password: '' });

    useEffect(() => {
        if (editingUser) {
            setUser(editingUser);
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            updateUser(user);
        } else {
            try {
                await axios.post('http://localhost:6000/api/users/register', user);
                fetchUsers();
            } catch (error) {
                console.error(error);
            }
        }
        setUser({ firstName: '', lastName: '', email: '', role: '', password: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={user.firstName} placeholder="Fiemsrst Name" onChange={handleChange} required />
            <input type="text" name="lastName" value={user.lastName} placeholder="Last Name" onChange={handleChange} required />
            <input type="email" name="email" value={user.email} placeholder="Email" onChange={handleChange} required />
            <input type="text" name="role" value={user.role} placeholder="Role" onChange={handleChange} required />
            <input type="password" name="password" value={user.password} placeholder="Password" onChange={handleChange} required={!editingUser} />
            <button type="submit">{editingUser ? 'Update' : 'Save'}</button>
        </form>
    );
};

export default UserForm;
