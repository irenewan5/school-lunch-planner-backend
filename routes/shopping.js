const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Get shopping list
router.get("/", async (req, res) => {
  const { userId } = req.auth;
  const { startDate, endDate } = req.query;
  if (startDate && endDate) {
    const plans = await knex("plans")
      .where({ user_id: userId })
      .whereBetween("date", [startDate, endDate]);

    const ingredients = {};
    plans.forEach((plan) => {
      plan.recipe_ingredients.forEach((ingredient) => {
        ingredients[ingredient.foodId] ||= [];
        ingredients[ingredient.foodId].push(ingredient);
      });
    });
    const result = Object.values(ingredients).map(
      (ingredientsWithSameFoodId) => {
        const measures = {};
        ingredientsWithSameFoodId.forEach((ingredient) => {
          measures[ingredient.measure] ||= {
            name: ingredient.measure,
            quantity: 0,
          };
          measures[ingredient.measure].quantity += ingredient.quantity;
        });
        return {
          food: ingredientsWithSameFoodId[0].food,
          foodCategory: ingredientsWithSameFoodId[0].food,
          foodId: ingredientsWithSameFoodId[0].foodId,
          image: ingredientsWithSameFoodId[0].image,
          measures,
        };
      }
    );
    res.send(result);
  } else {
    res.send([]);
  }
});

module.exports = router;
