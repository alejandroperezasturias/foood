import { useEffect, useState } from "react";
import axios from "axios";

export default function FindRecipes(ingredients) {
  const [loading, setLoading] = useState("false");
  const [recipesapi, setRecipesapi] = useState([]);
  useEffect(() => {
    let cancel;
    setLoading(true);
    axios({
      method: "GET",
      url:
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=0ca5b73430174b75ba4618802210117f",
      params: {
        includeIngredients: ingredients,
        ignorePantry: true,
        number: 5,
        addRecipeInformation: true,
        instructionsRequired: true,
        fillIngredients: true,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      },
    })
      .then((response) => {
        setRecipesapi((p) => [...p, response.data.results]);
        console.log(response.data.results);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }, [ingredients]);

  return { loading, recipesapi };
}
