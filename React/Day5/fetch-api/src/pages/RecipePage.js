import React, { useEffect, useState } from "react";
import RecipeList from "../components/RecipeList";

const RecipePage = () => {
    const [recipesList, setRecipesList] = useState([]);
    const [keys, setKeys] = useState([]);

    const getAllRecipes = () => {
        fetch("https://dummyjson.com/recipes")
            .then((res) => res.json())
            .then((data) => {
                setRecipesList(data.recipes);
                setKeys(Object.keys(data?.recipes[0]));
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getAllRecipes();
    }, []);

    return (
        <div>
            <RecipeList recipesList={recipesList} keys={keys} />
        </div>
    );
};

export default RecipePage;
