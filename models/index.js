// /models/index.js
import sequelize from "../config/database.js";
import UserModel from "./User.js";
import RecipeModel from "./Recipe.js";
import FavoriteModel from "./favorite.js";

export const User = UserModel(sequelize);
export const Recipe = RecipeModel(sequelize);
export const Favorite = FavoriteModel(sequelize);

// Associations
User.hasMany(Recipe, { foreignKey: "userId", onDelete: "CASCADE" });
Recipe.belongsTo(User, { foreignKey: "userId" });

// Favorites: many-to-many via Favorite
User.belongsToMany(Recipe, { through: Favorite, as: "favorites", foreignKey: "userId", otherKey: "recipeId" });
Recipe.belongsToMany(User, { through: Favorite, as: "favBy", foreignKey: "recipeId", otherKey: "userId" });

export default sequelize;
