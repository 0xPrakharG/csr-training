import RecipeTableHeader from "./RecipeTableHeader";
import RecipeTableRow from "./RecipeTableRow";

const RecipeTable = ({ recipesList, keys, onEdit, onDelete }) => {
    return (
        <table className="table">
            <RecipeTableHeader keys={keys} />
            <tbody>
                {recipesList.map((recipe, index) => (
                    <RecipeTableRow
                        key={index}
                        recipe={recipe}
                        keys={keys}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default RecipeTable;
