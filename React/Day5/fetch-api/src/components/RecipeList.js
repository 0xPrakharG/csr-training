import { useState } from "react";
import AddRecipeForm from "./AddRecipeForm";
import RecipeTable from "./RecipeTable";
import EditRecipeForm from "./EditRecipeForm";

const RecipeList = ({ recipesList, keys }) => {
    const [editing, setEditing] = useState(false);
    const [recipeId, setRecipeId] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [addingRecipe, setAddingRecipe] = useState(false);

    const addRecipe = (name) => {
        fetch("https://dummyjson.com/recipes/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setAddingRecipe(false);
            });
    };

    const deleteTask = (id) => {
        fetch(`https://dummyjson.com/recipes/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((json) => console.log(json));
    };

    const getEditTask = (id, name) => {
        setEditing(true);
        setRecipeId(id);
        setRecipeName(name);
    };

    const editTask = (id, name) => {
        fetch(`https://dummyjson.com/recipes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setEditing(false);
            });
    };

    return (
        <div className="table-container">
            <button className="add-btn" onClick={() => setAddingRecipe(true)}>
                Add Recipe
            </button>

            {!!addingRecipe && <AddRecipeForm onAddRecipe={addRecipe} />}

            <RecipeTable
                recipesList={recipesList}
                keys={keys}
                onEdit={getEditTask}
                onDelete={deleteTask}
            />

            {editing && (
                <EditRecipeForm
                    recipeId={recipeId}
                    initialName={recipeName}
                    onUpdate={editTask}
                />
            )}
        </div>
    );
};

export default RecipeList;
