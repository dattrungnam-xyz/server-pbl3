import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import auth from './routes/auth.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/v1/auth', auth);




const startServer = async () => {
  try {
   
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();