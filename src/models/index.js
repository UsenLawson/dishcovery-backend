import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './User.js';
import RecipeModel from './Recipe.js';

dotenv.config();

// Create Sequelize connection
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

// Define models
export const User = UserModel(sequelize);
export const Recipe = RecipeModel(sequelize);

// Define relationships
User.hasMany(Recipe, { foreignKey: 'userId', as: 'recipes' });
Recipe.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Saved recipes relationship (many-to-many)
User.belongsToMany(Recipe, {
  through: 'SavedRecipes',
  as: 'savedRecipes',
  foreignKey: 'userId'
});

Recipe.belongsToMany(User, {
  through: 'SavedRecipes',
  as: 'savedBy',
  foreignKey: 'recipeId'
});


// Sync database (creates tables if missing)
try {
  await sequelize.authenticate();
  console.log('MySQL connection successful!');
  await sequelize.sync();
  console.log('Database synced successfully');
} catch (error) {
  console.error('Database connection error:', error.message);
}



