import { connection } from '../sequelize/index.js';
import { app } from './app.js';

connection();

app.listen(process.env.PORT || 3333, () =>
  console.log(`Server running on port ${process.env.PORT || 3333}`)
);
