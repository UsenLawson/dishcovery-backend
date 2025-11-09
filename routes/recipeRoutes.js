import express from "express";
import multer from "multer";
import { createRecipe, getAllRecipes, getRecipeById } from "../controllers/recipeController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Use memory storage (REQUIRED on Render)
const upload = multer({
  storage: multer.memoryStorage(),
});

// ✅ Public: Get all recipes
router.get("/", getAllRecipes);

// ✅ Public: Get single recipe
router.get("/:id", getRecipeById);

// ✅ Protected: Create recipe
router.post("/", auth, upload.single("image"), createRecipe);

export default router;
