import { Router } from 'express';
import { HotelSearchService } from '../services/hotelSearchService';
import { HotelSearchRequest } from '../types/hotelSearchTypes';

const router = Router();
const hotelSearchService = new HotelSearchService();

router.post('/search', async (req, res) => {
  try {
    const searchRequest: HotelSearchRequest = req.body;
    const results = await hotelSearchService.search(searchRequest, searchRequest.source);
    console.log("results",results)
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

export default router;
