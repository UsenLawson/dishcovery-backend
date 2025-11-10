// seedRecipes.js
import sequelize from "./config/database.js";
import { Recipe, User } from "./models/index.js";

console.log("🌱 Starting recipe seeding...");

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Models synced");

    // Ensure at least one user exists
    const user = await User.findOne();
    if (!user) {
      console.log("❌ No user found. Please create a user first via signup.");
      process.exit(1);
    }

    console.log("✅ Using userId:", user.id);

    const recipes = [
      // ========== NIGERIAN RECIPES (20) ==========
      {
        name: "Nigerian Jollof Rice",
        category: "Nigerian",
        cookingTime: 45,
        prepTime: 20,
        rating: 5,
        description: "Classic smoky Nigerian Jollof Rice.",
        ingredients: ["rice", "tomatoes", "pepper", "seasoning", "oil"],
        instructions: ["Blend pepper mix", "Cook stew base", "Add rice", "Steam until done"],
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999990/jollof.jpg",
      },
      {
        name: "Egusi Soup",
        category: "Nigerian",
        cookingTime: 60,
        prepTime: 25,
        rating: 5,
        description: "Melon seed soup cooked with vegetables and assorted meat.",
        ingredients: ["egusi", "palm oil", "spinach", "pepper", "beef"],
        instructions: ["Fry egusi", "Cook meat", "Add vegetables"],
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999990/egusi.jpg",
      },
      {
        name: "Fried Plantain (Dodo)",
        category: "Nigerian",
        cookingTime: 10,
        prepTime: 5,
        rating: 5,
        description: "Sweet ripe plantains fried to perfection.",
        ingredients: ["ripe plantain", "oil", "salt"],
        instructions: ["Peel plantain", "Slice", "Fry"],
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999990/plantain.jpg",
      },
      {
        name: "Moi Moi",
        category: "Nigerian",
        cookingTime: 90,
        prepTime: 30,
        rating: 5,
        description: "Steamed bean pudding.",
        ingredients: ["beans", "pepper", "onion", "oil"],
        instructions: ["Blend beans", "Mix", "Steam"],
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999990/moimoi.jpg",
      },
      {
        name: "Pounded Yam & Efo Riro",
        category: "Nigerian",
        cookingTime: 50,
        prepTime: 20,
        rating: 5,
        description: "Yoruba style vegetable stew served with pounded yam.",
        ingredients: ["yam", "spinach", "pepper", "oil"],
        instructions: ["Boil yam", "Pound", "Cook efo riro"],
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999990/efo.jpg",
      },
      {
        name: "Afang Soup",
        category: "Nigerian",
        cookingTime: 60,
        prepTime: 20,
        rating: 5,
        description: "Efik-style vegetable soup.",
        ingredients: ["afang leaves", "waterleaf", "palm oil", "meat"],
        instructions: ["Cook meat", "Add vegetables", "Simmer"],
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999990/afang.jpg",
      },
      {
        name: "Nigerian Suya",
        category: "Nigerian",
        cookingTime: 15,
        prepTime: 15,
        rating: 5,
        description: "Spicy Northern Nigerian grilled beef.",
        ingredients: ["beef", "suya spice", "oil"],
        instructions: ["Season meat", "Grill"],
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999990/suya.jpg",
      },
      {
        name: "Pepper Soup",
        category: "Nigerian",
        cookingTime: 40,
        prepTime: 10,
        rating: 5,
        description: "Light spicy broth with assorted meats.",
        ingredients: ["goat meat", "pepper soup spice", "pepper"],
        instructions: ["Add ingredients", "Boil"],
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999990/peppersoup.jpg",
      },
      {
        name: "Banga Soup",
        category: "Nigerian",
        cookingTime: 70,
        prepTime: 30,
        rating: 5,
        description: "Palm nut soup popular in Delta state.",
        ingredients: ["banga", "beef", "seasoning"],
        instructions: ["Cook palm nuts", "Extract juice", "Boil"],
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999990/banga.jpg",
      },
      {
        name: "Okra Soup",
        category: "Nigerian",
        cookingTime: 30,
        prepTime: 10,
        rating: 4,
        description: "Delicious draw soup.",
        ingredients: ["okra", "oil", "fish", "spices"],
        instructions: ["Chop okra", "Cook"],
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999990/okra.jpg",
      },

      // 10 MORE NIGERIAN RECIPES
      {
        name: "Akara",
        category: "Nigerian",
        cookingTime: 20,
        prepTime: 15,
        rating: 4,
        description: "Crispy bean cake.",
        ingredients: ["beans", "pepper", "onions"],
        instructions: ["Blend beans", "Fry"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/akara.jpg",
      },
      {
        name: "Nkwobi",
        category: "Nigerian",
        cookingTime: 45,
        prepTime: 20,
        rating: 5,
        description: "Spicy cow foot dish.",
        ingredients: ["cow foot", "palm oil"],
        instructions: ["Cook meat", "Mix sauce"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/nkwobi.jpg",
      },
      {
        name: "Ogbono Soup",
        category: "Nigerian",
        cookingTime: 55,
        prepTime: 15,
        rating: 5,
        description: "Thick draw soup.",
        ingredients: ["ogbono", "meat", "stock fish"],
        instructions: ["Boil meat", "Mix ogbono"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/ogbono.jpg",
      },
      {
        name: "Tuwo Shinkafa",
        category: "Nigerian",
        cookingTime: 40,
        prepTime: 10,
        rating: 4,
        description: "Rice swallow popular in the North.",
        ingredients: ["rice flour", "water"],
        instructions: ["Boil", "Mash"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/tuwo.jpg",
      },
      {
        name: "Boli (Roasted Plantain)",
        category: "Nigerian",
        cookingTime: 20,
        prepTime: 5,
        rating: 5,
        description: "Roasted ripe plantain.",
        ingredients: ["plantain"],
        instructions: ["Roast"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/boli.jpg",
      },
      {
        name: "White Soup (Ofe Nsala)",
        category: "Nigerian",
        cookingTime: 60,
        prepTime: 20,
        rating: 5,
        description: "Creamy spice-rich soup.",
        ingredients: ["fresh fish", "yam", "spices"],
        instructions: ["Boil fish", "Add yam"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/ofensala.jpg",
      },
      {
        name: "Jollof Spaghetti",
        category: "Nigerian",
        cookingTime: 25,
        prepTime: 10,
        rating: 4,
        description: "Pasta cooked in spicy jollof sauce.",
        ingredients: ["spaghetti", "pepper mix"],
        instructions: ["Boil spaghetti", "Mix with sauce"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/spag.jpg",
      },
      {
        name: "Beans & Plantain",
        category: "Nigerian",
        cookingTime: 60,
        prepTime: 10,
        rating: 4,
        description: "Delicious beans porridge with fried plantain.",
        ingredients: ["beans", "plantain", "oil"],
        instructions: ["Cook beans", "Fry plantain"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/beans.jpg",
      },
      {
        name: "Amala & Gbegiri",
        category: "Nigerian",
        cookingTime: 50,
        prepTime: 15,
        rating: 5,
        description: "Yoruba classic meal.",
        ingredients: ["yam flour", "beans", "pepper"],
        instructions: ["Prepare amala", "Make gbegiri"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/amala.jpg",
      },
      {
        name: "Ewedu Soup",
        category: "Nigerian",
        cookingTime: 20,
        prepTime: 5,
        rating: 4,
        description: "Smooth jute leave soup.",
        ingredients: ["ewedu leaves"],
        instructions: ["Blend", "Cook"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/ewedu.jpg",
      },

      // ========== GLOBAL RECIPES (5) ==========
      {
        name: "Italian Pasta Carbonara",
        category: "Italian",
        cookingTime: 20,
        prepTime: 10,
        rating: 5,
        description: "Classic creamy carbonara.",
        ingredients: ["pasta", "eggs", "cheese"],
        instructions: ["Boil pasta", "Mix sauce"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/carbonara.jpg",
      },
      {
        name: "American Burger",
        category: "American",
        cookingTime: 15,
        prepTime: 10,
        rating: 4,
        description: "Juicy grilled beef burger.",
        ingredients: ["beef", "bun", "cheese"],
        instructions: ["Grill", "Assemble"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/burger.jpg",
      },
      {
        name: "French Croissant",
        category: "French",
        cookingTime: 120,
        prepTime: 30,
        rating: 5,
        description: "Buttery flaky pastry.",
        ingredients: ["flour", "butter"],
        instructions: ["Knead", "Bake"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/croissant.jpg",
      },
      {
        name: "Chinese Fried Rice",
        category: "Chinese",
        cookingTime: 20,
        prepTime: 10,
        rating: 5,
        description: "Stir-fried rice with vegetables.",
        ingredients: ["rice", "veggies", "egg"],
        instructions: ["Stir fry"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/chinese.jpg",
      },
      {
        name: "Indian Curry Chicken",
        category: "Indian",
        cookingTime: 45,
        prepTime: 20,
        rating: 5,
        description: "Spicy Indian-style chicken curry.",
        ingredients: ["chicken", "spices"],
        instructions: ["Cook"],
        image: "https://res.cloudinary.com/demo/image/upload/v1/curry.jpg",
      },
    ];

    await Recipe.bulkCreate(
      recipes.map((r) => ({ ...r, userId: user.id }))
    );

    console.log("✅ Seed completed successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
