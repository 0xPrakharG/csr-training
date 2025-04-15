const UserTableRow = ({ user, keys, formatData, onEdit, onDelete }) => {
    return (
        <tr>
            {keys.map((key, index) => (
                <td key={index} className="user-table-data">
                    {key === "image" ? (
                        <img
                            src={user[key]}
                            alt="user"
                            width="40"
                            height="40"
                        />
                    ) : user[key] ? (
                        formatData(user[key])
                    ) : (
                        "-"
                    )}
                </td>
            ))}
            <td className="user-table-data">
                <button
                    onClick={() => onEdit(user.id, user.name)}
                    className="edit-btn"
                >
                    Edit
                </button>
                <button onClick={() => onDelete(user.id)} className="del-btn">
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default UserTableRow;
