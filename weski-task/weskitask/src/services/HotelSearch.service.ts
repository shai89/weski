import { TripSearch } from '../components/SearchBar';
import axios from 'axios';
import { HotelSearchResult } from './HotelSearch.types';
import dayjs from 'dayjs';
// @ts-ignore
import _ from 'lodash';

export const useAPI = 'amazon';

const serverUrl = 'http://localhost:5000';

const formatDate = (date: dayjs.Dayjs | null): string => {
    return date ? date.format('MM/DD/YYYY') : '';
};
const APIs = {
    'amazon':{
      queryKeys: ['ski_site', 'from_date', 'to_date', 'group_size'],
    },
    
  }


const getGroupSizeRange = (groupSize: number): [number, number] => {
    return [groupSize, Math.min(groupSize + 2, 10)];
};

export const initiateSearch = async (searchDetails: TripSearch): Promise<{ searchId: string }> => {
    const apiData = _.get(APIs, useAPI, null)
    const {queryKeys} = apiData;
    const searchPayload = {
        query: _.pick(searchDetails, queryKeys),
    };
    searchPayload.query.from_date = formatDate(searchPayload.query.from_date);
    searchPayload.query.to_date = formatDate(searchPayload.query.to_date);


    const response = await axios.post(`${serverUrl}/hotels/search`, searchPayload);
    return response.data;
};

export const fetchSearchResult = async (searchIdentifier: string): Promise<HotelSearchResult> => {
    const response = await axios.get(`${serverUrl}/hotels/search/${searchIdentifier}`);
    return response.data;
};
