export const BASE_URL = 'http://10.0.2.2:8000/api/';
export const endpoints = {
  SIGN_UP: 'provider/register',
  VERIFY_OTP: 'provider/verify',
  LOGIN: 'provider/login',
  FORGOT_PASSWORD: 'provider/forgot-password',
  RESET_PASSWORD: 'provider/reset-password',
  GET_PROFILE: 'provider/profile',
  UPDATE_PROFILE: 'provider/update-profile',
  UPDATE_BUSINESS_PROFILE: 'provider/update-business-profile',
  CATEGORIES: 'categories',
  SERVICES: 'services',
  UPDATE_BUSINESS_HOURS: 'provider/update-business-hours',
  PROVIDER_BOOKINGS: 'bookings/provider',
  PROVIDER_PENDING_BOOKINGS: 'bookings/provider/pending',
  CANCEL_BOOKING: 'bookings',
  COMPLETE_BOOKING: 'bookings/complete',
  SAVE_TOKEN: 'provider/save-token',
};
export const IMAGE_URL = 'http://10.0.2.2:8000';
export const experiencesList = [
  {id: 1, name: '0-1 Years'},
  {id: 2, name: '1-2 Years'},
  {id: 3, name: '2-3 Years'},
  {id: 4, name: '3-4 Years'},
  {id: 5, name: '4-5 Years'},
  {id: 6, name: '5-6 Years'},
  {id: 7, name: '6-7 Years'},
  {id: 8, name: '7-8 Years'},
  {id: 9, name: '8-9 Years'},
  {id: 10, name: '9-10 Years'},
  {id: 11, name: '10+ Years'},
];
export const businessHoursList = [];
