import { Recipe, User } from '../models/index.js';

//  Get all recipes
export const listRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }]
    });

    const parsed = recipes.map(r => ({
      id: r.id,
      title: r.title,
      description: r.description,
      ingredients: r.ingredients ? JSON.parse(r.ingredients) : [],
      steps: r.steps ? JSON.parse(r.steps) : [],
      category: r.category,
      imageUrl: r.imageUrl,
      author: r.author
    }));

    res.json(parsed);
  } catch (err) {
    next(err);
  }
};

//  Get one recipe by ID
export const getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }]
    });

    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    res.json({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: JSON.parse(recipe.ingredients || '[]'),
      steps: JSON.parse(recipe.steps || '[]'),
      category: recipe.category,
      imageUrl: recipe.imageUrl,
      author: recipe.author
    });
  } catch (err) {
    next(err);
  }
};

// Create new recipe
export const createRecipe = async (req, res, next) => {
  try {
    const { title, description, ingredients, steps, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients: JSON.stringify(Array.isArray(ingredients) ? ingredients : JSON.parse(ingredients || '[]')),
      steps: JSON.stringify(Array.isArray(steps) ? steps : JSON.parse(steps || '[]')),
      category,
      imageUrl,
      userId: req.user.id
    });

    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

// Search recipes
export const searchRecipes = async (req, res, next) => {
  try {
    const q = (req.query.q || '').toLowerCase();
    const recipes = await Recipe.findAll();

    const filtered = recipes.filter(r =>
      r.title.toLowerCase().includes(q) ||
      (r.ingredients && r.ingredients.toLowerCase().includes(q))
    );

    res.json(filtered);
  } catch (err) {
    next(err);
  }
};

// Save recipe
export const saveRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    await req.user.addSavedRecipe(recipe);
    res.json({ message: 'Recipe saved successfully' });
  } catch (err) {
    next(err);
  }
};

//  Get saved recipes for current user
export const getSaved = async (req, res, next) => {
  try {
    const recipes = await req.user.getSavedRecipes({
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }]
    });
    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

// Update an existing recipe
export const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    // Ensure only the owner can update their recipe
    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ error: 'You are not allowed to edit this recipe' });
    }

    const { title, description, ingredients, steps, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : recipe.imageUrl;

    // Safely parse ingredients and steps
    const parsedIngredients = Array.isArray(ingredients)
      ? ingredients
      : JSON.parse(ingredients || '[]');

    const parsedSteps = Array.isArray(steps)
      ? steps
      : JSON.parse(steps || '[]');

    // Update fields
    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = JSON.stringify(parsedIngredients);
    recipe.steps = JSON.stringify(parsedSteps);
    recipe.category = category || recipe.category;
    recipe.imageUrl = imageUrl;

    await recipe.save();

    res.json({ message: 'Recipe updated successfully', recipe });
  } catch (err) {
    next(err);
  }
};


// Delete a recipe
export const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

    // Ensure only the owner can delete their recipe
    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ error: 'You are not allowed to delete this recipe' });
    }

    await recipe.destroy();
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    next(err);
  }
};
