import express from 'express';
import cors from 'cors';
import hotelSearchController from './controllers/hotelSearchController';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/hotels', hotelSearchController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
