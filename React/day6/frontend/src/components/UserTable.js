import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserTable = ({ onEdit, onDelete, refresh }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const usersPerPage = 10;

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:3008/");

            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await res.json();
            setUsers(data.data);
            setTotalUsers(data.data.length);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [refresh]);

    const handleDeleteConfirm = (userId, firstName) => {
        if (window.confirm(`Are you sure you want to delete ${firstName}?`)) {
            onDelete(userId);
        }
    };

    // Calculate pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Pagination controls
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (isLoading) {
        return (
            <div className="card table-container">
                <div className="loading-container">
                    <div className="loading-spinner large"></div>
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    const columns = [
        { key: "id", label: "Id" },
        { key: "firstname", label: "First Name" },
        { key: "lastname", label: "Last Name" },
        { key: "maidenname", label: "Maiden Name" },
        { key: "age", label: "Age" },
        { key: "gender", label: "Gender" },
        { key: "email", label: "Email" },
        // { key: "username", label: "Username" },
        // { key: "phone", label: "Phone" },
        // { key: "birthDate", label: "Birth Date" },
    ];

    return (
        <div className="card table-container">
            <div className="table-header">
                <h2 className="table-title">User List</h2>
                <div className="table-actions">
                    <div className="pagination-controls">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="pagination-btn"
                            title="Previous page"
                        >
                            ◀
                        </button>
                        <span className="page-indicator">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="pagination-btn"
                            title="Next page"
                        >
                            ▶
                        </button>
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="btn btn-secondary refresh-btn"
                        title="Refresh users"
                    >
                        Reload
                    </button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="users-table">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key}>{column.label}</th>
                            ))}
                            <th className="actions-header">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.id}>
                                {columns.map((column) => (
                                    <td key={`${user.id}-${column.key}`}>
                                        {column.key === "gender"
                                            ? user[column.key]
                                                  ?.charAt(0)
                                                  .toUpperCase() +
                                                  user[column.key]?.slice(1) ||
                                              "-"
                                            : user[column.key] || "-"}
                                    </td>
                                ))}
                                <td>
                                    <div className="actions-cell">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="btn-icon edit"
                                            title="Edit user"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteConfirm(
                                                    user.id,
                                                    user.firstname
                                                )
                                            }
                                            className="btn-icon delete"
                                            title="Delete user"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-footer">
                {totalUsers > 0 ? (
                    <p>
                        Showing ({indexOfFirstUser + 1} to{" "}
                        {Math.min(indexOfLastUser, totalUsers)}) of {totalUsers}{" "}
                        users
                    </p>
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </div>
    );
};

export default UserTable;
