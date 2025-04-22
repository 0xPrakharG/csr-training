import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";

function App() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            const response = await fetch(`http://localhost:3008/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("User deleted successfully");
                setRefresh(!refresh);
                if (selectedUser && selectedUser.id === id) {
                    setSelectedUser(null);
                }
            } else {
                toast.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("An error occurred while deleting the user");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>User Management System</h1>
            </header>

            <main className="app-main">
                <div className="grid-container">
                    <div className="form-section">
                        <UserForm
                            selectedUser={selectedUser}
                            onSubmitSuccess={() => {
                                setSelectedUser(null);
                                setRefresh(!refresh);
                            }}
                        />
                    </div>

                    <div className="table-section">
                        <UserTable
                            onEdit={(user) => setSelectedUser(user)}
                            onDelete={handleDelete}
                            refresh={refresh}
                            isDeleting={isDeleting}
                        />
                    </div>
                </div>
            </main>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
