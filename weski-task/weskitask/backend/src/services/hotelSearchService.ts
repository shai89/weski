import { HotelSearchRequest, Hotel } from '../types/hotelSearchTypes';
import axios from 'axios';
import _ from 'lodash';

const APIs = {
  'amazon': {
    url: 'https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator',
    responseKey: 'body.accommodations',
    queryKeys: ['ski_site', 'from_date', 'to_date', 'group_size'],
  },
  
}

export class HotelSearchService {

  public async search(searchRequest: HotelSearchRequest, source: string): Promise<Hotel[]> {
    
    const API = _.get(APIs, source, null)
    if (!API) {
      console.error(`Invalid API source: ${source}`);
      return [];
    }
    const {queryKeys, url, responseKey} = API;
    const queryData = _.pick(searchRequest, queryKeys);
    const hotels = await this.fetchHotelsFromAPI(queryData, responseKey, url);

    return hotels;
  }


  private async fetchHotelsFromAPI(payload: object, responseKey: string, url: string): Promise<Hotel[]> {
    try {
      const response = await axios.post(url, {
        query: {
          ...payload
        },
      });
      
      return _.get(response.data, responseKey, []).map((accommodation: any) => this.mapToHotel(accommodation));
    
    } catch (error: any) {
      console.error(`Error fetching hotels for group size :`, error.message);
      return [];
    }
  }

  private mapToHotel(accommodation: any): Hotel {
    return {
      code: accommodation.HotelCode,
      name: accommodation.HotelName,
      images: accommodation.HotelDescriptiveContent.Images.map((image: any) => ({
        url: image.URL,
        cover: image?.MainImage === 'True',
      })),
      location: {
        lat: accommodation.HotelInfo.Position.Latitude,
        long: accommodation.HotelInfo.Position.Longitude,
        nearBy: accommodation.HotelInfo.Position.Distances.map((distance: any) => ({
          name: distance.type,
          distance: distance.distance,
        })),
      },
      rating: Number(accommodation.HotelInfo.Rating),
      beds: Number(accommodation.HotelInfo.Beds),
      priceBeforeTax: accommodation.PricesInfo.AmountBeforeTax,
      priceAfterTax: accommodation.PricesInfo.AmountAfterTax,
    };
  }
}
