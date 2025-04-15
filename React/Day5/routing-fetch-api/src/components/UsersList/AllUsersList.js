import { useEffect, useState } from "react";
import UsersList from "./UsersList";

const AllUsersList = () => {
    const [usersList, setUsersList] = useState();
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllUsers = async () => {
        try {
            const res = await fetch("https://dummyjson.com/users");

            const data = await res.json();
            if (data) {
                setUsersList(data.users);
                setKeys(Object.keys(data?.users[0]));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const flattenObject = (obj) => {
        const result = [];

        const recurse = (value) => {
            if (value === null || value === undefined) return;
            if (typeof value === "object" && !Array.isArray(value)) {
                Object.values(value).forEach(recurse);
            } else if (Array.isArray(value)) {
                value.forEach(recurse);
            } else {
                result.push(value);
            }
        };

        recurse(obj);
        return result.join(", ");
    };

    const formatData = (value) => {
        if (typeof value === "object" && value !== null) {
            return flattenObject(value);
        }
        return value;
    };

    return (
        <div>
            {loading ? (
                <div
                    style={{
                        margin: "30px auto",
                        fontSize: "30px",
                        textAlign: "center",
                    }}
                >
                    Loading user profile...
                </div>
            ) : (
                <UsersList
                    usersList={usersList}
                    keys={keys}
                    formatData={formatData}
                />
            )}
        </div>
    );
};

export default AllUsersList;
