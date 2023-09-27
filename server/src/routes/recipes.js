import express from "express";
import RecipeModel from "../models/Recipe.js";
import UserModel from "../models/User.js";
import { verifyToken } from "../middleware/tokenVerification.js";

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find({});
    res.json(recipes);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

// Create new recipe
router.post("/", verifyToken, async (req, res) => {
  try {
    const recipe = new RecipeModel(req.body);
    await recipe.save();
    res.json(recipe);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
  try {
    const result = await RecipesModel.findById(req.params.recipeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Recipe
router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

// Get id of saved recipes
router.get("/saved-recipes/ids/:userID", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});

// Get saved recipes
router.get("/saved-recipes/:userID", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as recipesRouter };
