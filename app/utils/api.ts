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
export const updateBusinessHours = async (
  businessHoursEnabled: boolean,
  workingHours: any,
  providerId: number,
) => {
  const payload = {
    business_hours_enabled: businessHoursEnabled,
    working_hours: workingHours,
  };
  try {
    const response = await axiosPrivate.put(
      endpoints.UPDATE_BUSINESS_HOURS + `/${providerId}`,
      payload,
    );
    // console.log(response, 'response');

    return response.data;
  } catch (error) {
    console.log(error, 'error');
    throw error;
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
export const sendPushNotification = async (
  sentToId: number,
  sentByName: string,
  sentById: number,
) => {
  try {
    await axiosPrivate.post(endpoints.SEND_PUSH_NOTIFICATION, {
      sentToId,
      sentByName,
      sentById,
      sentByApp: 'provider',
    });
    return true;
  } catch (error) {
    console.log(error, 'error in send push notification for message');
    return false;
  }
};
