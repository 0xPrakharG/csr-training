import { useState } from "react";

const AddRecipeForm = ({ onAddRecipe }) => {
    const [addName, setAddName] = useState("");

    const handleSubmit = () => {
        onAddRecipe(addName);
        setAddName("");
    };

    return (
        <div className="add-container">
            <input
                type="text"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                className="add-input"
                placeholder="Enter recipe name"
            />
            <button className="add-btn" onClick={handleSubmit}>
                Add
            </button>
        </div>
    );
};

export default AddRecipeForm;
