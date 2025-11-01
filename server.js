
import dotenv from 'dotenv';
import app from './src/app.js';
import { sequelize } from './src/models/index.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
