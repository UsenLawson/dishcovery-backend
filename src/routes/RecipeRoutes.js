import express from 'express';
import multer from 'multer';
import path from 'path';
import { createRecipe, listRecipes, getRecipe, updateRecipe, deleteRecipe, searchRecipes, getSaved } from '../controllers/recipeController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post('/', auth, upload.single('image'), createRecipe);
router.get('/', listRecipes);
router.get('/search', searchRecipes);
router.get('/:id', getRecipe);
router.put('/:id', auth, upload.single('image'), updateRecipe);
router.delete('/:id', auth, deleteRecipe);
router.get('/saved/user', auth, getSaved);

export default router;
