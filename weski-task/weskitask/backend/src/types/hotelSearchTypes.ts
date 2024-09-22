export type Hotel = {
  code: string;
  name: string;
  images: HotelImage[];
  location: HotelLocation;
  rating: number;
  beds: number;
  priceBeforeTax: string;
  priceAfterTax: string;
};
export type HotelNearBy = {
  name: string;
  distance: string;
};

export type HotelImage = {
  url: string;
  cover: boolean;
};

export type HotelLocation = {
  lat: string;
  long: string;
  nearBy: HotelNearBy[];
};


export type HotelSearchRequest = {
  source: string;
}; 
// export type HotelSearchRequest = {
//   site: number;
//   startDate: string;
//   endDate: string;
//   groupSizeRange: [number, number];
// };

// export type HotelSearchResult = {
//   completed: boolean;
//   site: number;
//   startDate: string;
//   endDate: string;
//   groupSizeRange: [number, number];
//   hotels: Hotel[];
// };
export type HotelSearchResult = {
  site: number;
  startDate: string;
  endDate: string;
  groupSizeRange: [number, number];
  completed: boolean;
  hotels: Hotel[];
};
