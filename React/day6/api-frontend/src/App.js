import { useState } from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";

function App() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3008/users/${id}`, {
            method: "DELETE",
        });
        setRefresh(!refresh);
    };

    return (
        <div className="users">
            <UserForm
                selectedUser={selectedUser}
                onSubmitSuccess={() => {
                    setSelectedUser(null);
                    setRefresh(!refresh);
                }}
            />
            <UserTable
                onEdit={(user) => setSelectedUser(user)}
                onDelete={handleDelete}
                refresh={refresh}
            />
        </div>
    );
}

export default App;
