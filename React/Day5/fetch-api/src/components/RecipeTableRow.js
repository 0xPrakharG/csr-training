const RecipeTableRow = ({ recipe, keys, onEdit, onDelete }) => {
    return (
        <tr>
            {keys.map((key, index) => (
                <td key={index} className="table-data">
                    {Array.isArray(recipe[key]) ? (
                        <ul>
                            {recipe[key].map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        recipe[key]
                    )}
                </td>
            ))}
            <td className="table-data">
                <button
                    onClick={() => onEdit(recipe.id, recipe.name)}
                    className="edit-btn"
                >
                    Edit
                </button>
                <button onClick={() => onDelete(recipe.id)} className="del-btn">
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default RecipeTableRow;
