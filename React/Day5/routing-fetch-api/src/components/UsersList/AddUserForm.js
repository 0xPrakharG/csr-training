import { useState } from "react";

const AddUserForm = ({ onAddUser }) => {
    const [addFirstName, setAddFirstName] = useState("");
    const [addLastName, setAddLastName] = useState("");
    const [addAge, setAddAge] = useState("");

    const handleSubmit = () => {
        onAddUser(addFirstName, addLastName, addAge);
        setAddFirstName("");
        setAddLastName("");
        setAddAge("");
    };

    return (
        <div className="add-container">
            <input
                type="text"
                value={addFirstName}
                onChange={(e) => setAddFirstName(e.target.value)}
                className="add-input"
                placeholder="Enter User Name"
            />
            <input
                type="text"
                value={addLastName}
                onChange={(e) => setAddLastName(e.target.value)}
                className="add-input"
                placeholder="Enter User Name"
            />
            <input
                type="text"
                value={addAge}
                onChange={(e) => setAddAge(e.target.value)}
                className="add-input"
                placeholder="Enter User Name"
            />
            <button className="add-btn" onClick={handleSubmit}>
                Add
            </button>
        </div>
    );
};

export default AddUserForm;
