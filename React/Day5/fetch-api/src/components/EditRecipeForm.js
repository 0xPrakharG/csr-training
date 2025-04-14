import { useState, useEffect } from "react";

const EditRecipeForm = ({ recipeId, initialName, onUpdate }) => {
    const [recipeName, setRecipeName] = useState(initialName);

    useEffect(() => {
        setRecipeName(initialName);
    }, [initialName]);

    return (
        <table className="edit-table">
            <thead>
                <tr className="edit-table-row">
                    <th className="edit-table-header">id</th>
                    <th className="edit-table-header">name</th>
                </tr>
            </thead>
            <tbody>
                <tr className="edit-table-row">
                    <td className="edit-table-data">{recipeId}</td>
                    <td className="edit-table-data">
                        <input
                            type="text"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            className="edit-input"
                        />
                    </td>
                </tr>
                <tr className="edit-table-row">
                    <td
                        className="edit-table-data"
                        colSpan="2"
                        style={{ textAlign: "center" }}
                    >
                        <button
                            className="update-btn"
                            onClick={() => onUpdate(recipeId, recipeName)}
                        >
                            Update
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default EditRecipeForm;
