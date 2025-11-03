import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './User.js';
import RecipeModel from './Recipe.js';

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

// Models
export const User = UserModel(sequelize);
export const Recipe = RecipeModel(sequelize);

// Relationships
User.hasMany(Recipe, { foreignKey: 'userId', as: 'recipes' });
Recipe.belongsTo(User, { foreignKey: 'userId', as: 'author' });

// Connect
try {
  await sequelize.authenticate();
  console.log('PostgreSQL connection successful!');
  await sequelize.sync();
  console.log('Database synced successfully');
} catch (error) {
  console.error('Database connection error:', error.message);
}
