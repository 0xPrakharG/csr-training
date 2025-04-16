import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import PostTagsTable from "./PostTagsTable";
import PostTagList from "./PostTagList";

const UsersList = ({ keys, usersList, formatData }) => {
    const [allUsers, setAllUsers] = useState(usersList);
    const [addingUser, setAddingUser] = useState(false);
    const [editing, setEditing] = useState(false);
    const [userId, setUserId] = useState("");
    const [userLastName, setUserLastName] = useState("");

    const [searchId, setSearchId] = useState("");
    const [searchedUser, setSearchedUser] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [queryResults, setQueryResults] = useState([]);

    const [filterKey, setFilterKey] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const [limit, setLimit] = useState(30);
    const [skip, setSkip] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    const addUser = (firstname, lastname, age) => {
        fetch("https://dummyjson.com/users/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstname,
                lastName: lastname,
                age: age,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setAddingUser(false);
            });
    };

    const getEditUser = (id, name) => {
        setEditing(true);
        setUserId(id);
        setUserLastName(name);
    };

    const editUser = (id, name) => {
        fetch(`https://dummyjson.com/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                lastName: name,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setEditing(false);
            });
    };

    const deleteUser = (id) => {
        fetch(`https://dummyjson.com/users/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((json) => console.log(json));
    };

    const searchUserById = () => {
        if (!searchId.trim()) return;
        fetch(`https://dummyjson.com/users/${searchId}`)
            .then((res) => {
                if (!res.ok) throw new Error("User not found");
                return res.json();
            })
            .then((data) => {
                setSearchedUser(data);
            })
            .catch((err) => {
                setSearchedUser(null);
                console.log(err);
            });
    };

    const searchUsersByQuery = () => {
        if (!searchQuery.trim()) return;
        fetch(`https://dummyjson.com/users/search?q=${searchQuery}`)
            .then((res) => {
                if (!res.ok) throw new Error("No users found");
                return res.json();
            })
            .then((data) => {
                setQueryResults(data.users);
            })
            .catch((err) => {
                setQueryResults([]);
                console.log(err);
            });
    };

    const filterUsers = () => {
        if (!filterKey.trim() || !filterValue.trim()) return;
        fetch(
            `https://dummyjson.com/users/filter?key=${filterKey}&value=${filterValue}`
        )
            .then((res) => {
                if (!res.ok) throw new Error("No users found for given filter");
                return res.json();
            })
            .then((data) => {
                setFilteredUsers(data.users);
            })
            .catch((err) => {
                setFilteredUsers([]);
                console.log(err);
            });
    };

    const fetchUsers = () => {
        let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
        if (sortKey) {
            url += `&sortBy=${sortKey}&order=${sortOrder}`;
        }

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json();
            })
            .then((data) => {
                setAllUsers(data.users);
                setTotalUsers(data.total);
            })
            .catch((err) => console.log(err));
    };

    const sortUsers = () => {
        fetchUsers();
    };

    useEffect(() => {
        setAllUsers(usersList);
    }, [usersList]);

    useEffect(() => {
        fetchUsers();
    }, [limit, skip, sortKey, sortOrder]);

    return (
        <div className="container user-table-container">
            <button className="add-btn" onClick={() => setAddingUser(true)}>
                Add User
            </button>

            {addingUser && <AddUserForm onAddUser={addUser} />}
            <div className="added-components">
                <div className="search-component">
                    <h3>Search by ID</h3>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                            type="text"
                            placeholder="Enter user ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="search-input"
                        />
                        <button onClick={searchUserById} className="search-btn">
                            Search
                        </button>
                    </div>
                </div>

                {searchedUser && (
                    <div className="searched-user">
                        <h3>Search Result</h3>
                        <UserTable
                            usersList={[searchedUser]}
                            keys={keys}
                            formatData={formatData}
                            onEdit={getEditUser}
                            onDelete={deleteUser}
                        />
                    </div>
                )}

                <div className="search-component">
                    <h3>Search by Name</h3>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                            type="text"
                            placeholder="Search users by name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button
                            onClick={searchUsersByQuery}
                            className="search-btn"
                        >
                            Search
                        </button>
                    </div>
                </div>
                {queryResults.length > 0 && (
                    <div className="query-results">
                        <h3>Name Search Results</h3>
                        <UserTable
                            usersList={queryResults}
                            keys={keys}
                            formatData={formatData}
                            onEdit={getEditUser}
                            onDelete={deleteUser}
                        />
                    </div>
                )}

                <div className="filter-component">
                    <h3>Filter Users</h3>
                    <input
                        type="text"
                        placeholder="Filter key (e.g. hair.color)"
                        value={filterKey}
                        onChange={(e) => setFilterKey(e.target.value)}
                        className="search-input"
                    />
                    <input
                        type="text"
                        placeholder="Filter value (e.g. Brown)"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="search-input"
                    />
                    <button onClick={filterUsers} className="search-btn">
                        Filter Users
                    </button>
                </div>

                {filteredUsers.length > 0 && (
                    <div className="filtered-users">
                        <h3>Filtered Results</h3>
                        <UserTable
                            usersList={filteredUsers}
                            keys={keys}
                            formatData={formatData}
                            onEdit={getEditUser}
                            onDelete={deleteUser}
                        />
                    </div>
                )}
                <div className="sort-component">
                    <h3>Sort Users</h3>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <select
                            value={sortKey}
                            onChange={(e) => setSortKey(e.target.value)}
                            className="search-input-select"
                        >
                            <option value="">Sort by</option>
                            <option value="firstName">First Name</option>
                            <option value="lastName">Last Name</option>
                            <option value="age">Age</option>
                            <option value="email">Email</option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="search-input-select"
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                    <button onClick={sortUsers} className="search-btn">
                        Apply Sort
                    </button>
                </div>
            </div>
            <h3>All Users</h3>

            <div className="pagination-controls">
                <button
                    onClick={() => setSkip((prev) => Math.max(prev - limit, 0))}
                    disabled={skip === 0}
                    className="pagination-prev"
                >
                    Previous
                </button>
                <span className="pagination-info">
                    Showing {skip + 1} - {Math.min(skip + limit, totalUsers)} of{" "}
                    {totalUsers}
                </span>
                <button
                    onClick={() => {
                        if (skip + limit < totalUsers) setSkip(skip + limit);
                    }}
                    disabled={skip + limit >= totalUsers}
                    className="pagination-next"
                >
                    Next
                </button>
            </div>

            <UserTable
                usersList={allUsers}
                keys={keys}
                formatData={formatData}
                onEdit={getEditUser}
                onDelete={deleteUser}
            />

            {editing && (
                <EditUserForm
                    userId={userId}
                    initialName={userLastName}
                    onCancel={() => setEditing(false)}
                    onUpdate={editUser}
                />
            )}

            <PostTagsTable />
            <PostTagList />
        </div>
    );
};

export default UsersList;
