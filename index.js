import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import auth from './routes/auth.js'
import account from './routes/account.js'
import service from './routes/service.js'
import booking from './routes/booking.js'
import staff from './routes/staff.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/v1/auth', auth);
app.use('/v1/account', account);
app.use('/v1/service', service);
app.use('/v1/booking', booking);
app.use('/v1/staff',staff);






const startServer = async () => {
  try {
   
    app.listen(8080, () => console.log('server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();