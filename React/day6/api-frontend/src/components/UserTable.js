import { useEffect, useState } from "react";

const UserTable = ({ onEdit, onDelete, refresh }) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3008/users");

        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, [refresh]);

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="users-list">
            <h2 className="users-list-header">User List</h2>
            <table className="users-table">
                <thead>
                    <tr className="users-table-row">
                        <th className="users-table-header">First Name</th>
                        <th className="users-table-header">Last Name</th>
                        <th className="users-table-header">Maiden Name</th>
                        <th className="users-table-header">Age</th>
                        <th className="users-table-header">Gender</th>
                        <th className="users-table-header">Email</th>
                        <th className="users-table-header">Phone</th>
                        <th className="users-table-header">Username</th>
                        <th className="users-table-header">Password</th>
                        <th className="users-table-header">Birth Date</th>
                        <th className="users-table-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="users-table-row">
                            <td className="users-table-data">
                                {user.firstName}
                            </td>
                            <td className="users-table-data">
                                {user.lastName}
                            </td>
                            <td className="users-table-data">
                                {user.maidenName}
                            </td>
                            <td className="users-table-data">{user.age}</td>
                            <td className="users-table-data">{user.gender}</td>
                            <td className="users-table-data">{user.email}</td>
                            <td className="users-table-data">{user.phone}</td>
                            <td className="users-table-data">
                                {user.username}
                            </td>
                            <td className="users-table-data">
                                {user.password}
                            </td>
                            <td className="users-table-data">
                                {user.birthDate}
                            </td>
                            <td className="users-table-data buttons-cell">
                                <button onClick={() => onEdit(user)}>
                                    Edit
                                </button>
                                <button onClick={() => onDelete(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
