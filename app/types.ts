export interface PersonalProfileData {
  id?: number;
  name: string;
  email?: string;
  profile_pic: string | null;
  mobile_number: string | null;
  address: string | null;
  zipcode: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  profileFile?: {type: string; name: string; uri: string};
}
export interface ProfessionalProfileData {
  experience: number | null;
  rate: number | null;
  specialization: string | null;
  portfolio: string | null;
  portfolioFile?: {type: string; name: string; uri: string};
  email_verified_at?: string | null;
  category_id: number | null;
  service_id: number | null;
  business_hours_enabled: number | null;
  skills: string | null;
  working_hours?: null | any;
}

export interface Appointment {
  id: number;
  service_id: number;
  provider_id: number;
  user_id: number;
  zipcode: string;
  address: string;
  city: string;
  state: string;
  country: string;
  booking_date: string;
  booking_time: string;
  status: string;
  created_at: string;
  updated_at: string;
  provider: Provider;
  service: Service;
}
export interface Service {
  id: number;
  name: string;
  category_id: number;
  images: string;
  price: number | null;
  discount: number | null;
  created_at: string;
  updated_at: string;
}
export interface Provider {
  id: number;
  name: string;
  email: string;
  device_token: null; // Adjust the type if it can be a different type
  isNotificationAllowed: number;
  otp: null; // Adjust the type if it can be a different type
  mobile_number: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  working_hours: string; // This appears to be a JSON string; consider parsing it if needed
  timezone: null; // Adjust the type if it can be a different type
  experience: number;
  rate: string;
  specialization: string;
  portfolio: string;
  profile_pic: string | null;
  created_at: string;
  updated_at: string;
  email_verified_at: null; // Adjust the type if it can be a different type
  category_id: number;
  service_id: number;
  isAdmin: number;
  otp_valid_until: null; // Adjust the type if it can be a different type
  business_hours_enabled: number;
  skills: string;
  //   service?: ServiceForProvider; // Optional, only included in the details response
}
