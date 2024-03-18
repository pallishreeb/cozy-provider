import {axiosPrivate} from './axiosConfig';
import {endpoints} from '../constants';

export const fetchCategories = async () => {
  try {
    const response = await axiosPrivate.get(endpoints.CATEGORIES);
    return response?.data?.categories; // Adjust according to your API response structure
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return []; // Return an empty array as a fallback
  }
};

const fetchServices = async () => {
  try {
    const response = await axiosPrivate.get(endpoints.SERVICES);
    return response?.data?.services; // Adjust according to your API response structure
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return []; // Return an empty array as a fallback
  }
};
