// /models/Favorite.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Favorite = sequelize.define("Favorite", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  return Favorite;
};
