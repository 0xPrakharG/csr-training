import { useState, useEffect } from "react";

const EditUserForm = ({ userId, initialName, onUpdate, onCancel }) => {
    const [userLastName, setUserLastName] = useState(initialName);

    useEffect(() => {
        setUserLastName(initialName);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [initialName]);

    return (
        <div className="modal-overlay">
            <div className="edit-modal-container">
                <h3 className="edit-modal-title">Edit User</h3>
                <table className="edit-table">
                    <thead>
                        <tr className="edit-table-row">
                            <th className="edit-table-header">ID</th>
                            <th className="edit-table-header">Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="edit-table-row">
                            <td className="edit-table-data">{userId}</td>
                            <td className="edit-table-data">
                                <input
                                    type="text"
                                    value={userLastName}
                                    onChange={(e) =>
                                        setUserLastName(e.target.value)
                                    }
                                    className="edit-input"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="edit-actions">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        className="update-btn"
                        onClick={() => onUpdate(userId, userLastName)}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUserForm;
