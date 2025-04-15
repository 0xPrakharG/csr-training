import { useEffect } from "react";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";

const UserTable = ({ usersList, keys, formatData, onEdit, onDelete }) => {
    useEffect(() => {
        console.log(usersList);
    }, [usersList]);

    if (usersList && usersList.length === 0) return <p>Loading users...</p>;

    return (
        <table className="user-table">
            <UserTableHeader keys={keys} />
            <tbody>
                {usersList &&
                    usersList.map((user, index) => (
                        <UserTableRow
                            key={index}
                            user={user}
                            keys={keys}
                            formatData={formatData}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
            </tbody>
        </table>
    );
};

export default UserTable;
