const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

// Search recipes
router.get("/", async (req, res) => {
  const resp = await axios.get(`${process.env.EDAMAM_BASE_URL}/recipes/v2`, {
    params: {
      app_id: process.env.EDAMAM_APP_ID,
      app_key: process.env.EDAMAM_APP_KEY,
      type: "public",
      q: req.query.q,
    },
  });
  res.send({
    count: resp.data.count,
    from: resp.data.from,
    to: resp.data.to,
    items: resp.data.hits.map((hit) => {
      const id = hit.recipe.uri.replace(
        "http://www.edamam.com/ontologies/edamam.owl#recipe_",
        ""
      );
      return {
        id,
        image: hit.recipe.image,
        label: hit.recipe.label,
        ingredientLines: hit.recipe.ingredientLines,
        ingredients: hit.recipe.ingredients,
        yield: hit.recipe.yield,
        calories: hit.recipe.calories,
        cuisineType: hit.recipe.cuisineType,
        mealType: hit.recipe.mealType,
        dishType: hit.recipe.dishType,
        healthLabels: hit.recipe.healthLabels,
      };
    }),
  });
});

// Get recipe details
router.get("/:id", async (req, res) => {
  const resp = await axios.get(
    `${process.env.EDAMAM_BASE_URL}/recipes/v2/${req.params.id}`,
    {
      params: {
        app_id: process.env.EDAMAM_APP_ID,
        app_key: process.env.EDAMAM_APP_KEY,
        type: "public",
      },
    }
  );
  const id = resp.data.recipe.uri.replace(
    "http://www.edamam.com/ontologies/edamam.owl#recipe_",
    ""
  );
  res.send({
    id,
    image: resp.data.recipe.image,
    label: resp.data.recipe.label,
    ingredientLines: resp.data.recipe.ingredientLines,
    ingredients: resp.data.recipe.ingredients,
    yield: resp.data.recipe.yield,
    calories: resp.data.recipe.calories,
    cuisineType: resp.data.recipe.cuisineType,
    mealType: resp.data.recipe.mealType,
    dishType: resp.data.recipe.dishType,
    healthLabels: resp.data.recipe.healthLabels,
  });
});

module.exports = router;
