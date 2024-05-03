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
        ingredients: hit.recipe.ingredients,
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
router.get("/:id", (req, res) => {
  res.send([]);
});

module.exports = router;
